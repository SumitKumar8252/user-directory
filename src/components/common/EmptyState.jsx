import React from "react";
import { LuUsers } from "react-icons/lu";

const EmptyState = ({ title = "No users found", subtitle = "Try adjusting your search or filters." }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-slate-200 rounded-xl bg-white">
    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
      <LuUsers className="text-slate-400" size={22} />
    </div>
    <p className="text-slate-700 font-medium text-sm">{title}</p>
    <p className="text-slate-400 text-xs mt-1">{subtitle}</p>
  </div>
);

export default EmptyState;
