import api from './api';

export const iniciarSesion = (correo, password, tipo) =>
  api('/auth/login', { method: 'POST', body: JSON.stringify({ correo, password, tipo }) });

export const registrarUsuario = (datos) =>
  api('/auth/register', { method: 'POST', body: JSON.stringify(datos) });

export const obtenerPerfil = () => api('/perfil');

export const actualizarPerfil = (datos) =>
  api('/perfil', { method: 'PUT', body: JSON.stringify(datos) });