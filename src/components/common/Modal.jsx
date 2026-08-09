import React from "react";
import { IoClose } from "react-icons/io5";


const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} bg-white rounded-xl shadow-xl max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full p-1.5 transition-colors"
          >
            <IoClose size={20} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto scrollbar-thin">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
