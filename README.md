# City Vet 🐾

Aplicación móvil desarrollada con **React Native** y **Expo** para la gestión integral de servicios veterinarios, permitiendo la administración de citas, perfiles de mascotas, y paneles especializados para clientes, veterinarios y administradores.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

- **Node.js**: Versión 18 o superior (entorno probado con `v24.20.0`).
- **npm**: Versión 9 o superior (entorno probado con `11.19.0`).
- **Expo Go** (Opcional, para pruebas en dispositivos físicos): Disponible en [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) o [Apple App Store](https://apps.apple.com/app/expo-go/id982107779).
- **Emulador Android / Simulador iOS** (Opcional, si deseas ejecutar en entorno virtualizado local).

---

## 🚀 Instalación

1. **Clonar el repositorio** (si aún no lo has descargado):
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd CityVet
   ```

2. **Instalar las dependencias del proyecto**:
   ```bash
   npm install
   ```

---

## 💻 Instrucciones de Ejecución

Inicia el servidor de desarrollo de Expo con el siguiente comando:

```bash
npm start
```

> **Alternativa:** También puedes usar `npx expo start`.

### Modos de visualización:

1. **En tu dispositivo móvil (Recomendado):**
   - Asegúrate de que tu teléfono y tu computadora estén conectados a la **misma red Wi-Fi**.
   - Abre la app **Expo Go**:
     - **Android:** Escanea el código QR que aparece en la terminal o en la interfaz web de Expo.
     - **iOS:** Escanea el código QR con la app de Cámara predeterminada y abre el enlace en Expo Go.

2. **En un Emulador de Android:**
   - Asegúrate de tener Android Studio y un dispositivo virtual (AVD) configurado.
   - Ejecuta:
     ```bash
     npm run android
     ```
     *(O presiona la tecla `a` en la terminal donde se está ejecutando `npm start`).*

3. **En un Simulador de iOS (Solo macOS):**
   - Asegúrate de tener Xcode instalado.
   - Ejecuta:
     ```bash
     npm run ios
     ```
     *(O presiona la tecla `i` en la terminal donde se está ejecutando `npm start`).*

4. **En el Navegador Web:**
   - Ejecuta:
     ```bash
     npm run web
     ```
     *(O presiona la tecla `w` en la terminal donde se está ejecutando `npm start`).*

### Comandos útiles en la consola de Expo:
- `r` — Recargar la aplicación (*Reload*).
- `m` — Alternar el menú de desarrollador (*Developer menu*).
- `c` — Limpiar caché (*Clear cache*).
- `Ctrl + C` — Detener el servidor de desarrollo.

---

## 📁 Estructura del Proyecto

```text
CityVet/
├── assets/                 # Recursos gráficos (iconos, splash screen, imágenes)
├── components/             # Componentes reutilizables
│   ├── AdminTabBar.js      # Barra de navegación inferior para administradores
│   ├── BottomTabBar.js     # Barra de navegación inferior general
│   └── AppointmentsVsCostsChart.js # Gráfico de métricas citas vs. costos
├── Screens/                # Pantallas principales de la aplicación
│   ├── LoginScreen.js             # Inicio de sesión
│   ├── CreateAccountScreen.js     # Creación de cuenta de usuario
│   ├── ClientDashboardScreen.js   # Panel principal del cliente
│   ├── ClientProfileScreen.js     # Perfil del cliente
│   ├── PetProfileScreen.js        # Perfil y detalles de la mascota
│   ├── RegisterPetScreen.js       # Registro de nueva mascota
│   ├── SelectServiceScreen.js     # Selección de servicios veterinarios
│   ├── SelectDateTimeScreen.js    # Selección de fecha y hora de cita
│   ├── MyAppointmentsScreen.js    # Lista de citas agendadas
│   ├── VetPanelScreen.js          # Panel de atención veterinaria
│   ├── VetAccountScreen.js        # Cuenta y configuración del veterinario
│   ├── AdminPanelScreen.js        # Panel administrativo con métricas
│   └── AdminSpecialistsScreen.js  # Gestión de especialistas veterinarios
├── Theme/                  # Estilos globales y paleta de colores
│   └── colors.js           # Definición de colores del tema
├── App.js                  # Configuración de rutas y navegación Stack
├── app.json                # Configuración de Expo y metadatos de la app
└── package.json            # Dependencias y scripts del proyecto
```

---

## 🛠️ Tecnologías Principales

- **[React Native](https://reactnative.dev/)** (v0.86.3)
- **[Expo](https://expo.dev/)** (SDK ~57.0)
- **[React Navigation](https://reactnavigation.org/)** (v7) — Navegación tipo Stack (`@react-navigation/native-stack`)
- **[React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)**
- **[Expo Vector Icons](https://icons.expo.fyi/)**

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](file:///home/ktulug/Projects/CityVet/LICENSE) para más detalles.
