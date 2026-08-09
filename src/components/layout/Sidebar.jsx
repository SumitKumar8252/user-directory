import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LuUsers, LuLogOut, LuLayoutDashboard } from "react-icons/lu";
import { AuthContext } from "../../context/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LuLayoutDashboard },
  { to: "/users", label: "User Directory", icon: LuUsers },
];

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-100 h-screen sticky top-0 flex flex-col">
      <div className="px-6 py-5 border-b border-slate-100">
        <span className="text-lg font-bold text-slate-800">
          User<span className="text-primary">Directory</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <img
            src={user?.image}
            alt={user?.firstName}
            className="w-8 h-8 rounded-full object-cover bg-slate-100"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LuLogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
