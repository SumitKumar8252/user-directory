import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import useIdleLogout from "../../hooks/useIdleLogout";


const AppLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  useIdleLogout();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 min-w-0 px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
