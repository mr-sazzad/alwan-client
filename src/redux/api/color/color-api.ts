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
        url: `/colors/${colorId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.color],
    }),

    updateColor: build.mutation({
      query: ({ colorId, ...data }) => ({
        url: `/colors/${colorId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.color],
    }),

    deleteColor: build.mutation({
      query: (colorId) => ({
        url: `/colors/${colorId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.color],
    }),
  }),
});

export const {
  useCreateNewColorMutation,
  useGetAllColorsQuery,
  useGetSingleColorByIdQuery,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;
