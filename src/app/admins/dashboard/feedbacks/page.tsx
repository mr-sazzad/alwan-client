// "use client";
// import { BarChart2, Calendar, MessageSquare, TrendingUp } from "lucide-react";
// import React from "react";
// import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
// import AdminOrdersSkeleton from "../../../../components/skeletons/admin-orders-skeleton";
// import { Card, CardContent } from "../../../../components/ui/card";
// import { useGetFeedbacksQuery } from "../../../../redux/api/feedback/feedbackApi";
// import { IFeedback } from "../../../../types";
// import { FeedbacksColumns } from "./feedbacks-columns";

// function StatusCard({
//   title,
//   value,
//   icon: Icon,
//   status,
//   stat,
// }: {
//   title: string;
//   value: number;
//   icon: React.ElementType;
//   status: string;
//   stat: string;
// }) {
//   return (
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex justify-between items-center space-x-2">
//           <h3 className="text-sm font-medium">{title}</h3>
//           <Icon className="h-4 w-4 text-muted-foreground" />
//         </div>
//         <div className="mt-2 flex items-center justify-between">
//           <div>
//             <p className="text-2xl font-bold">{value}</p>
//             <p className="text-xs text-muted-foreground">{status}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-xs font-medium text-muted-foreground">{stat}</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// const FeedbacksPage = () => {
//   const { data: feedbackRes, isLoading } = useGetFeedbacksQuery(undefined);

//   if (isLoading) {
//     return <AdminOrdersSkeleton />;
//   }

//   const feedbacks = feedbackRes?.data || [];

//   const todayFeedbacks = feedbacks.filter(
//     (feedback: IFeedback) =>
//       new Date(feedback.createdAt).toDateString() === new Date().toDateString()
//   ).length;
//   const lastWeekFeedbacks = feedbacks.filter(
//     (feedback: IFeedback) =>
//       new Date(feedback.createdAt) >
//       new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//   ).length;
//   const lastMonthFeedbacks = feedbacks.filter(
//     (feedback: IFeedback) =>
//       new Date(feedback.createdAt) >
//       new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
//   ).length;

//   return (
//     <div>
//       <AlwanBreadCrumb
//         links={[
//           { label: "Home", href: "/" },
//           { label: "Dashboard", href: "/admins/dashboard" },
//         ]}
//         page="Feedbacks"
//         className="my-3"
//       />
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <StatusCard
//           title="Today's Feedbacks"
//           value={todayFeedbacks}
//           icon={MessageSquare}
//           status="New feedbacks today"
//           stat={`${((todayFeedbacks / feedbacks.length) * 100).toFixed(
//             1
//           )}% of total`}
//         />
//         <StatusCard
//           title="Last Week's Feedbacks"
//           value={lastWeekFeedbacks}
//           icon={TrendingUp}
//           status="Feedbacks in the last 7 days"
//           stat={`${((lastWeekFeedbacks / feedbacks.length) * 100).toFixed(
//             1
//           )}% of total`}
//         />
//         <StatusCard
//           title="Last Month's Feedbacks"
//           value={lastMonthFeedbacks}
//           icon={Calendar}
//           status="Feedbacks in the last 30 days"
//           stat={`${((lastMonthFeedbacks / feedbacks.length) * 100).toFixed(
//             1
//           )}% of total`}
//         />
//         <StatusCard
//           title="Lifetime Feedbacks"
//           value={feedbacks.length}
//           icon={BarChart2}
//           status="Total feedbacks received"
//           stat="100% of total"
//         />
//       </div>
//       <FeedbacksColumns feedbacks={feedbacks} />
//     </div>
//   );
// };

// export default FeedbacksPage;

import React from "react";
const Page = () => {
  return <div>Hello From Page</div>;
};

export default Page;
