import React from "react";
import clsx from "clsx";

const Select = ({ label, name, value, onChange, options, error, required, placeholder = "Select..." }) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-[13px] font-medium text-slate-700 mb-1 block">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={clsx(
          "w-full border rounded-md px-3 py-2.5 text-sm bg-slate-50 outline-none transition-colors",
          error ? "border-red-400" : "border-slate-200 focus:border-primary"
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;
