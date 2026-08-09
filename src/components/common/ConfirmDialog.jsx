import React from "react";
import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-slate-600">{message}</p>
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
