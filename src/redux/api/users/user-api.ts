import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdmins: build.query({
      query: () => ({
        url: `/users/admins`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getAllUsers: build.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getSingleUser: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateSingleUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    deleteSingleUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
  useDeleteSingleUserMutation,
} = userApi;
