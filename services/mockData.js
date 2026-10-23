const pad = (n) => String(n).padStart(2, '0');

export const aISO = (f) =>
  `${f.getFullYear()}-${pad(f.getMonth() + 1)}-${pad(f.getDate())}`;

export const fechaRelativa = (dias) => {
  const f = new Date();
  f.setDate(f.getDate() + dias);
  return aISO(f);
};

const vacunasOk = [
  { id: 'v1', nombre: 'Vacuna de la Rabia', fecha: 'Ene 2026', estado: 'Al día', ok: true },
];

export const db = {
  usuarios: [
    { id: 'u1', rol: 'cliente', nombre: 'María González', correo: 'maria.gonzalez@vetcare.com',
      password: '123456', telefono: '+34 612 345 678',
      direccion: 'Calle de la Vía 42, 3ºB - Madrid', recordatorios: true, alertas: true },
    { id: 'u2', rol: 'cliente', nombre: 'Sofia Martínez', correo: 'sofia.martinez@gmail.com',
      password: '123456', telefono: '+34 600 123 456',
      direccion: 'Av. de América 10 - Madrid', recordatorios: true, alertas: false },
    { id: 'u3', rol: 'medico', medicoId: 'med2', nombre: 'Dr. Fernando Ruiz',
      correo: 'fernando.ruiz@vetcare.com', password: '123456', telefono: '+34 611 222 333',
      direccion: 'Calle Mayor 5 - Madrid', recordatorios: true, alertas: true },
    { id: 'u4', rol: 'admin', nombre: 'Coordinador VetCare', correo: 'admin@vetcare.com',
      password: 'admin123', telefono: '+34 600 000 000',
      direccion: 'Sede central', recordatorios: true, alertas: true },
  ],

  medicos: [
    { id: 'med1', nombre: 'Dr. Santiago Hortua', area: 'Cirugía General', ubicacion: 'Quirófano A' },
    { id: 'med2', nombre: 'Dr. Fernando Ruiz', area: 'Consulta & Grooming', ubicacion: 'Consultorio 2' },
    { id: 'med3', nombre: 'Dra. Julia Santos', area: 'Exámenes & Lab', ubicacion: 'Laboratorio B' },
  ],

  servicios: [
    { id: 's1', nombre: 'Consulta médica', detalle: '30 min', precio: '$25 - $40', medicoId: 'med2' },
    { id: 's2', nombre: 'Urgencias', detalle: 'Atención inmediata', precio: '$80+', highlight: true, critico: true, medicoId: 'med1' },
    { id: 's3', nombre: 'Baño y pelaje', detalle: '1 hora', precio: '$15 - $30', medicoId: 'med2' },
    { id: 's4', nombre: 'Cirugías', detalle: '1 - 3 horas', precio: 'Sujeto a evaluación', critico: true, medicoId: 'med1' },
    { id: 's5', nombre: 'Peluquería canina', detalle: '45 min', precio: '$20 - $35', medicoId: 'med2' },
    { id: 's6', nombre: 'Exámenes médicos', detalle: '20 min', precio: '$30 - $80', medicoId: 'med3' },
  ],

  mascotas: [
    { id: 'p1', clienteId: 'u1', nombre: 'Max', especie: 'perro', raza: 'Golden Retriever',
      sexo: 'Macho', edad: '3 años', chip: '900223004519876', estado: 'Estable', notas: '',
      medicacion: [], vacunas: vacunasOk, historial: [] },
    { id: 'p2', clienteId: 'u1', nombre: 'Luna', especie: 'gato', raza: 'Gato Persa',
      sexo: 'Hembra', edad: '2 años', chip: '900223004511234', estado: 'Estable',
      notas: 'Alérgica al pollo', medicacion: [], vacunas: vacunasOk, historial: [] },
    { id: 'p3', clienteId: 'u2', nombre: 'Coco', especie: 'gato', raza: 'Maine Coon',
      sexo: 'Macho (Castrado)', edad: '3 años y 2 meses', chip: '900223004523118',
      estado: 'Estable', notas: '',
      medicacion: [
        { id: 'm1', nombre: 'Condroprotector Articular', dosis: '1 comprimido / 24h · Diario permanente' },
      ],
      vacunas: [
        { id: 'v1', nombre: 'Vacuna Antialérgica', fecha: 'Ene 2026', estado: 'Al día', ok: true },
        { id: 'v2', nombre: 'Vacuna de la Rabia', fecha: 'Ene 2026', estado: 'Al día', ok: true },
        { id: 'v3', nombre: 'Desparasitante', fecha: 'Oct 2026', estado: 'Pendiente', ok: false },
      ],
      historial: [
        { id: 'h1', fecha: '15 Sep 2026', doctor: 'Dr. Fernando Ruiz', titulo: 'Control General',
          descripcion: 'Paciente acude para revisión de control. Estado general bueno, mucosas sanas, pelaje brillante. Se recomienda mantener dieta rica en fibra.' },
      ] },
    { id: 'p4', clienteId: 'u2', nombre: 'Toby', especie: 'perro', raza: 'Criollo',
      sexo: 'Macho', edad: '5 años', chip: '900223004577001', estado: 'Estable', notas: '',
      medicacion: [], vacunas: vacunasOk, historial: [] },
  ],

  citas: [
    { id: 'c1', clienteId: 'u1', mascotaId: 'p1', servicioId: 's1', medicoId: 'med2',
      fecha: fechaRelativa(1), hora: '10:00', estado: 'Confirmada' },
    { id: 'c2', clienteId: 'u1', mascotaId: 'p2', servicioId: 's3', medicoId: 'med2',
      fecha: fechaRelativa(-7), hora: '14:30', estado: 'Completada' },
    { id: 'c3', clienteId: 'u2', mascotaId: 'p4', servicioId: 's5', medicoId: 'med2',
      fecha: fechaRelativa(1), hora: '09:00', estado: 'Confirmada' },
    // Cirugía asignada a med2 solo para que la agenda de Fernando se vea como en el diseño
    { id: 'c4', clienteId: 'u1', mascotaId: 'p2', servicioId: 's4', medicoId: 'med2',
      fecha: fechaRelativa(1), hora: '11:30', estado: 'Confirmada' },
  ],

  admin: {
    stats: { citasHoy: 24, vetsActivos: 6, completadas: 18 },
    meses: [
      { id: '1', mes: 'JULIO', area: 'Cirugía General', citas: 74, costos: '$4,250', asistencia: '96%' },
      { id: '2', mes: 'AGOSTO', area: 'Consulta & Grooming', citas: 112, costos: '$5,890', asistencia: '92%' },
      { id: '3', mes: 'SEPTIEMBRE', area: 'Exámenes & Lab', citas: 98, costos: '$6,420', asistencia: '95%' },
    ],
    recursos: [
      { id: '1', nombre: 'Rayos X - Quirófano 1', disponible: true, estado: 'DISPONIBLE' },
      { id: '2', nombre: 'Ultrasonido portátil', disponible: false, estado: 'EN USO (Sala 3)' },
    ],
  },
};