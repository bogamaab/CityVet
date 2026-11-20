import { obtenerToken } from "./authStorage";
import { BASE_URL } from "../config/apiConfig";

const fallar = (status, message) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

/**
 * Cliente HTTP para el backend CityVet (Ktor 3.x / Firestore).
 * Conecta automáticamente el header Authorization Bearer y gestiona errores ApiException.
 */
const api = async (endpoint, options = {}) => {
  const token = await obtenerToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${BASE_URL}${endpoint}`;
  let response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err) {
    fallar(
      503,
      "No se pudo conectar con el servidor backend CityVet. Asegúrate de que esté corriendo en http://localhost:8080",
    );
  }

  if (response.status === 204) {
    return null;
  }

  let data = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = {};
    }
  } else {
    try {
      data = await response.text();
    } catch {
      data = "";
    }
  }

  if (!response.ok) {
    const mensaje =
      data && typeof data === "object" && data.message
        ? data.message
        : typeof data === "string" && data
          ? data
          : `Error ${response.status}`;
    fallar(response.status, mensaje);
  }

  return data;
};

export default api;
