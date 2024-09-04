import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const productTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProductType: build.mutation({
      query: (data) => ({
        url: "/product-types/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.productType],
    }),
    getProductTypes: build.query({
      query: () => ({
        url: "/product-types",
        method: "GET",
      }),
      providesTags: [tagTypes.productType],
    }),
    getProductType: build.query({
      query: (productTypeId) => ({
        url: `/product-types/${productTypeId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.productType],
    }),
    updateProductTypeById: build.mutation({
      query: ({ productTypeId, ...data }) => ({
        url: `/product-types/${productTypeId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.productType],
    }),
  }),
});

export const {
  useCreateProductTypeMutation,
  useGetProductTypesQuery,
  useUpdateProductTypeByIdMutation,
  useGetProductTypeQuery,
} = productTypeApi;
