"use client";

import { IProduct, IReadSizeVariant } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import ProductModal from "../modals/product-modal";
import { Button } from "../ui/button";
import ImageSlider from "./image-slider";

const ProductCard: React.FC<IProduct> = (product) => {
  const [open, setOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"buy" | "cart">("cart");
  const [selectedVariant, setSelectedVariant] =
    useState<IReadSizeVariant | null>(null);

  const uniqueSizes = new Set(
    product.sizeVariants.map((variant) => variant.size.name)
  );

  useEffect(() => {
    if (product.sizeVariants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.sizeVariants[0]);
    }
  }, [product.sizeVariants, selectedVariant]);

  return (
    <>
      <div className="p-2 xl:w-1/4 lg:w-1/3 md:w-1/2 w-1/2 flex flex-col justify-between">
        <div className="overflow-hidden">
          <Link
            href={`/products/${product.id}`}
            className="flex relative flex-col gap-2"
          >
            <ImageSlider urls={product.imageUrls} />
            <div className="p-2 capitalize">
              <p className="font-semibold">{product.name}</p>
              <p className="text-muted-foreground font-medium text-sm">
                {uniqueSizes.size} Sizes
              </p>
            </div>
          </Link>
        </div>
        <div className="flex gap-1">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              setOpen(true);
              setActionType("cart");
            }}
          >
            Add To Cart
          </Button>

          {/* Buy Now Button */}
          <Button
            onClick={() => {
              setOpen(true);
              setActionType("buy");
            }}
          >
            <IoBagHandleOutline />
          </Button>
        </div>
      </div>

      <ProductModal
        product={product}
        open={open}
        setOpen={setOpen}
        actionType={actionType}
      />
    </>
  );
};

export default ProductCard;
