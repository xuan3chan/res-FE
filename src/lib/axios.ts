import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config";
import { CONSTANTS } from "@/config/constants";
import { storage } from "@/utils/storage";

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: CONSTANTS.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.get(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      // Clear tokens and redirect to login
      storage.remove(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
      window.location.href = CONSTANTS.ROUTES.LOGIN;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
