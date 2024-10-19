"use client";

import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AdminDashboardSkeleton from "@/components/skeletons/admin-dashboard-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllOrdersQuery } from "@/redux/api/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/api/users/user-api";
import {
  AlertCircle,
  DollarSign,
  History,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface AdminCardComponentProps {
  title: string;
  Icon: React.ElementType;
  content: string;
  stats: string | number;
}

const AdminCardComponent = ({
  title,
  Icon,
  content,
  stats,
}: AdminCardComponentProps) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{stats}</div>
      <p className="text-xs text-muted-foreground">{content}</p>
    </CardContent>
  </Card>
);

interface Order {
  orderStatus: string;
  totalAmount: number;
  createdAt: string;
}

interface User {}

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState<"7" | "30" | "90">("90");
  const {
    data: userRes,
    isLoading: isUserLoading,
    error: userError,
  } = useGetAllUsersQuery(undefined);
  const {
    data: orderRes,
    isLoading: isOrderLoading,
    error: orderError,
  } = useGetAllOrdersQuery(undefined);

  if (isUserLoading || isOrderLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (userError || orderError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error loading the dashboard data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const userCount = (userRes?.data as User[] | undefined)?.length || 0;
  const orders = orderRes?.data as Order[] | undefined;
  const totalSales =
    orders?.reduce((acc, order) => acc + (order.totalAmount || 0), 0) || 0;
  const canceledOrdersCount =
    orders?.filter((order) => order.orderStatus === "CANCELLED")?.length || 0;
  const todaySales =
    orders
      ?.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const today = new Date();
        return orderDate.toDateString() === today.toDateString();
      })
      ?.reduce((acc, order) => acc + (order.totalAmount || 0), 0) || 0;
  const yesterdaySales =
    orders
      ?.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return orderDate.toDateString() === yesterday.toDateString();
      })
      ?.reduce((acc, order) => acc + (order.totalAmount || 0), 0) || 0;

  const totalOrders = orders?.length || 0;
  const pendingOrders =
    orders?.filter((order) => order.orderStatus === "PENDING")?.length || 0;

  // Prepare data for charts
  const getDaysArray = (days: number) => {
    return [...Array(days)]
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      })
      .reverse();
  };

  const daysArray = getDaysArray(Number(dateRange));

  const incomeData = daysArray.map((date) => ({
    date,
    income:
      orders
        ?.filter((order) => order.createdAt.split("T")[0] === date)
        ?.reduce((acc, order) => acc + (order.totalAmount || 0), 0) || 0,
  }));

  const orderData = daysArray.map((date) => ({
    date,
    orders:
      orders?.filter((order) => order.createdAt.split("T")[0] === date)
        ?.length || 0,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Dashboard"
        className="my-3"
      />

      <h1 className="text-3xl font-medium mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        <AdminCardComponent
          title="Total Users"
          Icon={Users}
          content="Registered users"
          stats={userCount}
        />
        <AdminCardComponent
          title="Total Sales"
          Icon={DollarSign}
          content="Lifetime sales"
          stats={`$${totalSales.toFixed(2)}`}
        />
        <AdminCardComponent
          title="Total Orders"
          Icon={Package}
          content="All-time orders"
          stats={totalOrders}
        />
        <AdminCardComponent
          title="Pending Orders"
          Icon={ShoppingCart}
          content="Orders awaiting processing"
          stats={pendingOrders}
        />
        <AdminCardComponent
          title="Cancelled Orders"
          Icon={AlertCircle}
          content="Total cancelled orders"
          stats={canceledOrdersCount}
        />
        <AdminCardComponent
          title="Today's Sales"
          Icon={TrendingUp}
          content="Sales for today"
          stats={`$${todaySales.toFixed(2)}`}
        />
        <AdminCardComponent
          title="Yesterday's Sales"
          Icon={History}
          content="Sales from yesterday"
          stats={`$${yesterdaySales.toFixed(2)}`}
        />
      </div>

      <div className="mb-4">
        <Select
          value={dateRange}
          onValueChange={(value: "7" | "30" | "90") => setDateRange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-lg">
              Income Over Last {dateRange} Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                income: {
                  label: "Income",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeData}>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-income)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-lg">
              Orders Over Last {dateRange} Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                orders: {
                  label: "Orders",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderData}>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="var(--color-orders)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
