import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeLists } from "./tag-types";
import axiosBaseQuery from "@/axios/axios-base-query";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://alwan-clothing-server.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({}),
  //  result cashing
  tagTypes: tagTypeLists,
});
