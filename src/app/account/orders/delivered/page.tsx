"use client";

import OrderCard from "@/components/order/order-card";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetSingleUserOrdersQuery } from "@/redux/api/orders/ordersApi";
import { IOrder, IUser } from "@/types";
import { AnimatePresence } from "framer-motion";
import { AudioLines } from "lucide-react";
import NoOrdersFound from "../components/no-orders-fount";
import OrdersLoader from "../components/orders-loader";

const DeliveredOrdersPage = () => {
  const user = getUserFromLocalStorage() as IUser;
  const { data: orderRes, isLoading } = useGetSingleUserOrdersQuery(
    user?.userId
  );

  if (isLoading) {
    return <OrdersLoader />;
  }

  const deliveredOrders = orderRes?.data?.filter((order: IOrder) =>
    order.items.some((item) => item.itemStatus === "DELIVERED")
  );

  if (!deliveredOrders || deliveredOrders.length === 0) {
    return (
      <NoOrdersFound
        title="No Delivered Orders"
        description="You haven't delivered any orders yet. Check your order history for more details."
        icon={<AudioLines />}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {deliveredOrders.map((order: IOrder) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DeliveredOrdersPage;
