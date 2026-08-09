import React from "react";
import { LuPencil, LuTrash2, LuMail } from "react-icons/lu";

const UserGridCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="group bg-white border border-slate-100 rounded-xl p-5 text-center hover:shadow-md transition-shadow relative">
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(user)}
          className="p-1.5 rounded-md text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
          title="Edit"
        >
          <LuPencil size={14} />
        </button>
        <button
          onClick={() => onDelete(user)}
          className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <LuTrash2 size={14} />
        </button>
      </div>

      <img
        src={user.image}
        alt={user.firstName}
        className="w-16 h-16 rounded-full object-cover bg-slate-100 mx-auto mb-3"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <p className="font-semibold text-slate-800 text-sm">
        {user.firstName} {user.lastName}
      </p>
      <p className="flex items-center justify-center gap-1 text-xs text-slate-400 mt-1 truncate">
        <LuMail size={12} /> {user.email}
      </p>

      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="text-[11px] bg-slate-100 text-slate-600 rounded-full px-2.5 py-1">
          {user.age} yrs
        </span>
        <span className="text-[11px] bg-slate-100 text-slate-600 rounded-full px-2.5 py-1 capitalize">
          {user.gender}
        </span>
      </div>
    </div>
  );
};

export default UserGridCard;
