import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductReviews: build.query({
      query: (id) => ({
        url: `/reviews/product-id/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),

    deleteProductReview: build.mutation({
      query: (id) => ({
        url: `/reviews/product-id/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetProductReviewsQuery, useDeleteProductReviewMutation } =
  reviewsApi;
