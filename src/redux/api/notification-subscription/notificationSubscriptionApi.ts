import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const NotificationSubscriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addToSubscription: build.mutation({
      query: (data) => ({
        url: "/notification-subs/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const { useAddToSubscriptionMutation } = NotificationSubscriptionApi;
