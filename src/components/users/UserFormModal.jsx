import React from "react";
import Modal from "../common/Modal";
import UserForm from "./UserForm";


const UserFormModal = ({ isOpen, onClose, editingUser, onSubmit, isSubmitting }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingUser ? "Edit User" : "Add New User"}>
      <UserForm
        initialValues={editingUser}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
};

export default UserFormModal;
