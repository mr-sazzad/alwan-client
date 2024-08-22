import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const colorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNewColor: build.mutation({
      query: (data) => ({
        url: "/colors/create-color",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.color],
    }),

    getAllColors: build.query({
      query: () => ({
        url: "/colors",
        method: "GET",
      }),
      providesTags: [tagTypes.color],
    }),

    getSingleColorById: build.query({
      query: (colorId) => ({
        url: `/colors/get-single/${colorId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.color],
    }),

    updateSingleColor: build.mutation({
      query: ({ colorId, ...data }) => ({
        url: `/colors/update-single/${colorId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.color],
    }),

    deleteSingleColor: build.mutation({
      query: ({ colorId, data }) => ({
        url: `/colors/remove-single/${colorId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.color],
    }),
  }),
});

export const {
  useCreateNewColorMutation,
  useGetAllColorsQuery,
  useGetSingleColorByIdQuery,
  useUpdateSingleColorMutation,
  useDeleteSingleColorMutation,
} = colorApi;
