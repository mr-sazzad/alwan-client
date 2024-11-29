import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const incomesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodayIncomes: build.query({
      query: () => ({
        url: "/incomes/today",
        method: "GET",
      }),
      providesTags: [tagTypes.income],
    }),

    getYesterdayIncomes: build.query({
      query: () => ({
        url: "/incomes/yesterday",
        method: "GET",
      }),
      providesTags: [tagTypes.income],
    }),

    getPreviousWeekIncomes: build.query({
      query: () => ({
        url: "/incomes/previous-week",
        method: "GET",
      }),
      providesTags: [tagTypes.income],
    }),

    getLastMonthIncomes: build.query({
      query: () => ({
        url: "/incomes/last-month",
        method: "GET",
      }),
      providesTags: [tagTypes.income],
    }),

    getLifetimeIncomes: build.query({
      query: () => ({
        url: "/incomes/lifetime",
        method: "GET",
      }),
      providesTags: [tagTypes.income],
    }),

    getIncomesBetweenDates: build.query({
      query: ({ startDate, endDate }) => {
        return {
          url: `/incomes/between-dates?startDate=${startDate}&endDate=${endDate}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.income],
    }),
  }),
});

export const {
  useGetTodayIncomesQuery,
  useGetYesterdayIncomesQuery,
  useGetPreviousWeekIncomesQuery,
  useGetLastMonthIncomesQuery,
  useGetLifetimeIncomesQuery,
  useGetIncomesBetweenDatesQuery,
} = incomesApi;
