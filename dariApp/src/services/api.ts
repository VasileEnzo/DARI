import axios, {
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import { Platform } from "react-native";



const ANDROID_EMULATOR = "http://10.0.2.2:8000";
const IOS_SIMULATOR = "http://localhost:8000";
// Cambia IP si probás en dispositivo físico:!!!!!!!!!!!!!!!!
const DEVICE_LAN = "http://192.168.0.15:8000";

const DEV_BASE_URL =
  Platform.OS === "android" ? ANDROID_EMULATOR : IOS_SIMULATOR;
const PROD_BASE_URL = "https://api.tu-dominio.com";

export const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api',
  timeout: 10000,
});

let accessToken: string | null = null;
export const setToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${accessToken}`
    );
  }
  return config;
});
