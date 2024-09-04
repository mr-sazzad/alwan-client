"use client";

import { IProduct } from "@/types";
import { useState } from "react";
import ImageSlider from "./image-slider";

interface CheckoutPageSingleProductCardProps {
  product: IProduct;
  quantity: string;
  size: string;
}

const CheckoutPageSingleProductCard: React.FC<
  CheckoutPageSingleProductCardProps
> = ({ product, quantity, size }) => {
  const [loading, setLoading] = useState(false);

  // console.log("PRODUCT FROM CHECKOUT SINGLE PRODUCT CARD PAGE =>", product);

  const qty = Number(quantity);

  const handleProductDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const selectedSizeVariant = product?.sizeVariants?.find(
    (variant) => variant.size.name.toUpperCase() === size.toUpperCase()
  );

  return (
    <div className="flex flex-col gap-2 w-full items-start justify-between h-full">
      <div className="w-full">
        <div className="flex flex-row gap-5 justify-between items-center w-full">
          <div className="flex flex-row gap-4 flex-1">
            <div className="relative w-[100px] h-[100px]">
              <ImageSlider urls={product.imageUrls} />
            </div>
            <div>
              <p className="text-muted-foreground font-medium">
                {product.name.length > 23
                  ? product.name.slice(0, 20) + "..."
                  : product.name}
              </p>

              <div className="flex gap-2 items-end">
                <div className="flex gap-1 items-center text-muted-foreground font-medium">
                  TK.
                  <p>
                    {selectedSizeVariant?.price ||
                      product.sizeVariants[0].price}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 items-end">
                <p className="text-sm font-medium">{size.toUpperCase()}</p>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center text-sm text-muted-foreground">
                  <p>{qty > 1 ? `${quantity} pcs` : `${quantity} pic`}</p>
                </div>

                <div className="flex gap-1 items-center text-sm text-muted-foreground">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: selectedSizeVariant?.color.hexCode,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSingleProductCard;
