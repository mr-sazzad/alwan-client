"use client";

import { IProduct, IReadSizeVariant } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NotificationDialog from "../modals/notify-dialog";
import ProductModal from "../modals/product-modal";
import { Button } from "../ui/button";
import ImageSlider from "./image-slider";

const ProductCard: React.FC<IProduct> = (product) => {
  const [open, setOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
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
      <div className="p-2 lg:w-1/3 md:w-1/2 w-1/2 flex flex-col justify-between border border-transparent hover:rounded hover:border-gray-200">
        <div className="overflow-hidden">
          <Link
            href={`/products/${product.id}`}
            className="flex relative flex-col gap-2"
          >
            <ImageSlider urls={product.imageUrls} />
            <div className="p-2 capitalize">
              <p className="text-xs font-medium text-[#9E3500]">
                {product.statusTag}
              </p>
              <p className="font-medium">{product.name}</p>
              <p className="text-muted-foreground text-sm">
                {uniqueSizes.size} Size
              </p>
            </div>
          </Link>
        </div>
        <div className="flex gap-1 mt-2">
          {product.statusTag === "coming soon" ? (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setDialogOpen(true)}
            >
              Notify Me
            </Button>
          ) : (
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
          )}
        </div>
      </div>

      <ProductModal
        product={product}
        open={open}
        setOpen={setOpen}
        actionType={actionType}
      />

      <NotificationDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        productId={product.id}
        productName={product.name}
      />
    </>
  );
};

export default ProductCard;
