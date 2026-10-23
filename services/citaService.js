import api from './api';

export const obtenerServicios = () => api('/servicios');
export const obtenerDias = () => api('/dias');

export const obtenerHorarios = (fecha, servicioId) =>
  api(`/horarios?fecha=${encodeURIComponent(fecha)}&servicioId=${encodeURIComponent(servicioId)}`);

export const obtenerCitas = (tipo = 'proximas') => api(`/citas?tipo=${tipo}`);

export const crearCita = (cita) =>
  api('/citas', { method: 'POST', body: JSON.stringify(cita) });

export const reagendarCita = (id, fecha, hora) =>
  api(`/citas/${id}`, { method: 'PUT', body: JSON.stringify({ fecha, hora }) });

export const cancelarCita = (id) => api(`/citas/${id}`, { method: 'DELETE' });