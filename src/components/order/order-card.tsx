import { useCancelOrderMutation } from "@/redux/api/orders/ordersApi";
import { IOrder, IOrderItem } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "../ui/use-toast";
import CancelOrderDialog from "./cancel-order-dialog";
import OrderItem from "./order-item";

enum OrderStatus {
  CANCELLED = "CANCELLED",
  CONFIRM = "CONFIRM",
}

enum ItemStatus {
  PROCESSING = "PROCESSING",
  SHIPPED_TO_COURIER = "SHIPPED_TO_COURIER",
  DELIVERED = "DELIVERED",
  RETURN_REQUESTED = "RETURN_REQUESTED",
  RETURNED = "RETURNED",
}

type Status = OrderStatus | ItemStatus;

const statusDisplayNames: { [key in Status]: string } = {
  [OrderStatus.CANCELLED]: "Cancelled",
  [OrderStatus.CONFIRM]: "Confirmed",
  [ItemStatus.PROCESSING]: "Processing",
  [ItemStatus.SHIPPED_TO_COURIER]: "Ship to Courier",
  [ItemStatus.DELIVERED]: "Delivered",
  [ItemStatus.RETURN_REQUESTED]: "Return Requested",
  [ItemStatus.RETURNED]: "Returned",
};

const statusColors: { [key in Status]: string } = {
  [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
  [OrderStatus.CONFIRM]: "bg-green-100 text-green-800",
  [ItemStatus.PROCESSING]: "bg-yellow-100 text-yellow-800",
  [ItemStatus.SHIPPED_TO_COURIER]: "bg-blue-100 text-blue-800",
  [ItemStatus.DELIVERED]: "bg-green-100 text-green-800",
  [ItemStatus.RETURN_REQUESTED]: "bg-orange-100 text-orange-800",
  [ItemStatus.RETURNED]: "bg-gray-100 text-gray-800",
};

const OrderStatusBadge = ({ status }: { status: Status }) => {
  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[status]}`}
    >
      {statusDisplayNames[status]}
    </span>
  );
};

const OrderCard: React.FC<{ order: IOrder }> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();

  const allItemsProcessing = order.items.every(
    (item) => item.itemStatus === ItemStatus.PROCESSING
  );

  const handleCancelOrder = async () => {
    if (order.id) {
      const result: any = await cancelOrder(order.id);

      if (result.data.status === 200) {
        toast({
          title: "Order Cancelled!",
          description: "Your order has been cancelled successfully",
        });
      }
    }
  };

  return (
    <div>
      <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-medium">
                  Order #{order.id ? order.id.slice(0, 8) : "N/A"}
                </CardTitle>
                <span className="text-sm text-gray-500">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>
              <div>
                {order.orderStatus === OrderStatus.CANCELLED ? (
                  <OrderStatusBadge status={OrderStatus.CANCELLED} />
                ) : (
                  <OrderStatusBadge
                    status={
                      (order.items[0]?.itemStatus as ItemStatus) ||
                      ItemStatus.PROCESSING
                    }
                  />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {order.items.slice(0, 3).map((item: IOrderItem) => (
                  <div
                    key={item.id}
                    className="relative w-12 h-12 rounded overflow-hidden border"
                  >
                    {item.product && item.product.imageUrls && (
                      <Image
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p className="text-lg font-medium">
                  BDT{" "}
                  {(
                    Number(order.totalCost) + Number(order.shippingCost)
                  ).toFixed(2)}
                </p>
                {allItemsProcessing && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setOpen(true)}
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-b-0">
                <AccordionTrigger
                  className="text-sm font-medium hover:no-underline"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Hide Details" : "View Details"}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">
                        Shipping Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span>{order.userName}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span>{order.phone}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span>{order.email}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Address:</span>
                          <span className="text-right">
                            {order.streetAddress}, {order.union},{" "}
                            {order.upazila}, {order.district}, {order.division}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Order Items</h4>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <OrderItem key={item.id} item={item} />
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">
                        Shipping Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex justify-between">
                          <span className="text-gray-600">
                            Shipping Method:
                          </span>
                          <span className="text-emerald-600 font-medium dark:text-emerald-500">
                            {order.shippingMethod === "CASH_ON_DELIVERY"
                              ? "Cash On Delivery"
                              : "Online Payment"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Shipping Cost:</span>
                          <span>{order.shippingCost.toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
      <CancelOrderDialog
        open={open}
        setOpen={setOpen}
        handler={handleCancelOrder}
        loading={isLoading}
        orderId={order.id || ""}
      />
    </div>
  );
};

export default OrderCard;
