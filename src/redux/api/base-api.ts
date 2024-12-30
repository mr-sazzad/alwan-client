import axiosBaseQuery from "@/axios/axios-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeLists } from "./tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://api.alwan-bd.com/api/v1",
  }),

  endpoints: (builder) => ({}),
  tagTypes: tagTypeLists,
  refetchOnMountOrArgChange: true,
});
