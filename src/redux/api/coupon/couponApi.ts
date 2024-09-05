import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCoupon: build.mutation({
      query: (data) => ({
        url: "/coupons/create-a-coupon",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    getCoupons: build.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    getCouponById: build.query({
      query: (id) => ({
        url: `/coupons/get-single/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    getCouponByCode: build.query({
      query: (code) => ({
        url: `/coupons/get-single-coupon-by-code/${code}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    updateCoupon: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/coupons/update-single/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    deleteCoupon: build.mutation({
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
  useCreateCouponMutation,
  useGetCouponByIdQuery,
  useGetCouponByCodeQuery,
  useGetCouponsQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
