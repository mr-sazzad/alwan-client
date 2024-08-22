import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const sizesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerASize: build.mutation({
      query: (data) => ({
        url: "/sizes/create-size",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    getAllSizes: build.query({
      query: () => ({
        url: "/sizes",
        method: "GET",
      }),
      providesTags: [tagTypes.size],
    }),

    getSingleSize: build.query({
      query: (id) => ({
        url: `/sizes/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.size],
    }),

    updateSingleSize: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/sizes/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.size],
    }),

    deleteSingleSize: build.mutation({
      query: (sizeId) => ({
        url: `/sizes/${sizeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useRegisterASizeMutation,
  useGetAllSizesQuery,
  useGetSingleSizeQuery,
  useUpdateSingleSizeMutation,
  useDeleteSingleSizeMutation,
} = sizesApi;
