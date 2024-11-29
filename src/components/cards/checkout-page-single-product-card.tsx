"use client";

import {
  decreaseProductQty,
  increaseProductQty,
} from "@/redux/api/cart/cartSlice";
import { IProduct } from "@/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

interface CheckoutPageSingleProductCardProps {
  product: IProduct;
  quantity: string;
  size: string;
}

const CheckoutPageSingleProductCard: React.FC<
  CheckoutPageSingleProductCardProps
> = ({ product, quantity, size }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId") || undefined;
  const sizeId = searchParams.get("sizeId") || undefined;
  const colorId = searchParams.get("colorId") || undefined;

  const selectedSizeVariant = product?.sizeVariants?.find(
    (variant) => variant.size.name.toUpperCase() === size.toUpperCase()
  );

  const handleIncreaseQty = () => {
    dispatch(
      increaseProductQty({
        id: product.id,
        size: product.orderSize,
        color: product.orderColor,
      })
    );
  };

  const handleDecreaseQty = () => {
    dispatch(
      decreaseProductQty({
        id: product.id,
        size: product.orderSize,
        color: product.orderColor,
      })
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-row gap-5 justify-between items-center w-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="relative w-24 h-24 rounded-md overflow-hidden">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-muted-foreground text-lg">
              {product.name.length > 27
                ? product.name.slice(0, 25) + "..."
                : product.name}
            </p>

            <div className="flex gap-1 items-end">
              <p className="text-sm font-medium text-muted-foreground">
                Color: {product.orderColor}, Size: {product.orderSize}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center font-medium text-lg">
                <span>BDT</span>
                <p>
                  {selectedSizeVariant?.price || product.sizeVariants[0].price}
                  .00
                </p>
              </div>
              <div className="flex gap-1 items-center border rounded-md overflow-hidden">
                {!(productId && colorId && sizeId) && (
                  <>
                    <Button
                      className="px-3 py-0 my-0"
                      size="cc"
                      variant="secondary"
                      onClick={handleDecreaseQty}
                    >
                      -
                    </Button>
                  </>
                )}
                {productId && colorId && sizeId ? (
                  <p className="px-3 py-1 bg-gray-200 text-black font-medium border border-gray-300 rounded-md text-center">
                    {quantity}
                  </p>
                ) : (
                  <p className="px-2">{quantity}</p>
                )}
                {!(productId && colorId && sizeId) && (
                  <>
                    <Button
                      className="px-3 py-0 my-0"
                      size="cc"
                      variant="secondary"
                      onClick={handleIncreaseQty}
                    >
                      +
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSingleProductCard;
