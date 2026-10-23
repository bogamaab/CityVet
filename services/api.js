import { obtenerToken } from './authStorage';
import { db, fechaRelativa } from './mockData';

const LATENCIA_MS = 400;
const HORARIOS_BASE = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00'];
const DIAS_CORTO = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DIAS_LARGO = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MESES_CORTO = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const MESES_LARGO = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const ESPECIE_TEXTO = { perro: 'Canino', gato: 'Felino', otro: 'Otro' };

let secuencia = 100;
const nuevoId = (prefijo) => `${prefijo}${++secuencia}`;

/* ---------- utilidades ---------- */
const pad = (n) => String(n).padStart(2, '0');
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const copiar = (d) => (d === undefined ? undefined : JSON.parse(JSON.stringify(d)));

const fallar = (status, message) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

const parseISO = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d);
};

const textoFecha = (iso, hora) => {
  let prefijo = '';
  if (iso === fechaRelativa(0)) prefijo = 'Hoy';
  else if (iso === fechaRelativa(1)) prefijo = 'Mañana';
  const f = parseISO(iso);
  const base = `${f.getDate()} ${MESES_CORTO[f.getMonth()]}`;
  const dia = prefijo ? `${prefijo}, ${base}` : `${base} ${f.getFullYear()}`;
  return `${dia} • ${hora}`;
};

const horaFin = (hora) => {
  const [h, m] = hora.split(':').map(Number);
  const t = h * 60 + m + 30;
  return `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
};

const porFecha = (a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`);
const esProxima = (c) => c.estado === 'Confirmada' && c.fecha >= fechaRelativa(0);

const horarioLibre = (fecha, hora, medicoId, ignorarCitaId) =>
  !db.citas.some(
    (c) =>
      c.id !== ignorarCitaId &&
      c.estado === 'Confirmada' &&
      c.fecha === fecha &&
      c.hora === hora &&
      c.medicoId === medicoId
  );

/* ---------- serializadores ---------- */
const publico = (u) => {
  const { password, ...resto } = u;
  return resto;
};

const resumenMascota = (m) => {
  const proxima = db.citas
    .filter((c) => c.mascotaId === m.id && esProxima(c))
    .sort(porFecha)[0];
  return {
    id: m.id,
    nombre: m.nombre,
    especie: m.especie,
    especieTexto: ESPECIE_TEXTO[m.especie] || 'Otro',
    raza: m.raza,
    edad: m.edad,
    chip: m.chip,
    estado: m.estado,
    cita: proxima ? `Cita: ${textoFecha(proxima.fecha, proxima.hora)}` : 'Sin citas próximas',
  };
};

const serializarCita = (c) => {
  const mascota = db.mascotas.find((m) => m.id === c.mascotaId);
  const servicio = db.servicios.find((s) => s.id === c.servicioId);
  const medico = db.medicos.find((m) => m.id === c.medicoId);
  return {
    id: c.id,
    mascotaId: mascota.id,
    mascotaNombre: mascota.nombre,
    mascota: `${mascota.nombre} (${mascota.raza})`,
    servicioId: servicio.id,
    servicio: servicio.nombre,
    estado: c.estado,
    fecha: textoFecha(c.fecha, c.hora),
    fechaISO: c.fecha,
    hora: c.hora,
    doctor: medico ? medico.nombre : 'Por asignar',
  };
};

const citaDelCliente = (id, usuario) => {
  const cita = db.citas.find((c) => c.id === id && c.clienteId === usuario.id);
  if (!cita) fallar(404, 'Cita no encontrada');
  return cita;
};

/* ---------- tabla de rutas ---------- */
const rutas = [
  // ===== AUTH =====
  {
    metodo: 'POST', ruta: '/auth/login', publica: true,
    handler: ({ body }) => {
      const { correo = '', password, tipo } = body;
      const usuario = db.usuarios.find((u) => u.correo.toLowerCase() === correo.toLowerCase());
      if (!usuario || usuario.password !== password) fallar(401, 'Correo o contraseña incorrectos');
      if (tipo && usuario.rol !== tipo) fallar(403, `Esta cuenta no tiene acceso como "${tipo}"`);
      return { token: `mock-token-${usuario.id}`, usuario: publico(usuario) };
    },
  },
  {
    metodo: 'POST', ruta: '/auth/register', publica: true,
    handler: ({ body }) => {
      const { nombre, correo, telefono = '', password, rol = 'cliente' } = body;
      if (!nombre?.trim() || !correo?.trim() || !password?.trim())
        fallar(400, 'Nombre, correo y contraseña son obligatorios');
      if (!['cliente', 'medico'].includes(rol)) fallar(400, 'Tipo de cuenta no válido');
      if (db.usuarios.some((u) => u.correo.toLowerCase() === correo.toLowerCase()))
        fallar(409, 'Ya existe una cuenta con ese correo');

      const usuario = {
        id: nuevoId('u'), rol, nombre: nombre.trim(), correo: correo.trim(), password,
        telefono, direccion: '', recordatorios: true, alertas: true,
      };
      if (rol === 'medico') {
        const med = { id: nuevoId('med'), nombre: nombre.trim(), area: 'Medicina General', ubicacion: 'Consultorio por asignar' };
        db.medicos.push(med);
        usuario.medicoId = med.id;
      }
      db.usuarios.push(usuario);
      return { token: `mock-token-${usuario.id}`, usuario: publico(usuario) };
    },
  },

  // ===== PERFIL =====
  { metodo: 'GET', ruta: '/perfil', handler: ({ usuario }) => publico(usuario) },
  {
    metodo: 'PUT', ruta: '/perfil',
    handler: ({ body, usuario }) => {
      ['nombre', 'correo', 'telefono', 'direccion', 'recordatorios', 'alertas'].forEach((campo) => {
        if (body[campo] !== undefined) usuario[campo] = body[campo];
      });
      return publico(usuario);
    },
  },

  // ===== MASCOTAS (cliente) =====
  {
    metodo: 'GET', ruta: '/mascotas', roles: ['cliente'],
    handler: ({ usuario }) =>
      db.mascotas.filter((m) => m.clienteId === usuario.id).map(resumenMascota),
  },
  {
    metodo: 'POST', ruta: '/mascotas', roles: ['cliente'],
    handler: ({ body, usuario }) => {
      const { nombre, especie = 'perro', raza = '', edad = '', notas = '' } = body;
      if (!nombre?.trim()) fallar(400, 'El nombre de la mascota es obligatorio');
      const anios = parseInt(edad, 10);
      const nueva = {
        id: nuevoId('p'), clienteId: usuario.id, nombre: nombre.trim(), especie,
        raza: raza.trim() || 'Sin especificar', sexo: '—',
        edad: Number.isNaN(anios) ? 'Sin dato' : `${anios} ${anios === 1 ? 'año' : 'años'}`,
        chip: 'Sin chip', estado: 'Estable', notas,
        medicacion: [], vacunas: [], historial: [],
      };
      db.mascotas.push(nueva);
      return resumenMascota(nueva);
    },
  },

  // ===== SERVICIOS, DÍAS Y HORARIOS =====
  { metodo: 'GET', ruta: '/servicios', handler: () => db.servicios },
  {
    metodo: 'GET', ruta: '/dias',
    handler: () => {
      const dias = [];
      let i = 1;
      while (dias.length < 6) {
        const iso = fechaRelativa(i++);
        const f = parseISO(iso);
        if (f.getDay() === 0) continue; // sin domingos
        dias.push({
          fecha: iso, dia: DIAS_CORTO[f.getDay()], numero: f.getDate(),
          mes: MESES_LARGO[f.getMonth()], anio: f.getFullYear(),
        });
      }
      return dias;
    },
  },
  {
    metodo: 'GET', ruta: '/horarios',
    handler: ({ query }) => {
      const servicio = db.servicios.find((s) => s.id === query.servicioId);
      if (!servicio) fallar(400, 'Servicio no válido');
      if (!query.fecha) fallar(400, 'Falta la fecha');
      return {
        fecha: query.fecha,
        horarios: HORARIOS_BASE.map((hora) => ({
          hora, disponible: horarioLibre(query.fecha, hora, servicio.medicoId),
        })),
      };
    },
  },

  // ===== CITAS (cliente) =====
  {
    metodo: 'GET', ruta: '/citas', roles: ['cliente'],
    handler: ({ query, usuario }) => {
      const mias = db.citas.filter((c) => c.clienteId === usuario.id);
      const lista =
        query.tipo === 'historial'
          ? mias.filter((c) => !esProxima(c)).sort((a, b) => porFecha(b, a))
          : mias.filter(esProxima).sort(porFecha);
      return lista.map(serializarCita);
    },
  },
  {
    metodo: 'POST', ruta: '/citas', roles: ['cliente'],
    handler: ({ body, usuario }) => {
      const { mascotaId, servicioId, fecha, hora } = body;
      const mascota = db.mascotas.find((m) => m.id === mascotaId && m.clienteId === usuario.id);
      const servicio = db.servicios.find((s) => s.id === servicioId);
      if (!mascota) fallar(400, 'Selecciona una mascota válida');
      if (!servicio) fallar(400, 'Selecciona un servicio válido');
      if (!fecha || !hora) fallar(400, 'Selecciona fecha y hora');
      if (!horarioLibre(fecha, hora, servicio.medicoId)) fallar(409, 'Ese horario ya no está disponible');

      const cita = {
        id: nuevoId('c'), clienteId: usuario.id, mascotaId, servicioId,
        medicoId: servicio.medicoId, fecha, hora, estado: 'Confirmada',
      };
      db.citas.push(cita);
      return serializarCita(cita);
    },
  },
  {
    metodo: 'PUT', ruta: '/citas/:id', roles: ['cliente'],
    handler: ({ params, body, usuario }) => {
      const cita = citaDelCliente(params.id, usuario);
      const servicio = db.servicios.find((s) => s.id === cita.servicioId);
      if (cita.estado !== 'Confirmada') fallar(400, 'Solo se pueden reagendar citas confirmadas');
      if (!body.fecha || !body.hora) fallar(400, 'Selecciona fecha y hora');
      if (!horarioLibre(body.fecha, body.hora, servicio.medicoId, cita.id))
        fallar(409, 'Ese horario ya no está disponible');
      cita.fecha = body.fecha;
      cita.hora = body.hora;
      cita.medicoId = servicio.medicoId;
      return serializarCita(cita);
    },
  },
  {
    metodo: 'DELETE', ruta: '/citas/:id', roles: ['cliente'],
    handler: ({ params, usuario }) => {
      const cita = citaDelCliente(params.id, usuario);
      if (cita.estado !== 'Confirmada') fallar(400, 'Solo se pueden cancelar citas confirmadas');
      cita.estado = 'Cancelada';
      return serializarCita(cita);
    },
  },

  // ===== VETERINARIO =====
  {
    metodo: 'GET', ruta: '/veterinario/agenda', roles: ['medico'],
    handler: ({ query, usuario }) => {
      const propias = db.citas.filter((c) => c.medicoId === usuario.medicoId && c.estado === 'Confirmada');
      const hoy = fechaRelativa(0);
      // Sin ?fecha= devuelve el primer día con citas desde hoy
      const siguiente = propias.filter((c) => c.fecha >= hoy).sort(porFecha)[0];
      const fecha = query.fecha || (siguiente ? siguiente.fecha : hoy);
      const f = parseISO(fecha);
      const citas = propias
        .filter((c) => c.fecha === fecha)
        .sort(porFecha)
        .map((c) => {
          const mascota = db.mascotas.find((m) => m.id === c.mascotaId);
          const servicio = db.servicios.find((s) => s.id === c.servicioId);
          return {
            id: c.id, hora: c.hora, horaFin: horaFin(c.hora), mascota: mascota.nombre,
            detalle: `${mascota.raza} • ${servicio.nombre}`, critico: !!servicio.critico,
          };
        });
      return {
        fecha,
        titulo: `${DIAS_LARGO[f.getDay()]}, ${f.getDate()} de ${MESES_LARGO[f.getMonth()]}`,
        citas,
      };
    },
  },
  {
    metodo: 'GET', ruta: '/pacientes', roles: ['medico'],
    handler: ({ query }) => {
      const t = (query.busqueda || '').toLowerCase().trim();
      return db.mascotas
        .map((m) => ({ m, tutor: db.usuarios.find((u) => u.id === m.clienteId) }))
        .filter(({ m, tutor }) => !t || m.nombre.toLowerCase().includes(t) || tutor.nombre.toLowerCase().includes(t))
        .map(({ m, tutor }) => ({ id: m.id, nombre: m.nombre, raza: m.raza, tutor: tutor.nombre }));
    },
  },
  {
    metodo: 'GET', ruta: '/pacientes/:id', roles: ['medico'],
    handler: ({ params }) => {
      const m = db.mascotas.find((x) => x.id === params.id);
      if (!m) fallar(404, 'Paciente no encontrado');
      const tutor = db.usuarios.find((u) => u.id === m.clienteId);
      return {
        ...m,
        especieTexto: ESPECIE_TEXTO[m.especie] || 'Otro',
        tutor: { nombre: tutor.nombre, telefono: tutor.telefono, correo: tutor.correo },
      };
    },
  },

  // ===== ADMIN =====
  {
    metodo: 'GET', ruta: '/admin/resumen', roles: ['admin'],
    handler: () => ({ stats: db.admin.stats, meses: db.admin.meses }),
  },
  {
    metodo: 'GET', ruta: '/admin/especialistas', roles: ['admin'],
    handler: () => ({
      stats: db.admin.stats,
      especialistas: db.medicos,
      recursos: db.admin.recursos,
    }),
  },
];

/* ---------- despachador ---------- */
const compilar = (ruta) => ({
  regex: new RegExp(`^${ruta.replace(/:[^/]+/g, '([^/]+)')}$`),
  nombres: (ruta.match(/:[^/]+/g) || []).map((n) => n.slice(1)),
});
const tabla = rutas.map((r) => ({ ...r, ...compilar(r.ruta) }));

const parsearQuery = (texto = '') =>
  texto.split('&').filter(Boolean).reduce((acc, par) => {
    const [k, v = ''] = par.split('=');
    acc[decodeURIComponent(k)] = decodeURIComponent(v);
    return acc;
  }, {});

const api = async (endpoint, options = {}) => {
  await esperar(LATENCIA_MS);

  const metodo = (options.method || 'GET').toUpperCase();
  const [path, queryTexto] = endpoint.split('?');
  const query = parsearQuery(queryTexto);

  let body = {};
  if (options.body) {
    try { body = JSON.parse(options.body); } catch { fallar(400, 'JSON inválido'); }
  }

  const token = await obtenerToken();
  const usuario = token ? db.usuarios.find((u) => `mock-token-${u.id}` === token) : null;

  for (const r of tabla) {
    if (r.metodo !== metodo) continue;
    const m = path.match(r.regex);
    if (!m) continue;

    if (!r.publica) {
      if (!usuario) fallar(401, 'Sesión no válida. Inicia sesión de nuevo.');
      if (r.roles && !r.roles.includes(usuario.rol)) fallar(403, 'No tienes permiso para esta acción');
    }

    const params = {};
    r.nombres.forEach((n, i) => { params[n] = m[i + 1]; });
    return copiar(r.handler({ params, query, body, usuario }));
  }

  fallar(404, `Ruta no encontrada: ${metodo} ${path}`);
};

export default api;