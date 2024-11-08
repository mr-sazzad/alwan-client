"use client";

import OrderCard from "@/components/order/order-card";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetSingleUserOrdersQuery } from "@/redux/api/orders/ordersApi";
import { IOrder, IUser } from "@/types";
import { AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import NoOrdersFound from "../components/no-orders-fount";
import OrdersLoader from "../components/orders-loader";

const CancelledOrdersPage = () => {
  const user = getUserFromLocalStorage() as IUser;
  const { data: orderRes, isLoading } = useGetSingleUserOrdersQuery(
    user?.userId
  );

  if (isLoading) {
    return <OrdersLoader />;
  }

  const cancelledOrders = orderRes?.data?.filter(
    (order: IOrder) => order.orderStatus === "CANCELLED"
  );

  if (!cancelledOrders || cancelledOrders.length === 0) {
    return (
      <NoOrdersFound
        title="No Cancelled Orders"
        description="You haven't cancelled any orders yet. Check your order history for more details."
        icon={<Activity />}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {cancelledOrders.map((order: IOrder) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CancelledOrdersPage;
