import React, { createContext, useContext, useState } from 'react';
import { iniciarSesion, registrarUsuario } from '../services/authService';
import { guardarToken, eliminarToken } from '../services/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const login = async (correo, password, tipo) => {
    const respuesta = await iniciarSesion(correo, password, tipo);
    await guardarToken(respuesta.token);
    setUsuario(respuesta.usuario);
    return respuesta.usuario;
  };

  const registrar = async (datos) => {
    const respuesta = await registrarUsuario(datos);
    await guardarToken(respuesta.token);
    setUsuario(respuesta.usuario);
    return respuesta.usuario;
  };

  const logout = async () => {
    await eliminarToken();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout, actualizarUsuario: setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);