import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addText: build.mutation({
      query: (data) => ({
        url: "/home-page-text/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.homeText],
    }),
    getTexts: build.query({
      query: () => ({
        url: "/home-page-text",
        method: "GET",
      }),
      providesTags: [tagTypes.homeText],
    }),
    updateText: build.mutation({
      query: ({ textId, ...data }) => ({
        url: `/home-page-text/${textId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.homeText],
    }),

    deleteText: build.mutation({
      query: (textId) => ({
        url: `/home-page-text/${textId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.homeText],
    }),
  }),
});

export const {
  useAddTextMutation,
  useDeleteTextMutation,
  useGetTextsQuery,
  useUpdateTextMutation,
} = ordersApi;
