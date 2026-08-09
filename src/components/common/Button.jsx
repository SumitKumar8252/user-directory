import React from "react";
import clsx from "clsx";

const VARIANT_CLASSES = {
  primary: "bg-primary hover:bg-primaryDark text-white",
  secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
};

const SIZE_CLASSES = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};


const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && "w-full",
        className
      )}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
    </button>
  );
};

export default Button;
