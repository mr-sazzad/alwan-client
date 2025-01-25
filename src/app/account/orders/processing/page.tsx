// "use client";
// import { AnimatePresence } from "framer-motion";
// import { ShieldEllipsis } from "lucide-react";
// import React from "react";
// import OrderCard from "../../../../components/order/order-card";
// import { getUserFromLocalStorage } from "../../../../helpers/jwt";
// import { useGetSingleUserOrdersQuery } from "../../../../redux/api/orders/ordersApi";
// import { IOrder, IUser } from "../../../../types";
// import NoOrdersFound from "../components/no-orders-fount";
// import OrdersLoader from "../components/orders-loader";

// const ProcessingOrdersPage = () => {
//   const user = getUserFromLocalStorage() as IUser;
//   const { data: orderRes, isLoading } = useGetSingleUserOrdersQuery(
//     user?.userId
//   );

//   if (isLoading) {
//     return <OrdersLoader />;
//   }

//   const processingOrders = orderRes?.data?.filter((order: IOrder) =>
//     order.items.some((item) => item.itemStatus === "PROCESSING")
//   );

//   if (!processingOrders || processingOrders.length === 0) {
//     return (
//       <NoOrdersFound
//         title="No Processing Orders"
//         description="You haven't processing any orders yet. Check your order history for more details."
//         icon={<ShieldEllipsis />}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <AnimatePresence>
//         {processingOrders.map((order: IOrder) => (
//           <OrderCard key={order.id} order={order} />
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProcessingOrdersPage;

import React from "react";
const Page = () => {
  return <div>Hello From Page</div>;
};

export default Page;
