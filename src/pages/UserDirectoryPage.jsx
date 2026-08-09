import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuPlus } from "react-icons/lu";

import SearchBar from "../components/common/SearchBar";
import Select from "../components/common/Select";
import Button from "../components/common/Button";
import Pagination from "../components/common/Pagination";
import EmptyState from "../components/common/EmptyState";
import { TableSkeleton, GridSkeleton } from "../components/common/SkeletonLoaders";
import ConfirmDialog from "../components/common/ConfirmDialog";

import ViewToggle from "../components/users/ViewToggle";
import UserTable from "../components/users/UserTable";
import UserGridCard from "../components/users/UserGridCard";
import UserFormModal from "../components/users/UserFormModal";

import useUsers from "../hooks/useUsers";
import { userService } from "../api/userService";
import { VIEW_MODES, SORT_OPTIONS } from "../utils/constants";

const UserDirectoryPage = () => {
  const {
    users,
    total,
    page,
    pageSize,
    searchQuery,
    sortValue,
    isLoading,
    setPage,
    setSearchQuery,
    setSortValue,
    setPageSize,
    refetch,
  } = useUsers();

  const [viewMode, setViewMode] = useState(VIEW_MODES.LIST);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openAddModal = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, values);
        toast.success("User updated successfully.");
      } else {
        await userService.addUser(values);
        toast.success("User added successfully.");
      }
      setIsFormOpen(false);
      refetch();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          (editingUser ? "Failed to update user." : "Failed to add user.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await userService.deleteUser(deleteTarget.id);
      toast.success(`${deleteTarget.firstName} was deleted.`);
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      toast.error("Failed to delete user.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Browse, search, and manage all users.</p>
        </div>
        <Button icon={LuPlus} onClick={openAddModal}>
          Add User
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="w-full sm:w-48">
          <Select
            name="sort"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            options={SORT_OPTIONS}
            placeholder="Sort by..."
          />
        </div>
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      {isLoading ? (
        viewMode === VIEW_MODES.LIST ? (
          <TableSkeleton />
        ) : (
          <GridSkeleton />
        )
      ) : users.length === 0 ? (
        <EmptyState />
      ) : viewMode === VIEW_MODES.LIST ? (
        <UserTable users={users} onEdit={openEditModal} onDelete={setDeleteTarget} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserGridCard key={user.id} user={user} onEdit={openEditModal} onDelete={setDeleteTarget} />
          ))}
        </div>
      )}

      {!isLoading && total > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}

      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingUser={editingUser}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete ${deleteTarget?.firstName} ${deleteTarget?.lastName}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default UserDirectoryPage;
