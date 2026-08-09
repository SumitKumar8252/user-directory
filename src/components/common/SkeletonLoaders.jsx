import React from "react";

export const TableSkeleton = ({ rows = 6 }) => (
  <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-0">
        <div className="skeleton w-9 h-9 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-1/3 rounded" />
          <div className="skeleton h-2.5 w-1/2 rounded" />
        </div>
        <div className="skeleton h-3 w-16 rounded hidden sm:block" />
        <div className="skeleton h-7 w-16 rounded" />
      </div>
    ))}
  </div>
);

export const GridSkeleton = ({ cards = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {Array.from({ length: cards }).map((_, i) => (
      <div key={i} className="bg-white border border-slate-100 rounded-xl p-5">
        <div className="skeleton w-14 h-14 rounded-full mx-auto mb-3" />
        <div className="skeleton h-3 w-2/3 mx-auto rounded mb-2" />
        <div className="skeleton h-2.5 w-1/2 mx-auto rounded" />
      </div>
    ))}
  </div>
);
