"use client";

import { ITShirt } from "@/types";
import Link from "next/link";
import React from "react";
import ImageSlider from "./image-slider";

import BuyProductModal from "../modals/buy-product-modal";

const ProductCard: React.FC<ITShirt> = (card) => {
  const productPrice = card.prices.length - 1;
  let productName;

  if (card.name.length > 25) {
    productName = card.name.slice(0, 22) + "...";
  } else {
    productName = card.name;
  }

  return (
    <div className="p-2 xl:w-1/4 lg:w-1/3 md:w-1/3 w-1/2 hover:ring-1 rounded hover:ring-gray-400">
      <div className="overflow-hidden">
        <Link
          href={`/t-shirts/${card.id}`}
          className="flex relative flex-col gap-2"
        >
          <ImageSlider urls={card.images} />
          <div className="p-2">
            <p className="font-medium dark:font-thin">{productName}</p>
            <p className="text-lg font-medium">
              TK. {card.prices[productPrice]}
            </p>
          </div>
        </Link>
        <div>
          <BuyProductModal product={card} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
