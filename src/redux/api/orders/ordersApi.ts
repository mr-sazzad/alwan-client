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
        url: `/orders/single-order/${orderId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    updateOrderByOrderId: build.mutation({
      query: ({ orderId, ...data }) => ({
        url: `/orders/update-order/${orderId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),

    updateOrderStatus: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/orders/update-order-item/${id}`,
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
  useUpdateOrderByOrderIdMutation,
  useUpdateOrderStatusMutation,
} = ordersApi;
