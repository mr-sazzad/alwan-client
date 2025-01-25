// "use client";
// import { AnimatePresence } from "framer-motion";
// import { Box } from "lucide-react";
// import React from "react";
// import OrderCard from "../../../../components/order/order-card";
// import { getUserFromLocalStorage } from "../../../../helpers/jwt";
// import { useGetSingleUserOrdersQuery } from "../../../../redux/api/orders/ordersApi";
// import { IOrder, IUser } from "../../../../types";
// import NoOrdersFound from "../components/no-orders-fount";
// import OrdersLoader from "../components/orders-loader";

// const ReturnedOrdersPage = () => {
//   const user = getUserFromLocalStorage() as IUser;
//   const { data: orderRes, isLoading } = useGetSingleUserOrdersQuery(
//     user?.userId
//   );

//   if (isLoading) {
//     return <OrdersLoader />;
//   }

//   const returnedOrders = orderRes?.data?.filter((order: IOrder) =>
//     order.items.some((item) => item.itemStatus === "RETURNED")
//   );

//   if (!returnedOrders || returnedOrders.length === 0) {
//     return (
//       <NoOrdersFound
//         title="No Returned Orders"
//         description="You haven't returned any orders yet. Check your order history for more details."
//         icon={<Box />}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <AnimatePresence>
//         {returnedOrders.map((order: IOrder) => (
//           <OrderCard key={order.id} order={order} />
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ReturnedOrdersPage;

import React from "react";
export const Page = () => {
  return <div>Hello From Delivered Page</div>;
};
