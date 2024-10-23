import { IOrderItem } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";

enum ItemStatus {
  PROCESSING = "PROCESSING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  REQUESTTORETURN = "REQUESTTORETURN",
  RETURNED = "RETURNED",
}

const ItemStatusBadge = ({ status }: { status: ItemStatus }) => {
  const statusColors = {
    [ItemStatus.PROCESSING]: "bg-yellow-100 text-yellow-800",
    [ItemStatus.IN_TRANSIT]: "bg-blue-100 text-blue-800",
    [ItemStatus.DELIVERED]: "bg-green-100 text-green-800",
    [ItemStatus.REQUESTTORETURN]: "bg-orange-100 text-orange-800",
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
  const handleRequestReturn = () => {
    // Implement request return logic here
    console.log("Requesting return for item:", item.id);
  };

  return (
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
            variant="outline"
            size="sm"
            onClick={handleRequestReturn}
            className="mt-2"
          >
            Request Return
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
