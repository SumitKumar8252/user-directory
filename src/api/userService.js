import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../utils/constants";


export const userService = {
  /**
   * Fetch a page of users.
   * @param {{ limit: number, skip: number, sortBy?: string, order?: 'asc'|'desc' }} params
   */
  getUsers: ({ limit, skip, sortBy, order }) => {
    const params = { limit, skip };
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;

    return axiosInstance.get(API_ENDPOINTS.GET_USERS, { params }).then((res) => res.data);
  },


  searchUsers: ({ q, limit, skip }) =>
    axiosInstance
      .get(API_ENDPOINTS.SEARCH_USERS, { params: { q, limit, skip } })
      .then((res) => res.data),

  addUser: (payload) => axiosInstance.post(API_ENDPOINTS.ADD_USER, payload).then((res) => res.data),

  updateUser: (id, payload) =>
    axiosInstance.put(API_ENDPOINTS.UPDATE_USER(id), payload).then((res) => res.data),

  deleteUser: (id) => axiosInstance.delete(API_ENDPOINTS.DELETE_USER(id)).then((res) => res.data),
};
