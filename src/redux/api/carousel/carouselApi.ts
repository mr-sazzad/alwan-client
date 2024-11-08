import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const carouselApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerACarousel: build.mutation({
      query: (data) => ({
        url: "/carousel/create",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.carousel],
    }),

    getAllCarousels: build.query({
      query: () => ({
        url: "/carousel",
        method: "GET",
      }),
      providesTags: [tagTypes.carousel],
    }),

    getlatestCarousel: build.query({
      query: () => ({
        url: `/carousel/latest`,
        method: "GET",
      }),
      providesTags: [tagTypes.carousel],
    }),

    getSingleCarousel: build.query({
      query: (id) => ({
        url: `/carousel/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.carousel],
    }),

    updateCarousel: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/carousel/${id}`,
          method: "PATCH",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.carousel],
    }),

    deleteSingleCarousel: build.mutation({
      query: (id) => ({
        url: `/carousel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.carousel],
    }),
  }),
});

export const {
  useRegisterACarouselMutation,
  useGetAllCarouselsQuery,
  useGetSingleCarouselQuery,
  useGetlatestCarouselQuery,
  useUpdateCarouselMutation,
  useDeleteSingleCarouselMutation,
} = carouselApi;
