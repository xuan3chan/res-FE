export const CONSTANTS = {
  // API
  API_TIMEOUT: 30000, // 30 seconds
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB

  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,

  // Storage keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    THEME: "theme",
    USER: "user",
  },

  // Routes
  ROUTES: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
    NOT_FOUND: "/404",
  },
} as const;

export type Theme = "light" | "dark" | "system";
