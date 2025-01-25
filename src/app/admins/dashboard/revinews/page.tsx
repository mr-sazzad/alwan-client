// "use client";
// import { addDays, format } from "date-fns";
// import {
//   Calendar as CalendarIcon,
//   Clock,
//   DollarSign,
//   Search,
//   TrendingUp,
// } from "lucide-react";
// import React, { useState } from "react";
// import { DateRange } from "react-day-picker";
// import RevenueChart from "../../../../components/admins/dashboard/revenue/revenue-chart";
// import { Button } from "../../../../components/ui/button";
// import { Calendar } from "../../../../components/ui/calendar";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../../../components/ui/card";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../../../components/ui/popover";
// import { Skeleton } from "../../../../components/ui/skeleton";
// import { cn } from "../../../../lib/utils";
// import {
//   useGetIncomesBetweenDatesQuery,
//   useGetLastMonthIncomesQuery,
//   useGetLifetimeIncomesQuery,
//   useGetPreviousWeekIncomesQuery,
//   useGetTodayIncomesQuery,
//   useGetYesterdayIncomesQuery,
// } from "../../../../redux/api/income/incomeApi";

// const DateRangePicker = ({
//   className,
//   onDateRangeChange,
// }: React.HTMLAttributes<HTMLDivElement> & {
//   onDateRangeChange: (dateRange: DateRange | undefined) => void;
// }) => {
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: new Date(),
//     to: addDays(new Date(), 7),
//   });

//   const handleDateChange = (newDate: DateRange | undefined) => {
//     setDate(newDate);
//     onDateRangeChange(newDate);
//   };

//   return (
//     <div className={cn("grid gap-2", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={"outline"}
//             className={cn(
//               "w-[300px] justify-start text-left font-normal",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, "LLL dd, y")} -{" "}
//                   {format(date.to, "LLL dd, y")}
//                 </>
//               ) : (
//                 format(date.from, "LLL dd, y")
//               )
//             ) : (
//               <span>Pick a date range</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={handleDateChange}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// const RevenueCard = ({
//   title,
//   data,
//   isLoading,
//   icon: Icon,
// }: {
//   title: string;
//   data: any;
//   isLoading: boolean;
//   icon: React.ElementType;
// }) => {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         <Icon className="h-4 w-4 text-muted-foreground" />
//       </CardHeader>
//       <CardContent>
//         {isLoading ? (
//           <Skeleton className="h-8 w-[100px]" />
//         ) : data?.total ? (
//           <div className="text-2xl font-bold">TK. {data.total.toFixed(2)}</div>
//         ) : (
//           <div className="text-sm text-muted-foreground">No data available</div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// <RevenueChart />;

// const RevenueOverview = () => {
//   const [dateRange, setDateRange] = useState<DateRange | undefined>();
//   const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

//   const { data: todayRevinew, isLoading: todayRevinewLoading } =
//     useGetTodayIncomesQuery(undefined);
//   const { data: yesterdayRevinew, isLoading: yesterdayRevinewLoading } =
//     useGetYesterdayIncomesQuery(undefined);
//   const { data: lastWeekRevinew, isLoading: lastWeekRevinewLoading } =
//     useGetPreviousWeekIncomesQuery(undefined);
//   const { data: lastMonthRevinew, isLoading: lastMonthRevinewLoading } =
//     useGetLastMonthIncomesQuery(undefined);
//   const { data: lifeTimeRevinew, isLoading: lifeTimeRevinewLoading } =
//     useGetLifetimeIncomesQuery(undefined);
//   const { data: customRangeRevinew, isLoading: customRangeRevinewLoading } =
//     useGetIncomesBetweenDatesQuery(
//       dateRange?.from && dateRange?.to && searchTrigger
//         ? {
//             startDate: format(dateRange.from, "yyyy-MM-dd"),
//             endDate: format(dateRange.to, "yyyy-MM-dd"),
//           }
//         : undefined,
//       { skip: !dateRange?.from || !dateRange?.to || !searchTrigger }
//     );

//   const handleSearch = () => {
//     if (dateRange?.from && dateRange?.to) {
//       setSearchTrigger(true);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h1 className="text-3xl font-bold tracking-tight">Revenue Overview</h1>
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//           <DateRangePicker
//             onDateRangeChange={(range) => {
//               setDateRange(range);
//               setSearchTrigger(false);
//             }}
//           />
//           <Button
//             onClick={handleSearch}
//             disabled={!dateRange?.from || !dateRange?.to}
//           >
//             <Search className="h-4 w-4 mr-2" />
//             Search
//           </Button>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <RevenueCard
//           title="Today's Revenue"
//           data={todayRevinew?.data}
//           isLoading={todayRevinewLoading}
//           icon={DollarSign}
//         />
//         <RevenueCard
//           title="Yesterday's Revenue"
//           data={yesterdayRevinew?.data}
//           isLoading={yesterdayRevinewLoading}
//           icon={DollarSign}
//         />
//         <RevenueCard
//           title="Last Week's Revenue"
//           data={lastWeekRevinew?.data}
//           isLoading={lastWeekRevinewLoading}
//           icon={TrendingUp}
//         />
//         <RevenueCard
//           title="Last Month's Revenue"
//           data={lastMonthRevinew?.data}
//           isLoading={lastMonthRevinewLoading}
//           icon={TrendingUp}
//         />
//         <RevenueCard
//           title="Lifetime Revenue"
//           data={lifeTimeRevinew?.data}
//           isLoading={lifeTimeRevinewLoading}
//           icon={Clock}
//         />
//         <RevenueCard
//           title="Custom Range Revenue"
//           data={customRangeRevinew?.data}
//           isLoading={customRangeRevinewLoading}
//           icon={CalendarIcon}
//         />
//       </div>

//       <RevenueChart />
//     </div>
//   );
// };

// export default RevenueOverview;

import React from "react";
const Page = () => {
  return <div>Hello From Page</div>;
};

export default Page;
