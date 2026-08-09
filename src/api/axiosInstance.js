import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL, IDLE_TIMEOUT_MS } from "../utils/constants";
import { storage } from "../utils/storage";


let logoutHandler = () => {
  storage.clearSession();
  window.location.href = "/login";
};

export const registerLogoutHandler = (fn) => {
  logoutHandler = fn;
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const isLoginRequest = config.url?.includes("/auth/login");

    if (!isLoginRequest) {
      const lastActivity = storage.getLastActivity();
      const idleFor = Date.now() - lastActivity;

      if (idleFor >= IDLE_TIMEOUT_MS) {
        toast.error("You were logged out due to inactivity.");
        logoutHandler();
        return Promise.reject(new axios.Cancel("Session expired due to inactivity"));
      }

      const token = storage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (!error.response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    if (status === 401) {
      toast.error(data?.message || "Your session has expired. Please log in again.");
      logoutHandler();
    } else if (status >= 500) {
      toast.error("Something went wrong on the server. Please try again shortly.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
