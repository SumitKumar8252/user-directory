import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Select from "./Select";
import { PAGE_SIZE_OPTIONS } from "../../utils/constants";


const Pagination = ({ page, pageSize, total, onPageChange, onPageSizeChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-4">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span>
          Showing <span className="font-medium text-slate-700">{startItem}</span>-
          <span className="font-medium text-slate-700">{endItem}</span> of{" "}
          <span className="font-medium text-slate-700">{total}</span>
        </span>
        <div className="w-24">
          <Select
            name="pageSize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            options={PAGE_SIZE_OPTIONS.map((n) => ({ label: `${n} / page`, value: n }))}
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <LuChevronLeft size={16} />
        </button>
        <span className="text-sm text-slate-600 px-3">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-2 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <LuChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
