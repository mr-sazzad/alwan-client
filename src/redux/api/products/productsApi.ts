import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => ({
        url: "/products/register-product",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product],
    }),

    getAllProducts: build.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    getNewArrivalProducts: build.query({
      query: () => ({
        url: "/products/new-arrivals",
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    getCategoryProducts: build.query({
      query: (categoryId) => ({
        url: `/products/categories/${categoryId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    getSingleProduct: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    updateProduct: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/single-product/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    deleteSingleProduct: build.mutation({
      query: (id) => ({
        url: `/products/single-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetNewArrivalProductsQuery,
  useGetCategoryProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteSingleProductMutation,
} = productsApi;
