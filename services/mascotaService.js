import api from './api';

export const obtenerMascotas = () => api('/mascotas');

export const crearMascota = (mascota) =>
  api('/mascotas', { method: 'POST', body: JSON.stringify(mascota) });