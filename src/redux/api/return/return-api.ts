import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const returnApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initiateReturn: build.mutation({
      query: (data) => ({
        url: "/return/initiate-return",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),

    getReturns: build.query({
      query: (id) => ({
        url: `/return/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
  }),
});

export const { useInitiateReturnMutation, useGetReturnsQuery } = returnApi;
