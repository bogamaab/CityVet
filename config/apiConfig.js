import { Platform } from "react-native";
import Constants from "expo-constants";

const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost ? debuggerHost.split(":")[0] : null;

const getBaseUrl = () => {
  if (Platform.OS === "web") {
    return "http://localhost:8080";
  }
  if (localIp) {
    return `http://${localIp}:8080`;
  }
  // Respaldo para emulador Android si no hay hostUri
  return Platform.OS === "android"
    ? "http://10.0.2.2:8080"
    : "http://localhost:8080";
};

export const BASE_URL = getBaseUrl();
