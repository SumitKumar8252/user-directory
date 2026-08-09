import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../utils/constants";


export const authService = {
  login: (username, password) =>
    axiosInstance.post(API_ENDPOINTS.LOGIN, { username, password }).then((res) => res.data),
};
