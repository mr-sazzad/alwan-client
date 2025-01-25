// "use client";
// import { AnimatePresence } from "framer-motion";
// import { Truck } from "lucide-react";
// import React from "react";
// import OrderCard from "../../../../components/order/order-card";
// import { getUserFromLocalStorage } from "../../../../helpers/jwt";
// import { useGetSingleUserOrdersQuery } from "../../../../redux/api/orders/ordersApi";
// import { IOrder, IUser } from "../../../../types";
// import NoOrdersFound from "../components/no-orders-fount";
// import OrdersLoader from "../components/orders-loader";

// const InTransitOrdersPage = () => {
//   const user = getUserFromLocalStorage() as IUser;
//   const { data: orderRes, isLoading } = useGetSingleUserOrdersQuery(
//     user?.userId
//   );

//   if (isLoading) {
//     return <OrdersLoader />;
//   }

//   const inTransitOrders = orderRes?.data?.filter((order: IOrder) =>
//     order.items.some((item) => item.itemStatus === "SHIPPED_TO_COURIER")
//   );

//   if (!inTransitOrders || inTransitOrders.length === 0) {
//     return (
//       <NoOrdersFound
//         title="No In Transit Orders"
//         description="You haven't in transit any orders yet. Check your order history for more details."
//         icon={<Truck />}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <AnimatePresence>
//         {inTransitOrders.map((order: IOrder) => (
//           <OrderCard key={order.id} order={order} />
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default InTransitOrdersPage;

import React from "react";
const Page = () => {
  return <div>Hello From Page</div>;
};

export default Page;
