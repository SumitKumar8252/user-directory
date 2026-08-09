import React, { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "../api/authService";
import { registerLogoutHandler } from "../api/axiosInstance";
import { storage } from "../utils/storage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(storage.getToken()));

  const logout = useCallback((options = {}) => {
    storage.clearSession();
    setUser(null);
    setIsAuthenticated(false);

    if (!options.silentRedirect) {
      window.location.href = "/login";
    }
  }, []);


  useEffect(() => {
    registerLogoutHandler(() => logout({ silentRedirect: false }));
  }, [logout]);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    const token = data.token || data.accessToken;

    storage.setToken(token);
    storage.setUser(data);
    storage.setLastActivity();

    setUser(data);
    setIsAuthenticated(true);

    return data;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
