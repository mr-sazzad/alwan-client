"use client";

import {
  decreaseProductQty,
  increaseProductQty,
} from "@/redux/api/cart/cartSlice";
import { IUserCartProduct } from "@/types";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

interface CheckoutPageSingleProductCardProps {
  product: IUserCartProduct;
  quantity: string;
  size: string;
}

const CheckoutPageSingleProductCard: React.FC<
  CheckoutPageSingleProductCardProps
> = ({ product, quantity, size }) => {
  const qty = Number(quantity);
  const dispatch = useDispatch();

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
              src={product.imageUrls[0] || "/placeholder.svg"}
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
                <span className="bg-clip-text">TK</span>
                <p className="bg-clip-text">
                  {selectedSizeVariant?.price || product.sizeVariants[0].price}
                </p>
              </div>
              <div className="flex gap-1 items-center border rounded-md overflow-hidden">
                <Button
                  className="px-3 py-0 my-0"
                  size="cc"
                  variant="secondary"
                  onClick={handleDecreaseQty}
                >
                  -
                </Button>
                <p className="px-2">{product.orderQty}</p>
                <Button
                  className="px-3 py-0 my-0"
                  size="cc"
                  variant="secondary"
                  onClick={handleIncreaseQty}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSingleProductCard;
