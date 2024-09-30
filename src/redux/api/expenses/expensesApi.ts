import { baseApi } from "../base-api";
import { tagTypes } from "../tag-types";

const expensesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createExpense: build.mutation({
      query: (data) => ({
        url: "/expenses/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.expense],
    }),

    getSingleExpense: build.query({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.expense],
    }),

    getAllExpenses: build.query({
      query: () => ({
        url: "/expenses",
        method: "GET",
      }),
      providesTags: [tagTypes.expense],
    }),

    getWeeklyExpenses: build.query({
      query: () => ({
        url: "/expenses/weekly",
        method: "GET",
      }),
      providesTags: [tagTypes.expense],
    }),

    getMonthlyExpenses: build.query({
      query: () => ({
        url: "/expenses/monthly",
        method: "GET",
      }),
      providesTags: [tagTypes.expense],
    }),

    updateExpense: build.mutation({
      query: ({ id, data }) => ({
        url: `/expenses/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.expense],
    }),

    deleteExpense: build.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.expense],
    }),

    // getExpensesBetweenDates: build.query({
    //   query: ({ startDate, endDate }) => ({
    //     url: `/expenses/between-dates?startDate=${startDate}&endDate=${endDate}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.expense],
    // }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useGetWeeklyExpensesQuery,
  useGetMonthlyExpensesQuery,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  //   useGetExpensesBetweenDatesQuery,
} = expensesApi;
