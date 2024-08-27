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
      query: ({ id }) => ({
        url: `/addresses/${id}/addresses`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.address, id }],
    }),

    getActiveAddress: build.query({
      query: ({ id }) => ({
        url: `/addresses/user/${id}/active-address`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.address, id }],
    }),

    setActiveAddress: build.mutation({
      query: ({ userId, addressId }) => ({
        url: `/addresses/${userId}/set-active-address/${addressId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: tagTypes.address, id: userId },
      ],
    }),

    updateAddress: build.mutation({
      query: ({ addressId }) => ({
        url: `/addresses/${addressId}/update`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: tagTypes.address, id: userId },
      ],
    }),

    deleteAddress: build.mutation({
      query: ({ addressId, userId }) => ({
        url: `/addresses/${userId}/address/${addressId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.address],
    }),
  }),
});

export const {
  useAddNewAddressMutation,
  useGetAllAddressesQuery,
  useGetActiveAddressQuery,
  useSetActiveAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
