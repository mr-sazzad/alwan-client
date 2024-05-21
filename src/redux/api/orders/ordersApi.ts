import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAOrder: build.mutation({
      query: (data) => ({
        url: "/orders/create-a-order",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    getAllOrders: build.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    getSingleUserOrders: build.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    getSingleOrderByOrderId: build.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    updateSingleOrder: build.mutation({
      query: ({ userId, data }) => ({
        url: `/orders/${userId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useCreateAOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleUserOrdersQuery,
  useGetSingleOrderByOrderIdQuery,
  useUpdateSingleOrderMutation,
} = ordersApi;
