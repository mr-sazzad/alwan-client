import ImageSlider from "@/components/cards/image-slider";
import {
  orderStatusArray,
  statusStyles,
} from "@/components/static/admin-single-product-status-style";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ITShirt } from "@/types";

import { PiSpinnerLight } from "react-icons/pi";

interface OrderPageProductCardProps {
  product: ITShirt;
  size: string;
  quantity: number;
  isLoading: boolean;
  handleOrderStatusChange: (orderStatus: string) => void;
  orderStatus:
    | "processing"
    | "onTheWay"
    | "delivered"
    | "requestToReturn"
    | "returned";
}

const OrderPageProductCard = ({
  product,
  size,
  quantity,
  orderStatus,
  handleOrderStatusChange,
  isLoading,
}: OrderPageProductCardProps) => {
  const { bgColor, textColor, displayText } = statusStyles[orderStatus] || {
    bgColor: "bg-gray-300",
    textColor: "text-gray-900",
    displayText: "Unknown Status",
  };

  return (
    <div className="flex md:flex-row flex-col md:gap-7">
      <div className="flex justify-center mb-5 md:mb-0">
        <div className="md:h-[190px] md:w-[190px] h-full w-[200px]">
          {product.images?.length > 0 && <ImageSlider urls={product.images} />}
        </div>
      </div>
      <div>
        <Separator className="border border-gray-300" orientation="vertical" />
      </div>
      <div className="flex md:flex-row flex-col gap-5 w-full">
        <div className="flex-1 w-full">
          <p className="text-gray-700 font-semibold text-lg">
            This Product Info
          </p>
          <div className="ml-2 flex flex-col gap-1">
            <div className="flex gap-1">
              <p className="text-gray-700 font-semibold">Size: </p>
              <p className="text-gray-700">{size} size</p>
            </div>
            <div className="flex gap-1">
              <p className="text-gray-700 font-semibold">Quantity: </p>
              <p className="text-gray-700">
                {quantity < 10 ? `0${quantity}` : quantity}
              </p>
            </div>
            <div className="flex gap-1">
              <p className="text-gray-700 font-semibold">Price:</p>
              <p className="text-gray-700">
                {product.prices?.length > 0
                  ? product.prices[1] * quantity
                  : product.prices[0] * quantity}
              </p>
            </div>
          </div>
        </div>
        <Separator className="border border-gray-300" orientation="vertical" />
        <div className="flex-1">
          <p className="text-gray-700 font-semibold text-lg mb-1">
            Change Item Status
          </p>
          <RadioGroup
            defaultValue={orderStatus}
            onValueChange={handleOrderStatusChange}
          >
            {orderStatusArray.map((status, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={status.value} id={status.value} />
                <Label htmlFor={status.value}>{status.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div>
        {/* Status */}
        <p
          className={`absolute bottom-5 right-5 py-[2px] px-3 rounded-full z-10 text-sm font-medium ${bgColor} ${textColor}`}
        >
          {isLoading ? (
            <div className="flex items-center gap-1">
              <PiSpinnerLight className="animate-spin" />
              <p>Loading ..</p>
            </div>
          ) : (
            displayText
          )}
        </p>
      </div>
    </div>
  );
};

export default OrderPageProductCard;
