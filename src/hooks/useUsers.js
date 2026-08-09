import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { userService } from "../api/userService";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";


const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const skip = (page - 1) * pageSize;
    const [sortBy, order] = sortValue ? sortValue.split("-") : [undefined, undefined];

    try {
      const data = searchQuery
        ? await userService.searchUsers({ q: searchQuery, limit: pageSize, skip })
        : await userService.getUsers({ limit: pageSize, skip, sortBy, order });

      setUsers(data.users || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      toast.error("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, searchQuery, sortValue]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const updateSort = (value) => {
    setSortValue(value);
    setPage(1);
  };

  const updatePageSize = (size) => {
    setPageSize(size);
    setPage(1);
  };

  return {
    users,
    total,
    page,
    pageSize,
    searchQuery,
    sortValue,
    isLoading,
    error,
    setPage,
    setSearchQuery: updateSearchQuery,
    setSortValue: updateSort,
    setPageSize: updatePageSize,
    refetch: fetchUsers,
  };
};

export default useUsers;
