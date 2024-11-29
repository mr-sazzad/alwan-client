"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useInitiateReturnMutation } from "@/redux/api/return/return-api";
import { ReturnOrderFormValues } from "@/schemas/order-return-schema";
import { IOrderItem } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { ReturnOrderDialog } from "./return-order-dialog";

enum ItemStatus {
  PROCESSING = "PROCESSING",
  SHIPPED_TO_COURIER = "SHIPPED_TO_COURIER",
  DELIVERED = "DELIVERED",
  RETURN_REQUESTED = "RETURN_REQUESTED",
  RETURNED = "RETURNED",
}

const ItemStatusBadge = ({ status }: { status: ItemStatus }) => {
  const statusColors = {
    [ItemStatus.PROCESSING]: "bg-yellow-100 text-yellow-800",
    [ItemStatus.SHIPPED_TO_COURIER]: "bg-blue-100 text-blue-800",
    [ItemStatus.DELIVERED]: "bg-green-100 text-green-800",
    [ItemStatus.RETURN_REQUESTED]: "bg-orange-100 text-orange-800",
    [ItemStatus.RETURNED]: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded ${statusColors[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

const OrderItem: React.FC<{ item: IOrderItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [initiateReturn] = useInitiateReturnMutation();
  const { toast } = useToast();

  const handleReturnRequest = async (values: ReturnOrderFormValues) => {
    try {
      const payload = {
        orderId: item.orderId,
        orderItemId: item.id,
        quantity: values.returnQuantity || 1,
        returnReason: values.returnReason,
        ...(values.returnNote &&
          values.returnNote.trim() !== "" && {
            returnNote: values.returnNote.trim(),
          }),
      };

      const result = await initiateReturn(payload).unwrap();

      if (result.status === 200) {
        toast({
          title: "Return Initiated",
          description: "Your return request has been successfully submitted.",
        });
        setOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit return request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4 py-4 border-b last:border-b-0">
        <div className="flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden">
          <Image
            src={item.product.imageUrls[0]}
            alt={item.product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex-grow">
          <h4 className="text-sm font-medium">{item.product.name}</h4>
          <p className="text-xs text-gray-500">{item.product.brand}</p>
          <div className="flex items-center mt-1">
            <p className="text-xs text-gray-500">
              {item.color.name} | {item.size.name}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {item.quantity}{" "}
            {item.quantity < 3 ? (item.quantity === 1 ? "pc" : "pcs") : ""}
          </p>
        </div>
        <div className="text-sm font-medium flex flex-col items-end">
          <div className="mb-2">
            <ItemStatusBadge status={item.itemStatus as ItemStatus} />
          </div>
          <div>BDT {item.discountedPrice?.toFixed(2)}</div>
          {item.itemStatus === ItemStatus.DELIVERED && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setOpen(true)}
              className="mt-2"
            >
              Return Request
            </Button>
          )}
        </div>
      </div>
      <ReturnOrderDialog
        open={open}
        setOpen={setOpen}
        onSubmit={handleReturnRequest}
        orderQuantity={item.quantity}
        orderId={item.orderId}
      />
    </>
  );
};

export default OrderItem;
