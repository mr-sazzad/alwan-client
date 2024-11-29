import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const homePageTextApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addHomePageText: build.mutation({
      query: (data) => ({
        url: "/home-page-text/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.homeText],
    }),

    getHomePageText: build.query({
      query: () => ({
        url: "/home-page-text",
        method: "GET",
      }),
      providesTags: [tagTypes.homeText],
    }),

    updateHomePageText: build.mutation({
      query: ({ textId, ...data }) => ({
        url: `/home-page-text/${textId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.homeText],
    }),

    deleteHomePageText: build.mutation({
      query: (textId) => ({
        url: `/home-page-text/${textId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.homeText],
    }),
  }),
});

export const {
  useAddHomePageTextMutation,
  useGetHomePageTextQuery,
  useUpdateHomePageTextMutation,
  useDeleteHomePageTextMutation,
} = homePageTextApi;
