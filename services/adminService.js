import api from './api';

export const obtenerResumen = () => api('/admin/resumen');
export const obtenerEspecialistas = () => api('/admin/especialistas');