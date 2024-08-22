"use client";

import { IProduct, IReadSizeVariant } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BuyProductModal from "../modals/buy-product-modal";
import ImageSlider from "./image-slider";

const ProductCard: React.FC<IProduct> = (product) => {
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
    <div className="p-2 xl:w-1/4 lg:w-1/3 md:w-1/3 w-1/2 flex flex-col justify-between">
      <div className="overflow-hidden">
        <Link
          href={`/products/${product.id}`}
          className="flex relative flex-col gap-2"
        >
          <ImageSlider urls={product.imageUrls} />
          <div className="p-2 font-semibold capitalize">
            <p>{product.name}</p>
            <p className="text-muted-foreground">{uniqueSizes.size} Sizes</p>
          </div>
        </Link>
      </div>
      <div>
        <BuyProductModal product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
