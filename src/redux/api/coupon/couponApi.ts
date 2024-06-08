import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createACoupon: build.mutation({
      query: (data) => ({
        url: "/coupons/create-a-coupon",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    getAllCoupons: build.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    getACouponById: build.query({
      query: (id) => ({
        url: `/coupons/get-single/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    getACouponByCode: build.query({
      query: (code) => ({
        url: `/coupons/get-single-coupon-by-code/${code}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    updateACoupon: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/coupons/update-single/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    deleteACoupon: build.mutation({
      query: ({ id, data }) => ({
        url: `/coupons/remove-single/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
  }),
});

export const {
  useCreateACouponMutation,
  useGetACouponByIdQuery,
  useGetACouponByCodeQuery,
  useGetAllCouponsQuery,
  useUpdateACouponMutation,
  useDeleteACouponMutation,
} = couponApi;
