import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const sizesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerSize: build.mutation({
      query: (data) => ({
        url: "/sizes/create-size",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.size],
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

    updateSize: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/sizes/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.size],
    }),

    deleteSize: build.mutation({
      query: (sizeId) => ({
        url: `/sizes/${sizeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useRegisterSizeMutation,
  useGetAllSizesQuery,
  useGetSingleSizeQuery,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} = sizesApi;
