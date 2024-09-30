"use client";

import Loading from "@/app/loading";
import AdminCardComponent from "@/components/admins/dashboard/dashboard-status-card";
import { useGetAllOrdersQuery } from "@/redux/api/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/api/users/user-api";
import { LuUsers } from "react-icons/lu";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";

const Page = () => {
  const { data: userRes, isLoading } = useGetAllUsersQuery(undefined);
  const { data: orderRes, isLoading: isOrderLoading } =
    useGetAllOrdersQuery(undefined);

  if (isLoading || isOrderLoading) {
    return <Loading />;
  }

  const canceledOrdersCount = orderRes.data.filter(
    (order: any) => order.orderStatus === "CANCELLED"
  ).length;

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center md:justify-start p-4">
      {/* Total Users */}
      <AdminCardComponent
        title="Total Users"
        Icon={LuUsers}
        content="Since our business started"
        stats={userRes.data.length}
      />

      {/* Total Sales */}
      <AdminCardComponent
        title="Total Sales"
        Icon={TbMoneybag}
        content="Without delivery cost"
        stats={3000}
      />

      {/* Canceled Orders */}
      <AdminCardComponent
        title="Cancelled Orders"
        Icon={MdOutlineDoNotDisturbAlt}
        content="Most shocking news"
        stats={canceledOrdersCount}
      />

      <AdminCardComponent
        title="Today's Sales"
        Icon={MdOutlineDoNotDisturbAlt}
        content="Most shocking news"
        stats={canceledOrdersCount}
      />
      <AdminCardComponent
        title="Yesterday Sales"
        Icon={MdOutlineDoNotDisturbAlt}
        content="Most shocking news"
        stats={canceledOrdersCount}
      />
    </div>
  );
};

export default Page;
