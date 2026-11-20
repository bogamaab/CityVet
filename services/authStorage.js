import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';

export const guardarToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const obtenerToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const eliminarToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};