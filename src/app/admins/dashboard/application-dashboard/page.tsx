"use client";

import Loading from "@/app/loading";
import AdminCardComponent from "@/components/admins/dashboard/dashboard-status-card";
import { useGetAllUsersQuery } from "@/redux/api/users/user-api";
import { LuUsers } from "react-icons/lu";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";

const Page = () => {
  const { data: users, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center md:justify-start p-4">
      {/* Total Users */}
      <AdminCardComponent
        title="Total Users"
        Icon={LuUsers}
        content="Since our business started"
        stats={users.length - 1}
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
        stats={3000}
      />
    </div>
  );
};

export default Page;
