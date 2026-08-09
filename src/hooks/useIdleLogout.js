import { useEffect, useRef, useContext, useCallback } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { IDLE_TIMEOUT_MS } from "../utils/constants";
import { storage } from "../utils/storage";

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

const useIdleLogout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const timerRef = useRef(null);

  const handleLogout = useCallback(() => {
    toast.error("You've been logged out after 1 hour of inactivity.");
    logout();
  }, [logout]);

  const resetTimer = useCallback(() => {
    storage.setLastActivity();

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, IDLE_TIMEOUT_MS);
  }, [handleLogout]);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    resetTimer();
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated, resetTimer]);
};

export default useIdleLogout;
