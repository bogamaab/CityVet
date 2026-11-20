# CityVet Frontend 🐾📱

Aplicación móvil y web desarrollada con **React Native** y **Expo (SDK 58)** para la gestión integral de citas veterinarias, historial médico de pacientes, control de mascotas y paneles especializados para clientes, personal médico y administradores. Se conecta a la API REST de **CityVet Backend** (Ktor 3.x / Cloud Firestore).

---

## 📌 1. Versiones del Entorno y Librerías

| Herramienta / Paquete | Versión en Ejecución | Propósito |
|---|---|---|
| **Node.js** | `v24.20.0` (soporta >= 18) | Entorno de ejecución de JavaScript en servidor / CLI |
| **npm** | `11.19.0` | Gestor de paquetes |
| **Expo SDK** | `58.0.26` | Framework y toolchain universal React Native |
| **Expo CLI** | `58.1.21` | Herramienta de línea de comandos para arranque y empaquetado |
| **React** | `19.3.0` | Biblioteca base de componentes de interfaz |
| **React Native** | `0.88.1` | Framework nativo multiplataforma |
| **React Native Web** | `0.21.4` | Renderizado nativo en navegadores web |
| **React Navigation Native** | `7.3.18` | Contenedor principal de navegación |
| **React Navigation Native Stack**| `7.18.10` | Enrutador tipo Stack Navigation |
| **AsyncStorage** | `2.2.0` | Persistencia en almacenamiento local seguro de sesión/token |
| **Vector Icons (@expo/vector-icons)**| `15.0.2` | Catálogo de iconos (Ionicons, MaterialIcons, etc.) |
| **Backend Asociado** | Ktor `3.1.3` / JDK `21` | Servidor REST conectado en `http://localhost:8080` |

---

## 📦 2. Dependencias del Proyecto

Declaradas en [package.json](file:///home/ktulug/Projects/CityVet/package.json):

```json
"dependencies": {
  "@expo/vector-icons": "^15.0.2",
  "@react-native-async-storage/async-storage": "2.2.0",
  "@react-navigation/native": "^7.3.18",
  "@react-navigation/native-stack": "^7.18.10",
  "expo": "^58.0.26",
  "expo-font": "~58.0.11",
  "expo-status-bar": "~58.0.4",
  "react": "19.3.0",
  "react-dom": "19.3.0",
  "react-native": "0.88.1",
  "react-native-gesture-handler": "~3.3.0",
  "react-native-safe-area-context": "~5.10.1",
  "react-native-screens": "~4.30.0",
  "react-native-web": "^0.21.4"
}
```

---

## ⚙️ 3. Requisitos Previos

1. **Node.js** v18 o superior instalado en el equipo.
2. **Backend Ktor activo:** El servidor [cityvet-backend](file:///home/ktulug/Projects/cityvet-backend) debe estar corriendo en `http://localhost:8080` (o accesible vía IP local para dispositivos físicos).
3. **Plataforma de destino:**
   - **Navegador Web:** Google Chrome, Edge o Firefox.
   - **Emulador Android:** Android Studio con un AVD (Android Virtual Device) configurado.
   - **Dispositivo móvil físico:** Aplicación **Expo Go** instalada (disponible en Google Play Store o Apple App Store).

---

## 🔗 4. Cómo se Conecta con el Backend

El frontend se comunica con la API REST mediante un cliente HTTP centralizado en [services/api.js](file:///home/ktulug/Projects/CityVet/services/api.js) y configuración dinámica de host en [config/apiConfig.js](file:///home/ktulug/Projects/CityVet/config/apiConfig.js):

### 4.1 Resolución Dinámica de URL Base (`BASE_URL`)
`config/apiConfig.js` detecta automáticamente la plataforma:
- **Web (`Platform.OS === 'web'`):** `http://localhost:8080`
- **Emulador Android:** `http://10.0.2.2:8080` (alias interno del host del emulador)
- **Dispositivo Físico (Expo Go):** Detecta la IP del host de depuración de Expo (`hostUri`) o permite definir la IP local de tu máquina (ej. `http://192.168.1.15:8080`).

### 4.2 Inyección Automática de Token Bearer
Cada petición realizada mediante `api(endpoint, options)` recupera el token JWT/UUID guardado en **AsyncStorage** mediante `obtenerToken()` e inyecta el encabezado:
```http
Authorization: Bearer <token>
Content-Type: application/json
```

### 4.3 Capa de Servicios Modulares

| Archivo de Servicio | Endpoints del Backend Consumidos | Funcionalidad |
|---|---|---|
| [services/authService.js](file:///home/ktulug/Projects/CityVet/services/authService.js) | `POST /auth/login`<br>`POST /auth/register`<br>`GET /perfil`<br>`PUT /perfil` | Autenticación, creación de cuentas y actualización de datos personales |
| [services/citaService.js](file:///home/ktulug/Projects/CityVet/services/citaService.js) | `GET /servicios`<br>`GET /dias`<br>`GET /horarios`<br>`GET /citas`<br>`POST /citas`<br>`PUT /citas/:id`<br>`DELETE /citas/:id` | Catálogo de servicios, cálculo de horarios libres, agendar, reagendar y cancelar citas |
| [services/mascotaService.js](file:///home/ktulug/Projects/CityVet/services/mascotaService.js) | `GET /mascotas`<br>`POST /mascotas` | Listado de mascotas del tutor y registro de nuevos animales |
| [services/vetService.js](file:///home/ktulug/Projects/CityVet/services/vetService.js) | `GET /veterinario/agenda`<br>`GET /pacientes`<br>`GET /pacientes/:id` | Agenda diaria del profesional, buscador y ficha clínica detallada |
| [services/adminService.js](file:///home/ktulug/Projects/CityVet/services/adminService.js) | `GET /admin/resumen`<br>`GET /admin/especialistas` | Métricas operativas, estadísticas mensuales y asignación de salas |

---

## 🚀 5. Formas de Ejecutar el Proyecto

Desde la raíz del proyecto `/home/ktulug/Projects/CityVet`:

### Paso previo: Instalar dependencias
```bash
npm install
```

### Opción A: Ejecución en Navegador Web
Ideal para pruebas rápidas y depuración con las herramientas de red de Chrome/Edge:
```bash
npx expo start --web
```
o mediante script npm:
```bash
npm run web
```
Se abrirá automáticamente en `http://localhost:8081`.

---

### Opción B: Ejecución en Emulador Android
1. Abre tu emulador en **Android Studio**.
2. Ejecuta en terminal:
```bash
npx expo start --android
```
o:
```bash
npm run android
```
Expo instalará la aplicación en el emulador y se conectará automáticamente al backend mediante `http://10.0.2.2:8080`.

---

### Opción C: Ejecución en Celular Físico con Expo Go
1. Conecta tu teléfono y tu PC a la **misma red Wi-Fi**.
2. Si es necesario, verifica o ajusta la IP local de tu PC en [config/apiConfig.js](file:///home/ktulug/Projects/CityVet/config/apiConfig.js).
3. Inicia el servidor de desarrollo:
```bash
npx expo start -c
```
4. Abre la app **Expo Go** en tu móvil y escanea el código QR mostrado en la terminal.

---

## 📂 6. Estructura del Proyecto

```text
CityVet/
├── App.js                     # Configuración de Stack Navigator y Context Providers
├── app.json                   # Metadatos del proyecto Expo (nombre, íconos, splash)
├── package.json               # Dependencias, scripts y versiones
├── package-lock.json          # Árbol de dependencias bloqueado
├── index.js                   # Entrypoint de Expo
├── config/
│   └── apiConfig.js           # Resolución dinámica de la URL base del backend
├── context/
│   └── AuthContext.js         # Estado global de sesión, usuario activo y login/logout
├── services/
│   ├── api.js                 # Cliente HTTP fetch con Bearer Token y manejo de errores
│   ├── authStorage.js         # Métodos de lectura y guardado en AsyncStorage
│   ├── authService.js         # Peticiones de login, registro y perfil
│   ├── citaService.js         # Peticiones de servicios, días, horas y citas
│   ├── mascotaService.js      # Peticiones de mascotas del cliente
│   ├── vetService.js          # Peticiones de agenda médica y pacientes
│   └── adminService.js        # Peticiones de dashboard y especialistas
├── components/
│   ├── BottomTabBar.js        # Barra de navegación inferior reutilizable
│   └── ServiceItem.js         # Tarjeta de selección de servicios
├── Screens/                   # Pantallas de la aplicación
│   ├── LoginScreen.js         # Inicio de sesión con selector de rol
│   ├── CreateAccountScreen.js # Registro de nuevos tutores o médicos
│   ├── ClientDashboardScreen.js # Panel principal del tutor (mascotas y accesos directos)
│   ├── RegisterPetScreen.js   # Formulario de registro de mascota
│   ├── SelectServiceScreen.js # Paso 1: Selección de especialidad/servicio
│   ├── SelectDateTimeScreen.js# Paso 2: Selección de fecha, hora y confirmación de cita
│   ├── MyAppointmentsScreen.js# Listado de citas próximas e historial con cancelación
│   ├── ClientProfileScreen.js # Perfil del cliente y preferencias de notificación
│   ├── VetPanelScreen.js      # Panel del veterinario: agenda del día
│   ├── VetAccountScreen.js    # Perfil y estado laboral del veterinario
│   ├── PetProfileScreen.js    # Buscador y ficha médica del paciente
│   ├── AdminPanelScreen.js    # Panel del admin: métricas y comparativa mensual
│   └── AdminSpecialistsScreen.js # Panel del admin: estado de médicos y recursos
├── Theme/
│   └── colors.js              # Paleta de colores oficial de CityVet
└── assets/                    # Íconos, logotipos e imágenes de la app
```

---

## 🗺️ 7. Rutas y Pantallas de Navegación ([App.js](file:///home/ktulug/Projects/CityVet/App.js))

La navegación se gestiona mediante un Stack Navigator sin cabecera nativa (`headerShown: false`):

| Nombre de la Ruta | Componente | Rol de Acceso | Descripción |
|---|---|---|---|
| `Login` | `LoginScreen` | Público | Pantalla inicial con formulario de acceso y tabs por rol |
| `CreateAccount` | `CreateAccountScreen` | Público | Formulario de alta para nuevos clientes o médicos |
| `ClientDashboard` | `ClientDashboardScreen` | Cliente | Panel inicial del tutor, muestra sus mascotas y accesos rápidos |
| `RegisterPet` | `RegisterPetScreen` | Cliente | Formulario para registrar una nueva mascota en la clínica |
| `SelectService` | `SelectServiceScreen` | Cliente | Catálogo de servicios disponibles con precios |
| `SelectDateTime` | `SelectDateTimeScreen` | Cliente | Selección de día, horario disponible y confirmación de cita |
| `MyAppointments` | `MyAppointmentsScreen` | Cliente | Vista con tabs para citas "Próximas" e "Historial" con opción de cancelar/reagendar |
| `ClientProfile` | `ClientProfileScreen` | Cliente | Edición de teléfono, dirección y switches de recordatorios |
| `VetPanel` | `VetPanelScreen` | Médico | Vista diaria de la agenda médica con horarios y pacientes asignados |
| `PetProfile` | `PetProfileScreen` | Médico | Buscador de mascotas y visualización de ficha clínica completa con tutor |
| `VetAccount` | `VetAccountScreen` | Médico | Ficha de perfil profesional y ajustes de cuenta |
| `AdminPanel` | `AdminPanelScreen` | Admin | Dashboard general con métricas de citas del mes y acumulados |
| `AdminSpecialists` | `AdminSpecialistsScreen` | Admin | Monitor de médicos activos, consultas atendidas y estado de quirófanos |

---

## 👥 8. Cuentas de Prueba Preconfiguradas

| Rol | Correo | Contraseña | Destino Inicial |
|---|---|---|---|
| **Cliente** | `maria.gonzalez@vetcare.com` | `123456` | `ClientDashboard` (mascotas Max y Luna) |
| **Médico** | `fernando.ruiz@vetcare.com` | `123456` | `VetPanel` (agenda del Dr. Fernando Ruiz) |
| **Administrador** | `admin@vetcare.com` | `admin123` | `AdminPanel` (dashboard global) |

---

## 💡 9. Solución de Problemas Comunes

- **Error de conexión de red (503 / Network Error):** Verifica que el backend Ktor esté corriendo (`./gradlew run` en `cityvet-backend`). Si estás en un dispositivo físico, corrobora que la IP en `config/apiConfig.js` sea la IP local de tu PC en la red Wi-Fi.
- **Alertas en Web:** Los botones de diálogo avanzados de `Alert.alert` de React Native están optimizados para Android/iOS. En web, para pruebas completas de interacción, se recomienda probar en emulador o dispositivo móvil.
- **Limpieza de caché de Expo:** Si los cambios no se reflejan, reinicia con limpieza de caché:
  ```bash
  npx expo start -c
  ```
