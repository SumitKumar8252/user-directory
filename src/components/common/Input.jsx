import React from "react";
import clsx from "clsx";


const Input = ({ label, name, type = "text", value, onChange, placeholder, error, required, ...rest }) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-[13px] font-medium text-slate-700 mb-1 block">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "w-full border rounded-md px-3 py-2.5 text-sm bg-slate-50 outline-none transition-colors",
          error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-primary"
        )}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
