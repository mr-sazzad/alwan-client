"use client";

import { ITShirt } from "@/types";
import { useState } from "react";
import { MdOutlineColorLens } from "react-icons/md";
import { PiSpinnerBold, PiTrashLight } from "react-icons/pi";
import { Button } from "../ui/button";
import ImageSlider from "./image-slider";

interface CheckoutPageSingleProductCardProps {
  product: ITShirt;
  quantity: string;
  size: string;
  onProductDelete: (id: string, size: string) => void;
}

const CheckoutPageSingleProductCard: React.FC<
  CheckoutPageSingleProductCardProps
> = ({ product, quantity, size, onProductDelete }) => {
  const [loading, setLoading] = useState(false);

  const qty = Number(quantity);

  const handleProductDelete = () => {
    setLoading(true);
    setTimeout(() => {
      onProductDelete(product.id, size);
      setLoading(false);
    }, 300);
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
              <p className="text-muted-foreground">
                {product.name.length > 23
                  ? product.name.slice(0, 20) + "..."
                  : product.name}
              </p>
              <div className="flex gap-2 items-end">
                <div className="flex gap-1 items-center text-muted-foreground font-semibold">
                  TK.
                  <p>
                    {product.prices.length > 1
                      ? product.prices[1]
                      : product.prices[0]}
                  </p>
                </div>
                {product.prices.length > 1 && (
                  <div className="flex gap-1 items-center text-xs text-muted-foreground line-through">
                    TK.
                    <p>{product.prices[0]}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center text-sm text-muted-foreground">
                  <MdOutlineColorLens />
                  <p>{product.color}</p>
                </div>
                <div className="flex gap-1 items-center text-sm text-muted-foreground">
                  <p>Qty: {qty > 1 ? `${quantity} pcs` : `${quantity} pic`}</p>
                </div>
              </div>
              <div className="flex gap-1 items-end">
                <p className="text-muted-foreground flex">Size:</p>
                <p className="text-sm font-medium">{size.toUpperCase()}</p>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full flex justify-center items-center py-0 px-[10px]"
            onClick={handleProductDelete}
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
