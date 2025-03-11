"use client";
import {
  AlertCircle,
  ArrowLeftRight,
  CheckCircle,
  Clock,
  Package,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import React from "react";
import { DataTable } from "../../../../components/admins/dashboard/products/data-table";
import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
import AdminOrdersSkeleton from "../../../../components/skeletons/admin-orders-skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { useGetAllOrdersQuery } from "../../../../redux/api/orders/ordersApi";
import { IOrder } from "../../../../types";
import OrderTableColumns from "./orders-column";

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

export default function OrderPage() {
  const { data: orderRes, isLoading } = useGetAllOrdersQuery(undefined);
  const columns = OrderTableColumns();

  if (isLoading) {
    return <AdminOrdersSkeleton />;
  }

  const filterOrders = (status: string) => {
    if (!orderRes?.data) return [];

    if (status === "all") return orderRes.data;

    if (status === "CANCELLED" || status === "CONFIRM") {
      return orderRes.data.filter(
        (order: IOrder) => order.orderStatus === status
      );
    }

    return orderRes.data.filter((order: IOrder) =>
      order.items.some((item) => {
        switch (status) {
          case "processing":
            return item.itemStatus === "PROCESSING";
          case "shipped-to-courier":
            return item.itemStatus === "SHIPPED_TO_COURIER";
          case "delivered":
            return item.itemStatus === "DELIVERED";
          case "return-requested":
            return item.itemStatus === "RETURN_REQUESTED";
          case "returned":
            return item.itemStatus === "RETURNED";
          default:
            return false;
        }
      })
    );
  };

  const getStatusCounts = () => {
    if (!orderRes?.data)
      return {
        total: 0,
        shipperToCourier: 0,
        cancelled: 0,
        delivered: 0,
        returnRequested: 0,
        returned: 0,
        processing: 0,
        confirmed: 0,
      };

    const total = orderRes.data.length;
    const shippedToCourier = filterOrders("shipped-to-courier").length;
    const delivered = filterOrders("delivered").length;
    const returnRequested = filterOrders("return-requested").length;
    const returned = filterOrders("returned").length;
    const processing = filterOrders("processing").length;

    const cancelled = filterOrders("CANCELLED").length;
    const confirmed = filterOrders("CONFIRM").length;

    return {
      total,
      shippedToCourier,
      cancelled,
      delivered,
      returnRequested,
      returned,
      processing,
      confirmed,
    };
  };

  const statusCounts = getStatusCounts();

  const statusCards = [
    {
      title: "Total Orders",
      icon: Package,
      value: statusCounts.total,
      status: "All Orders",
      stat: "Lifetime Orders",
    },
    {
      title: "Processing",
      icon: Clock,
      value: statusCounts.processing,
      status: "In Progress",
      stat: `${((statusCounts.processing / statusCounts.total) * 100).toFixed(
        1
      )}%`,
    },
    {
      title: "Confirmed",
      icon: AlertCircle,
      value: statusCounts.confirmed,
      status: "Awaiting Shipment",
      stat: `${((statusCounts.confirmed / statusCounts.total) * 100).toFixed(
        1
      )}%`,
    },
    {
      title: "Shipped To Courier",
      icon: Truck,
      value: statusCounts.shippedToCourier,
      status: "On the way",
      stat: `${(
        (statusCounts.shippedToCourier / statusCounts.total) *
        100
      ).toFixed(1)}%`,
    },
    {
      title: "Delivered",
      icon: CheckCircle,
      value: statusCounts.delivered,
      status: "Delivered",
      stat: `${((statusCounts.delivered / statusCounts.total) * 100).toFixed(
        1
      )}%`,
    },
    {
      title: "Cancelled",
      icon: XCircle,
      value: statusCounts.cancelled,
      status: "Inactive",
      stat: `${((statusCounts.cancelled / statusCounts.total) * 100).toFixed(
        1
      )}%`,
    },
    {
      title: "Request Return",
      icon: RotateCcw,
      value: statusCounts.returnRequested,
      status: "Pending",
      stat: `${(
        (statusCounts.returnRequested / statusCounts.total) *
        100
      ).toFixed(1)}%`,
    },
    {
      title: "Returned",
      icon: ArrowLeftRight,
      value: statusCounts.returned,
      status: "Completed",
      stat: `${((statusCounts.returned / statusCounts.total) * 100).toFixed(
        1
      )}%`,
    },
  ];

  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Orders"
        className="my-3"
      />
      <h1 className="text-3xl font-medium mb-6">Order Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statusCards.map((card, index) => (
          <StatusCard key={index} {...card} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-medium">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-gray-100 dark:bg-gray-700">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
                <TabsTrigger value="shipped-to-courier">
                  Shipped To Courier
                </TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="return-requested">
                  Return Requested
                </TabsTrigger>
                <TabsTrigger value="returned">Returned</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="space-y-4">
              <DataTable columns={columns} data={filterOrders("all")} />
            </TabsContent>
            <TabsContent value="processing" className="space-y-4">
              <DataTable columns={columns} data={filterOrders("processing")} />
            </TabsContent>
            <TabsContent value="CANCELLED" className="space-y-4">
              <DataTable columns={columns} data={filterOrders("CANCELLED")} />
            </TabsContent>
            <TabsContent value="shipped-to-courier" className="space-y-4">
              <DataTable
                columns={columns}
                data={filterOrders("shipped-to-courier")}
              />
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              <DataTable columns={columns} data={filterOrders("completed")} />
            </TabsContent>
            <TabsContent value="return-requested" className="space-y-4">
              <DataTable
                columns={columns}
                data={filterOrders("return-requested")}
              />
            </TabsContent>
            <TabsContent value="returned" className="space-y-4">
              <DataTable columns={columns} data={filterOrders("returned")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
