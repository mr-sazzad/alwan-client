"use client";

import { AnimatePresence } from "framer-motion";
import React from "react";
import OrderCard from "../../../components/order/order-card";
import { getUserFromLocalStorage } from "../../../helpers/jwt";
import { useGetSingleUserOrdersQuery } from "../../../redux/api/orders/ordersApi";
import { IOrder, IUser } from "../../../types";
import OrdersLoader from "./components/orders-loader";

export default function OrderHistoryPage() {
  const user = getUserFromLocalStorage() as IUser;
  const { data: orderRes, isLoading } = useGetSingleUserOrdersQuery(
    user?.userId
  );

  if (isLoading) {
    return <OrdersLoader />;
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {orderRes?.data?.map((order: IOrder) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </AnimatePresence>
    </div>
  );
}
