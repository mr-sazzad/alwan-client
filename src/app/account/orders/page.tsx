"use client";

import ProfileOrderTabs from "@/components/profile/order-tabs";
import ProfileRejectedOrders from "@/components/profile/profile-rejected-orders";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetSingleUserOrdersQuery } from "@/redux/api/orders/ordersApi";
import { IUserData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Order = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserData>();

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as any;
    if (!currentUserData) {
      router.push("/");
    } else {
      setUserData(currentUserData);
    }
  }, [router]);

  const { data: orders, isLoading: isOrderLoading } =
    useGetSingleUserOrdersQuery(userData?.userId);

  if (isOrderLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-sm font-medium text-muted-foreground">
            If you placed an order, you can track its status here. Stay updated
            on your delivery every step of the way.
          </p>
        </div>
        <ProfileOrderTabs orders={orders} />
        <ProfileRejectedOrders />
      </div>
    </>
  );
};

export default Order;
