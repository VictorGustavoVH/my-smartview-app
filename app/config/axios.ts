import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const manifest = Constants.manifest ?? Constants.expoConfig;
const extra = manifest?.extra || {};

// Usa esta línea y ajusta tu IP local correctamente
const apiUrl = (extra.apiUrl || 'http://192.168.50.136:5000').trim();  

const api = axios.create({
  baseURL: apiUrl,
});

// Añadir JWT automáticamente a todas las peticiones autenticadas
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('AUTH_TOKEN');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
