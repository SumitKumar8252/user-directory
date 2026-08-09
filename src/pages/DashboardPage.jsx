import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuUsers, LuArrowRight } from "react-icons/lu";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/common/Button";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        Welcome back, {user?.firstName || "there"} 👋
      </h1>
      <p className="text-sm text-slate-500 mt-1 mb-8">
        Here's a quick jump-off point into your workspace.
      </p>

      <div
        onClick={() => navigate("/users")}
        className="cursor-pointer bg-white border border-slate-100 rounded-xl p-6 max-w-sm hover:shadow-md transition-shadow"
      >
        <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
          <LuUsers size={20} />
        </div>
        <h3 className="font-semibold text-slate-800">User Directory</h3>
        <p className="text-sm text-slate-500 mt-1 mb-4">
          Search, filter, and manage all registered users.
        </p>
        <Button variant="secondary" size="sm" icon={LuArrowRight}>
          Open Directory
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
