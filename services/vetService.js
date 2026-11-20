import api from './api';

export const obtenerAgenda = (fecha) =>
  api(fecha ? `/veterinario/agenda?fecha=${fecha}` : '/veterinario/agenda');

export const buscarPacientes = (texto = '') =>
  api(`/pacientes?busqueda=${encodeURIComponent(texto)}`);

export const obtenerPaciente = (id) => api(`/pacientes/${id}`);