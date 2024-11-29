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
import ImageSlider from "@/components/cards/image-slider";
import InvoiceForm from "@/components/invoice/invoice-form";
import InvoiceGenerator from "@/components/invoice/invoice-generator";
import CourierInfoDialog from "@/components/order/courier-info-dialog";
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
import { useCreateCourierInfoMutation } from "@/redux/api/courier/courier-api";
import {
  useGetSingleOrderByOrderIdQuery,
  useUpdateOrderByOrderIdMutation,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orders/ordersApi";
import { useGetReturnsQuery } from "@/redux/api/return/return-api";
import { courierInfoSchema } from "@/schemas/admins/courier-info-schema";
import { formSchema } from "@/schemas/invoice-form-schema";
import { IOrderItem } from "@/types";

const statusColors = {
  PROCESSING: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  SHIPPED_TO_COURIER:
    "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
  DELIVERED:
    "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  RETURN_REQUESTED:
    "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
  RETURNED: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
};

export default function OrderDetails() {
  const { id } = useParams();
  const {
    data: response,
    isLoading: isOrderLoading,
    error,
    refetch,
  } = useGetSingleOrderByOrderIdQuery(id);
  const { data: returnRes, isLoading: isReturnProductLoading } =
    useGetReturnsQuery(id);
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [updateOrderByOrderId, { isLoading: isOrderUpdating }] =
    useUpdateOrderByOrderIdMutation();
  const [createCourierInfo, { isLoading: isCourierInfoUpdating }] =
    useCreateCourierInfoMutation();
  const [localItems, setLocalItems] = useState<IOrderItem[]>([]);
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [courierInfoOpen, setCourierInfoOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState({
    brandPhone: "+880 1234567890",
    brandEmail: "info@alwan.com",
    invoiceDate: new Date().toISOString().split("T")[0],
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

  if (isOrderLoading || isReturnProductLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-medium mb-2 text-gray-900 dark:text-gray-100">
          Error Loading Order
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          There was a problem fetching the order details. Please try again
          later.
        </p>
      </div>
    );
  }

  if (!response?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <Package className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          No Order Found
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          We couldn&apos;t find any order details for the given ID.
        </p>
      </div>
    );
  }

  const { data: order } = response;

  const handleOrderStatusChange = async (newStatus: string) => {
    try {
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
                itemStatus: newStatus as IOrderItem["itemStatus"],
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

  const handleCourierInfoSubmit = async (
    values: z.infer<typeof courierInfoSchema>
  ) => {
    if (!selectedItemId) return;

    try {
      const finalObj = {};
      // const result = createCourierInfo({...values, selectedItemId})
      console.log("Updating courier info for item:", selectedItemId, values);

      toast({
        title: "Courier Information Updated",
        description: "The courier information has been successfully updated.",
        variant: "default",
      });

      setCourierInfoOpen(false);
    } catch (error) {
      console.error("Error updating courier information:", error);
      toast({
        title: "Update Failed",
        description:
          "There was an error updating the courier information. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getOverallOrderStatus = () => {
    if (!localItems || localItems.length === 0) return "UNKNOWN";
    const statuses = localItems.map((item) => item.itemStatus);
    if (statuses.every((status) => status === "DELIVERED")) return "DELIVERED";
    if (statuses.some((status) => status === "RETURNED")) return "RETURNED";
    if (statuses.some((status) => status === "SHIPPED_TO_COURIER"))
      return "SHIPPED_TO_COURIER";
    if (statuses.some((status) => status === "RETURN_REQUESTED"))
      return "RETURN_REQUESTED";
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-medium text-gray-900 dark:text-white">
                  Order Details
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {order.id}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div
                  className={`${
                    statusColors[
                      getOverallOrderStatus() as keyof typeof statusColors
                    ]
                  } px-3 py-2.5 text-sm font-medium rounded-md`}
                >
                  {getOverallOrderStatus()}
                </div>
                <OrderStatus
                  status={order.orderStatus}
                  onStatusChange={handleOrderStatusChange}
                  isLoading={isOrderUpdating}
                />
                <Button
                  variant="default"
                  onClick={() => setIsInvoiceFormOpen(true)}
                  className="flex items-center"
                >
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Invoice
                </Button>
                <Button
                  variant="outline"
                  onClick={() => refetch()}
                  className="flex items-center"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl font-medium text-gray-900 dark:text-white">
                      <Package className="mr-2" />
                      Order Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {localItems && localItems.length > 0 ? (
                      localItems.map((item: IOrderItem) => (
                        <div
                          key={item.id}
                          className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                        >
                          {item.product.imageUrls &&
                          item.product.imageUrls.length > 0 ? (
                            <div className="relative lg:w-[160px] h-[100px] lg:h-[160px] w-[100px] rounded overflow-hidden">
                              <ImageSlider urls={item.product.imageUrls} />
                            </div>
                          ) : (
                            <div className="w-full sm:w-[100px] h-[100px] bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                              <Package className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                            </div>
                          )}

                          <div className="flex-grow space-y-2 w-full sm:w-auto">
                            <h3 className="font-medium text-lg text-gray-900 dark:text-white">
                              {item.product.name}
                            </h3>
                            <div className="flex flex-wrap gap-3 items-center">
                              <span className="text-sm px-2 py-1.5 rounded border">
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
                              <span className="px-3 py-1.5 rounded border">
                                {item.size?.name || "N/A"}
                              </span>
                              <span
                                className="inline-block w-8 h-8 rounded align-middle border"
                                style={{
                                  backgroundColor: item?.color?.hexCode,
                                }}
                              ></span>
                              <span className="px-2 py-1.5 rounded border">
                                {item.quantity} Pcs
                              </span>
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(
                                (item.discountedPrice ?? 0) * item.quantity
                              )}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-3 items-start sm:items-end w-full sm:w-auto mt-4 sm:mt-0">
                            <div
                              className={`${
                                statusColors[item.itemStatus]
                              } px-3 py-2 text-xs font-medium rounded w-full sm:w-auto text-center`}
                            >
                              {item.itemStatus}
                            </div>
                            <Select
                              onValueChange={(value) =>
                                handleItemStatusChange(item.id, value)
                              }
                              defaultValue={item.itemStatus}
                              disabled={item.itemStatus === "RETURNED"}
                            >
                              <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Update Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PROCESSING">
                                  Processing
                                </SelectItem>
                                <SelectItem value="SHIPPED_TO_COURIER">
                                  Shipped To Courier
                                </SelectItem>
                                <SelectItem value="DELIVERED">
                                  Delivered
                                </SelectItem>
                                <SelectItem value="RETURN_REQUESTED">
                                  Return Requested
                                </SelectItem>
                                <SelectItem value="RETURNED">
                                  Returned
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            {item.itemStatus === "SHIPPED_TO_COURIER" && (
                              <CourierInfoDialog
                                isOpen={
                                  courierInfoOpen && selectedItemId === item.id
                                }
                                onOpenChange={(open) => {
                                  setCourierInfoOpen(open);
                                  if (open) setSelectedItemId(item.id);
                                }}
                                onSubmit={handleCourierInfoSubmit}
                                itemId={item.id}
                                isLoading={isCourierInfoUpdating}
                              />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No items found in this order.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-teal-400 to-teal-600 dark:from-teal-600 dark:to-teal-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-medium text-white">
                      <User className="mr-2" />
                      Buyer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-white">
                    <p className="font-medium">{order.userName || "No Name"}</p>
                    <p className="font-medium">{order.email || "N/A"}</p>
                    <p className="font-medium">{order.phone || "N/A"}</p>
                    {order.altPhone && (
                      <p className="font-medium">{order.altPhone}</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-medium text-white">
                      <Truck className="mr-2" />
                      Delivery Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-white">
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

                <Card className="bg-gradient-to-br from-violet-400 to-violet-600 dark:from-violet-600 dark:to-violet-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-medium text-white">
                      <DollarSign className="mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white">
                    <p className="font-medium">
                      {order.shippingMethod || "N/A"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-400 to-indigo-600 dark:from-indigo-600 dark:to-indigo-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-medium text-white">
                      <CreditCard className="mr-2" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-white">
                    <p className="">
                      <span className="font-medium">Subtotal:</span>{" "}
                      {formatCurrency(order.totalCost || 0)}
                    </p>
                    <p className="">
                      <span className="font-medium">Shipping:</span>{" "}
                      {formatCurrency(order.shippingCost || 0)}
                    </p>
                    <Separator className="my-2 bg-white/20" />
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
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
            discountedPrice: item.discountedPrice ?? 0,
            size: item.size,
          }))}
          onGenerate={handleInvoiceGenerated}
        />
      )}
    </div>
  );
}
