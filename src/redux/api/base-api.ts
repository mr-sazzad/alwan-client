import axiosBaseQuery from "@/axios/axios-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeLists } from "./tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    // baseUrl: "http://localhost:4000/api/v1",
    baseUrl: "https://alwan-api-server.vercel.app/api/v1",
  }),

  endpoints: (builder) => ({}),
  tagTypes: tagTypeLists,
});
