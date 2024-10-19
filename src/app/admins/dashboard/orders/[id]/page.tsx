"use client";

import {
  AlertTriangle,
  ArrowDownToLine,
  Clipboard,
  CreditCard,
  DollarSign,
  MapPin,
  Package,
  RefreshCw,
  Truck,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";

import Loading from "@/app/loading";
import InvoiceForm from "@/components/invoice/invoice-form";
import InvoiceGenerator from "@/components/invoice/invoice-generator";
import OrderStatus from "@/components/order/order-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/components/utils/money";
import { shortenId } from "@/components/utils/utils";
import {
  useGetSingleOrderByOrderIdQuery,
  useUpdateOrderByOrderIdMutation,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orders/ordersApi";
import { ProductWithDetails } from "@/types";
import Image from "next/image";

const statusColors = {
  PROCESSING: "bg-blue-100 text-blue-600",
  ONTHEWAY: "bg-yellow-100 text-yellow-600",
  DELIVERED: "bg-green-100 text-green-600",
  REQUESTTORETURN: "bg-orange-100 text-orange-600",
  RETURNED: "bg-red-100 text-red-600",
};

const formSchema = z.object({
  brandPhone: z.string().min(2, {
    message: "Brand phone must be at least 2 characters.",
  }),
  brandEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  invoiceDate: z.date(),
  invoiceNumber: z.string(),
  paymentMethod: z.string(),
  courierPartner: z.string(),
  notes: z.string(),
});

export default function OrderDetails() {
  const { id } = useParams();
  const {
    data: response,
    isLoading: isOrderLoading,
    error,
    refetch,
  } = useGetSingleOrderByOrderIdQuery(id);
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [updateOrderByOrderId, { isLoading: isOrderUpdating }] =
    useUpdateOrderByOrderIdMutation();
  const [localItems, setLocalItems] = useState<ProductWithDetails[]>([]);
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    brandPhone: "+880 1234567890",
    brandEmail: "info@alwan.com",
    invoiceDate: new Date().toISOString().split("T")[0],
    invoiceNumber: "",
    paymentMethod: "",
    courierPartner: "",
    notes:
      "Dear Customer,\nThank you so much for your order.\nReceive the product and make an unboxing video.\nContact our hotline if there is any issue.\nHotline: +880145744358",
  });

  useEffect(() => {
    if (response?.data?.items) {
      setLocalItems(response.data.items);
      setInvoiceData((prev) => ({
        ...prev,
        invoiceNumber: response.data.id,
        paymentMethod: response.data.shippingMethod,
      }));
    }
  }, [response]);

  if (isOrderLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-medium mb-2">Error Loading Order</h1>
        <p className="text-center">
          There was a problem fetching the order details. Please try again
          later.
        </p>
      </div>
    );
  }

  if (!response?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Package className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">No Order Found</h1>
        <p className="text-center">
          We couldn&apos;t find any order details for the given ID.
        </p>
      </div>
    );
  }

  const { data: order } = response;

  const handleOrderStatusChange = async (newStatus: string) => {
    try {
      console.log(order.id, "order id", newStatus, "new status");
      const result = await updateOrderByOrderId({
        orderId: order.id,
        orderStatus: newStatus,
      }).unwrap();

      if (!result.success) {
        toast({
          title: "Update Failed",
          description:
            "There was an error updating the order status. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Status Updated",
          description: `Order status has been updated to ${newStatus}`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description:
          "There was an error updating the order status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleItemStatusChange = async (itemId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ id: itemId, itemStatus: newStatus }).unwrap();
      setLocalItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? {
                ...item,
                itemStatus: newStatus as ProductWithDetails["itemStatus"],
              }
            : item
        )
      );
      toast({
        title: "Status Updated",
        description: `Item status has been updated to ${newStatus}`,
        variant: "default",
      });
      refetch();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Update Failed",
        description:
          "There was an error updating the item status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getOverallOrderStatus = () => {
    if (!localItems || localItems.length === 0) return "UNKNOWN";
    const statuses = localItems.map((item) => item.itemStatus);
    if (statuses.every((status) => status === "DELIVERED")) return "DELIVERED";
    if (statuses.some((status) => status === "RETURNED")) return "RETURNED";
    if (statuses.some((status) => status === "ONTHEWAY")) return "ONTHEWAY";
    if (statuses.some((status) => status === "REQUESTTORETURN"))
      return "REQUESTTORETURN";
    return "PROCESSING";
  };

  const formatAddress = (order: any) => {
    return `${order.division}, ${order.district}, ${order.upazila}, ${order.union}, ${order.streetAddress}`;
  };

  const handleInvoiceSubmit = (data: z.infer<typeof formSchema>) => {
    setInvoiceData({
      ...data,
      invoiceDate: data.invoiceDate.toISOString().split("T")[0],
    });
    setIsInvoiceFormOpen(false);
    setShowInvoice(true);
  };

  const handleInvoiceGenerated = () => {
    setShowInvoice(false);
    toast({
      title: "Invoice Generated",
      description: "The invoice has been generated and downloaded.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-medium">Order Details</h1>
                <p className="mt-1 text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded inline-block">
                  {order.id}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div
                  className={`${
                    statusColors[
                      getOverallOrderStatus() as keyof typeof statusColors
                    ]
                  } px-3 py-2 text-sm font-medium rounded`}
                >
                  {getOverallOrderStatus()}
                </div>
                <OrderStatus
                  status={order.orderStatus}
                  onStatusChange={handleOrderStatusChange}
                  isLoading={isOrderUpdating}
                />
                <Button
                  variant="outline"
                  onClick={() => refetch()}
                  className="flex items-center"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button
                  variant="success"
                  onClick={() => setIsInvoiceFormOpen(true)}
                  className="flex items-center"
                >
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Generate Invoice
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl font-medium">
                      <Package className="mr-2" />
                      Order Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {localItems && localItems.length > 0 ? (
                      localItems.map((item: ProductWithDetails) => (
                        <div
                          key={item.id}
                          className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                        >
                          {item.product.imageUrls &&
                          item.product.imageUrls.length > 0 ? (
                            <div className="relative lg:w-[160px] h-[100px] lg:h-[160px] w-[100px]">
                              <Image
                                src={item.product.imageUrls[0]}
                                alt={item.product.name}
                                fill
                                objectFit="contain"
                              />
                            </div>
                          ) : (
                            <div className="w-full sm:w-[100px] h-[100px] bg-gray-200 rounded-md flex items-center justify-center">
                              <Package className="w-16 h-16 text-gray-400" />
                            </div>
                          )}

                          <div className="flex-grow space-y-2 w-full sm:w-auto">
                            <h3 className="font-medium text-lg">
                              {item.product.name}
                            </h3>
                            <div className="flex flex-wrap gap-3 items-center">
                              <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                                {shortenId(item.id)}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    item.product.id
                                  );
                                  toast({
                                    title: "Product ID Copied",
                                    description:
                                      "The product ID has been copied to your clipboard.",
                                  });
                                }}
                              >
                                <Clipboard className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm flex flex-wrap gap-2 items-center">
                              <span className="text-indigo-600 bg-indigo-100 px-2  py-1 rounded">
                                {item.size?.name || "N/A"}
                              </span>
                              <span
                                className="inline-block w-6 h-6 rounded mr-1 align-middle"
                                style={{ backgroundColor: item.color?.hexCode }}
                              ></span>
                              <span className="text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                                {item.quantity} Pcs
                              </span>
                            </p>
                            <p className="font-medium text-lg">
                              {formatCurrency(
                                item.discountedPrice * item.quantity
                              )}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-3 items-start sm:items-end w-full sm:w-auto mt-4 sm:mt-0">
                            <div
                              className={`${
                                statusColors[item.itemStatus]
                              } px-2 py-2 text-xs font-medium rounded w-full sm:w-auto text-center`}
                            >
                              {item.itemStatus}
                            </div>
                            <Select
                              onValueChange={(value) =>
                                handleItemStatusChange(item.id, value)
                              }
                              defaultValue={item.itemStatus}
                            >
                              <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Update Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PROCESSING">
                                  Processing
                                </SelectItem>
                                <SelectItem value="ONTHEWAY">
                                  On the Way
                                </SelectItem>
                                <SelectItem value="DELIVERED">
                                  Delivered
                                </SelectItem>
                                <SelectItem value="REQUESTTORETURN">
                                  Request to Return
                                </SelectItem>
                                <SelectItem value="RETURNED">
                                  Returned
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No items found in this order.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-teal-400">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-medium">
                      <User className="mr-2" />
                      Buyer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">{order.userName || "No Name"}</p>
                    <p className="font-medium">{order.email || "N/A"}</p>
                    <p className="font-medium">{order.phone || "N/A"}</p>
                    {order.altPhone && (
                      <p className="font-medium">{order.altPhone}</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-purple-400">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-medium">
                      <Truck className="mr-2" />
                      Delivery Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start">
                      <MapPin className="mr-2 mt-1 flex-shrink-0" />
                      <p>{formatAddress(order)}</p>
                    </div>
                    {order.orderNote && (
                      <p>
                        <span className="font-semibold">Note:</span>{" "}
                        {order.orderNote}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-violet-400">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-medium">
                      <DollarSign className="mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">
                      {order.shippingMethod || "N/A"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-indigo-400">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-medium">
                      <CreditCard className="mr-2" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="">
                      <span className="font-medium">Subtotal:</span>{" "}
                      {formatCurrency(order.totalCost || 0)}
                    </p>
                    <p className="">
                      <span className="font-medium">Shipping:</span>{" "}
                      {formatCurrency(order.shippingCost || 0)}
                    </p>
                    <Separator className="my-2" />
                    <p className="text-lg font-medium">
                      Total:{" "}
                      {formatCurrency(
                        (order.totalCost || 0) + (order.shippingCost || 0)
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(order.id);
                    toast({
                      title: "Order ID Copied",
                      description:
                        "The order ID has been copied to your clipboard.",
                      variant: "default",
                    });
                  }}
                >
                  <Clipboard className="mr-2 h-4 w-4" />
                  Copy Order ID
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isInvoiceFormOpen && (
        <InvoiceForm
          initialData={{
            ...invoiceData,
            invoiceDate: new Date(invoiceData.invoiceDate),
          }}
          onSubmit={handleInvoiceSubmit}
          onClose={() => setIsInvoiceFormOpen(false)}
        />
      )}

      {showInvoice && (
        <InvoiceGenerator
          invoiceData={{
            ...invoiceData,
            invoiceDate: new Date(invoiceData.invoiceDate),
          }}
          order={{
            id: order.id,
            userName: order.userName,
            division: order.division,
            district: order.district,
            upazila: order.upazila,
            union: order.union,
            streetAddress: order.streetAddress,
            totalCost: order.totalCost,
            shippingCost: order.shippingCost,
          }}
          items={localItems.map((item) => ({
            product: { name: item.product.name },
            quantity: item.quantity,
            discountedPrice: item.discountedPrice,
            size: item.size,
          }))}
          onGenerate={handleInvoiceGenerated}
        />
      )}
    </div>
  );
}
