// "use client";
// import { AnimatePresence } from "framer-motion";
// import { Activity } from "lucide-react";
// import React from "react";
// import OrderCard from "../../../../components/order/order-card";
// import { getUserFromLocalStorage } from "../../../../helpers/jwt";
// import { useGetSingleUserOrdersQuery } from "../../../../redux/api/orders/ordersApi";
// import { IOrder, IUser } from "../../../../types";
// import NoOrdersFound from "../components/no-orders-fount";
// import OrdersLoader from "../components/orders-loader";

// const RequestToReturnPage = () => {
//   const user = getUserFromLocalStorage() as IUser;
//   const { data: orderRes, isLoading } = useGetSingleUserOrdersQuery(
//     user?.userId
//   );

//   if (isLoading) {
//     return <OrdersLoader />;
//   }

//   const requestToReturnOrders = orderRes?.data?.filter((order: IOrder) =>
//     order.items.some((item) => item.itemStatus === "RETURN_REQUESTED")
//   );

//   if (!requestToReturnOrders || requestToReturnOrders.length === 0) {
//     return (
//       <NoOrdersFound
//         title="No Request To Return Orders"
//         description="You haven't requested to return any orders yet. Check your order history for more details."
//         icon={<Activity />}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <AnimatePresence>
//         {requestToReturnOrders.map((order: IOrder) => (
//           <OrderCard key={order.id} order={order} />
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default RequestToReturnPage;

import React from "react";
export const Page = () => {
  return <div>Hello From Delivered Page</div>;
};
