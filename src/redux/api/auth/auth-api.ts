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

    signInWithGoogle: build.query({
      query: () => ({
        url: `/auth/google`,
        method: "GET",
      }),
      providesTags: [tagTypes.auth],
    }),

    forgetPassword: build.mutation({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    ResetPassword: build.mutation({
      query: (token) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useSignInWithGoogleQuery,
  useForgetPasswordMutation,
} = authApi;
