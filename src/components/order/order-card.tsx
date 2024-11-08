import { IOrder } from "@/types";
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
import OrderItem from "./order-item";

enum OrderStatus {
  CANCELLED = "CANCELLED",
  CONFIRM = "CONFIRM",
}

enum ItemStatus {
  PROCESSING = "PROCESSING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  REQUESTTORETURN = "REQUESTTORETURN",
  RETURNED = "RETURNED",
}

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusColors = {
    [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
    [OrderStatus.CONFIRM]: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};

const OrderCard: React.FC<{ order: IOrder }> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const allItemsProcessing = order.items.every(
    (item) => item.itemStatus === ItemStatus.PROCESSING
  );

  const handleCancelOrder = () => {
    // Implement cancel order logic here
    console.log("Cancelling order:", order.id);
  };

  return (
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
                Order #{order.id.slice(0, 8)}
              </CardTitle>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div>
              <OrderStatusBadge status={order.orderStatus as OrderStatus} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {order.items.slice(0, 3).map((item, index) => (
                <div
                  key={item.id}
                  className="relative w-12 h-12 rounded-full overflow-hidden border"
                >
                  <Image
                    src={item.product.imageUrls[0]}
                    alt={item.product.name}
                    layout="fill"
                    objectFit="cover"
                  />
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
                {(Number(order.totalCost) + Number(order.shippingCost)).toFixed(
                  2
                )}
              </p>
              {allItemsProcessing && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleCancelOrder}
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
                          {order.streetAddress}, {order.union}, {order.upazila},{" "}
                          {order.district}, {order.division}
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
                        <span className="text-gray-600">Shipping Method:</span>
                        <span>{order.shippingMethod}</span>
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
  );
};

export default OrderCard;
