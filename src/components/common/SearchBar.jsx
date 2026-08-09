import React, { useState, useEffect } from "react";
import { LuSearch, LuX } from "react-icons/lu";


const SearchBar = ({ value, onChange, placeholder = "Search by name or email...", debounceMs = 400 }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) onChange(localValue);
    }, debounceMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue]);

  return (
    <div className="relative flex-1 min-w-[220px]">
      <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
      <input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-md pl-9 pr-8 py-2.5 text-sm bg-white outline-none focus:border-primary transition-colors"
      />
      {localValue && (
        <button
          onClick={() => setLocalValue("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <LuX size={15} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
