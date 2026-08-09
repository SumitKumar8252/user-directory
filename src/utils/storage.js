import { STORAGE_KEYS } from "./constants";


export const storage = {
  getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),
  setToken: (token) => localStorage.setItem(STORAGE_KEYS.TOKEN, token),

  getUser: () => {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setUser: (user) => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),

  getLastActivity: () => Number(localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY)) || Date.now(),
  setLastActivity: (timestamp = Date.now()) =>
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, String(timestamp)),

  clearSession: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
  },
};
