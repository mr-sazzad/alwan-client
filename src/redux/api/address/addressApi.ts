import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const addressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addNewAddress: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/addresses/${id}/new-address`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.address],
    }),

    getAllAddresses: build.query({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.address],
    }),

    getDefaultAddress: build.query({
      query: (userId) => ({
        url: `/addresses/${userId}/default-address`,
        method: "GET",
      }),
      providesTags: [tagTypes.address],
    }),

    setActiveAddress: build.mutation({
      query: ({ userId, addressId }) => ({
        url: `/addresses/${userId}/default-address/${addressId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.address],
    }),

    updateAddress: build.mutation({
      query: ({ addressId, ...data }) => ({
        url: `/addresses/${addressId}/update`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: tagTypes.address, id: userId },
      ],
    }),

    deleteAddress: build.mutation({
      query: ({ addressId, userId }) => ({
        url: `/addresses/${userId}/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.address],
    }),
  }),
});

export const {
  useAddNewAddressMutation,
  useGetAllAddressesQuery,
  useGetDefaultAddressQuery,
  useSetActiveAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
