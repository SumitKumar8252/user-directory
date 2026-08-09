import React from "react";
import { LuList, LuLayoutGrid } from "react-icons/lu";
import { VIEW_MODES } from "../../utils/constants";

const ViewToggle = ({ viewMode, onChange }) => {
  return (
    <div className="flex items-center border border-slate-200 rounded-md p-0.5 bg-white shrink-0">
      <button
        onClick={() => onChange(VIEW_MODES.LIST)}
        className={`p-2 rounded transition-colors ${
          viewMode === VIEW_MODES.LIST ? "bg-primary text-white" : "text-slate-400 hover:text-slate-600"
        }`}
        title="List view"
      >
        <LuList size={16} />
      </button>
      <button
        onClick={() => onChange(VIEW_MODES.GRID)}
        className={`p-2 rounded transition-colors ${
          viewMode === VIEW_MODES.GRID ? "bg-primary text-white" : "text-slate-400 hover:text-slate-600"
        }`}
        title="Grid view"
      >
        <LuLayoutGrid size={16} />
      </button>
    </div>
  );
};

export default ViewToggle;
