import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const expensesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCourierInfo: build.mutation({
      query: (data) => ({
        url: "/courier/create-info",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.courierInfo],
    }),

    updateCourierInfo: build.mutation({
      query: (id) => ({
        url: `/courier/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.courierInfo],
    }),

    getCourierInfo: build.query({
      query: (id) => ({
        url: `/courier/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.courierInfo],
    }),

    getAllCourierInfos: build.query({
      query: () => ({
        url: "/courier",
        method: "GET",
      }),
      providesTags: [tagTypes.courierInfo],
    }),
  }),
});

export const {
  useCreateCourierInfoMutation,
  useUpdateCourierInfoMutation,
  useGetAllCourierInfosQuery,
  useGetCourierInfoQuery,
} = expensesApi;
