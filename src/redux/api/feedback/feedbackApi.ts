import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addFeedback: build.mutation({
      query: (data) => ({
        url: "/feedbacks/new",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    getFeedbacks: build.query({
      query: () => ({
        url: "/feedbacks",
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),
  }),
});

export const { useAddFeedbackMutation, useGetFeedbacksQuery } = feedbackApi;
