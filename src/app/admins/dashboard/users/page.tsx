"use client";

import { DataTable } from "@/components/admins/dashboard/products/data-table";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AdminUsersSkeleton from "@/components/skeletons/admins-users-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllUsersQuery } from "@/redux/api/users/user-api";
import { IUser } from "@/types";
import { CalendarIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import UserColumns from "./user-columns";

function StatusCard({
  title,
  value,
  icon: Icon,
  status,
  stat,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  status: string;
  stat: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center space-x-2">
          <h3 className="text-sm font-medium">{title}</h3>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{status}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-muted-foreground">{stat}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const UsersPage = () => {
  const { data: userRes, isLoading } = useGetAllUsersQuery(undefined);

  const totalUsers = userRes?.data.length;
  const todayUsers = userRes?.data.filter(
    (user: IUser) =>
      new Date(user.createdAt).toDateString() === new Date().toDateString()
  ).length;
  const lastWeekUsers = userRes?.data.filter(
    (user: IUser) =>
      new Date(user.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  const lastMonthUsers = userRes?.data.filter(
    (user: IUser) =>
      new Date(user.createdAt) >=
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;

  const columns = UserColumns();

  if (isLoading) {
    return <AdminUsersSkeleton />;
  }

  console.log(userRes);

  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Users"
        className="my-3"
      />
      <h1 className="text-3xl font-medium mb-6">User Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Today's Users"
          value={todayUsers}
          icon={UserPlusIcon}
          status="New users today"
          stat={`${((todayUsers / totalUsers) * 100).toFixed(1)}% of total`}
        />
        <StatusCard
          title="Last Week's Users"
          value={lastWeekUsers}
          icon={CalendarIcon}
          status="New users in the last 7 days"
          stat={`${((lastWeekUsers / totalUsers) * 100).toFixed(1)}% of total`}
        />
        <StatusCard
          title="Last Month's Users"
          value={lastMonthUsers}
          icon={CalendarIcon}
          status="New users in the last 30 days"
          stat={`${((lastMonthUsers / totalUsers) * 100).toFixed(1)}% of total`}
        />
        <StatusCard
          title="Total Users"
          value={totalUsers}
          icon={UsersIcon}
          status="All time users"
          stat="100% of total"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-medium mb-4">All Users</h2>
        <DataTable
          columns={columns}
          data={userRes?.data}
          filterColumn="email"
        />
      </div>
    </div>
  );
};

export default UsersPage;
