import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addHomePageText: build.mutation({
      query: (data) => ({
        url: "/home-page-text/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    getHomePageText: build.query({
      query: () => ({
        url: "/home-page-text",
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    updateHomePageText: build.mutation({
      query: ({ textId, ...data }) => ({
        url: `/home-page-text/${textId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    deleteHomePageText: build.mutation({
      query: ({ textId }) => ({
        url: `/home-page-text/${textId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
  }),
});

export const {
  useAddHomePageTextMutation,
  useGetHomePageTextQuery,
  useUpdateHomePageTextMutation,
  useDeleteHomePageTextMutation,
} = couponApi;
