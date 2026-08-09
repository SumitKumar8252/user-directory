import React from "react";

const Spinner = ({ label }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10">
    <div className="w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
    {label && <p className="text-sm text-slate-500">{label}</p>}
  </div>
);

export default Spinner;
