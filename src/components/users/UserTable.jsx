import React from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <th className="px-5 py-3">User</th>
            <th className="px-5 py-3 hidden md:table-cell">Email</th>
            <th className="px-5 py-3 hidden sm:table-cell">Age</th>
            <th className="px-5 py-3 hidden sm:table-cell">Gender</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="w-9 h-9 rounded-full object-cover bg-slate-100"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div>
                    <p className="font-medium text-slate-800">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-slate-400 md:hidden">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 text-slate-500 hidden md:table-cell">{user.email}</td>
              <td className="px-5 py-3 text-slate-500 hidden sm:table-cell">{user.age}</td>
              <td className="px-5 py-3 text-slate-500 capitalize hidden sm:table-cell">{user.gender}</td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 rounded-md text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                    title="Edit"
                  >
                    <LuPencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-2 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <LuTrash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
