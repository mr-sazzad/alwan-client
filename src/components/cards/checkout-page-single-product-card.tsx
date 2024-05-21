"use client";

import { ITShirt } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineColorLens } from "react-icons/md";
import { Button } from "../ui/button";

import { PiSpinnerBold, PiTrashLight } from "react-icons/pi";
import ImageSlider from "./image-slider";

interface CheckoutPageSingleProductCardProps {
  product: ITShirt;
  quantity: string;

  size: string;
}

const CheckoutPageSingleProductCard: React.FC<
  CheckoutPageSingleProductCardProps
> = ({ product, quantity, size }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const qty = Number(quantity);

  let timeoutId: NodeJS.Timeout | undefined;

  const handleGoBack = () => {
    setLoading(true);
    timeoutId = setTimeout(() => {
      router.back();
    }, 300);
  };

  const clearTimeoutAndGoBack = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setLoading(false);
    router.back();
  };

  return (
    <div className="flex flex-col gap-2 w-full items-start justify-between h-full">
      <div className="w-full">
        <div className="flex flex-row gap-5 justify-between items-center w-full">
          <div className="flex flex-row gap-4 flex-1">
            <div className="relative w-[90px] h-[90px]">
              <ImageSlider urls={product.images} />
            </div>
            <div>
              <p className="text-gray-700">
                {product.name.length > 23
                  ? product.name.slice(0, 20) + "..."
                  : product.name}
              </p>
              <div className="flex gap-2 items-end">
                <div className="flex gap-1 items-center text-gray-700 font-semibold">
                  TK.
                  <p>
                    {product.prices.length > 1
                      ? product.prices[1]
                      : product.prices[0]}
                  </p>
                </div>
                {product.prices.length > 1 && (
                  <div className="flex gap-1 items-center text-xs text-gray-700 line-through">
                    TK.
                    <p>{product.prices[0]}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center text-sm text-gray-700">
                  <MdOutlineColorLens />
                  <p>{product.color}</p>
                </div>
                <div className="flex gap-1 items-center text-sm text-gray-700">
                  <p>Qty: {qty > 1 ? `${quantity} pcs` : `${quantity} pic`}</p>
                </div>
              </div>
              <div className="flex gap-1 items-end">
                <p className="text-gray-700 flex">Size:</p>
                <p className="text-sm font-medium">{size.toUpperCase()}</p>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full flex justify-center items-center py-0 px-[10px]"
            onClick={handleGoBack}
          >
            {loading ? (
              <PiSpinnerBold size={16} className="animate-spin" />
            ) : (
              <PiTrashLight size={16} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSingleProductCard;
