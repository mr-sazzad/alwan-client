import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUpUser: build.mutation({
      query: (data) => ({
        url: `/auth/sign-up`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    signInUser: build.mutation({
      query: (data) => ({
        url: `/auth/sign-in`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    loginWithGoogle: build.mutation({
      query: () => ({
        url: `/auth/google`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useLoginWithGoogleMutation,
} = authApi;
