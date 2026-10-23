# CityVet 

App móvil (React Native + Expo) para gestionar citas veterinarias.
Funciona con una **API simulada**: no necesita backend ni base de datos.

## Requisitos

- [Node.js](https://nodejs.org) 18 o superior
- La app **Expo Go** en tu celular (Play Store / App Store), o un emulador de Android/iOS

## Cómo correrlo

1. Abre una terminal dentro de la carpeta del proyecto:

   ```bash
   cd CityVet-main
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Instala el almacenamiento local (guarda la sesión):

   ```bash
   npx expo install @react-native-async-storage/async-storage
   ```

4. Inicia el proyecto:

   ```bash
   npx expo start -c
   ```

5. Abre la app:
   - **Celular:** escanea el código QR con Expo Go (el celular y el PC deben estar en la misma red Wi-Fi).
   - **Emulador Android:** presiona `a` en la terminal.
   - **Simulador iOS (solo Mac):** presiona `i` en la terminal.

## Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Cliente | maria.gonzalez@vetcare.com | 123456 |
| Médico (pestaña "Personal Médico") | fernando.ruiz@vetcare.com | 123456 |
| Administrador | admin@vetcare.com | admin123 |

> También puedes entrar como administrador con los botones **Google** o **Apple** de la pantalla de login.
> O crear una cuenta nueva desde **Crear Cuenta**.

## Qué probar

- **Cliente:** ver mascotas, agendar una cita (servicio → fecha → hora), reagendarla o cancelarla, registrar una mascota nueva y editar el perfil.
- **Médico:** ver la agenda del día, buscar pacientes y revisar su ficha clínica.
- **Administrador:** ver métricas, especialistas y equipos.


## Notas

- Los datos viven en memoria: si recargas la app, vuelven a los valores iniciales
  (las cuentas y citas nuevas se pierden).
- `Alert.alert` con botones no funciona en la versión web. Usa Expo Go o un emulador.
- Si algo falla al iniciar, detén el servidor (`Ctrl + C`) y ejecuta de nuevo `npx expo start -c`.

## Conectar un backend real

Reemplaza `services/api.js` por un cliente que use `fetch` hacia tu servidor
(con la misma firma `api(endpoint, options)`). Las pantallas y los demás servicios no cambian.
