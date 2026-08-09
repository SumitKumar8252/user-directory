export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

export const IDLE_TIMEOUT_MS =
  Number(import.meta.env.VITE_IDLE_TIMEOUT_MINUTES || 60) * 60 * 1000;

export const DEFAULT_PAGE_SIZE = Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE || 10);

export const PAGE_SIZE_OPTIONS = [10, 20, 50];


export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  GET_USERS: "/auth/users",
  SEARCH_USERS: "/auth/users/search",
  ADD_USER: "/auth/users/add",
  UPDATE_USER: (id) => `/auth/users/${id}`,
  DELETE_USER: (id) => `/auth/users/${id}`,
};

// localStorage keys, centralized to avoid typos and duplication
export const STORAGE_KEYS = {
  TOKEN: "ud_auth_token",
  USER: "ud_auth_user",
  LAST_ACTIVITY: "ud_last_activity",
};

export const VIEW_MODES = {
  LIST: "list",
  GRID: "grid",
};

export const SORT_OPTIONS = [
  { label: "Name (A-Z)", value: "firstName-asc" },
  { label: "Name (Z-A)", value: "firstName-desc" },
  { label: "Age (Low-High)", value: "age-asc" },
  { label: "Age (High-Low)", value: "age-desc" },
];

export const GENDER_OPTIONS = ["male", "female"];
