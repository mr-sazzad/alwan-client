import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const carouselApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourierRatio: build.mutation({
      query: (data) => ({
        url: "/courier/check",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.courier],
    }),
  }),
});

export const { useGetCourierRatioMutation } = carouselApi;
