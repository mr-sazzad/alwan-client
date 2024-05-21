"use client";

import { ITShirt } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import ImageSlider from "./image-slider";

import BuyProductModal from "../modals/buy-product-modal";

const ProductCard: React.FC<ITShirt> = (card) => {
  const [cart, setCart] = useState<ITShirt[]>([]);

  const productPrice = card.prices.length - 1;
  let productName;

  if (card.name.length > 22) {
    productName = card.name.slice(0, 19) + "...";
  } else {
    productName = card.name;
  }

  return (
    <div className="p-2 xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-1/2 w-full hover:ring-1 rounded hover:ring-gray-400">
      <div className="overflow-hidden">
        <Link
          href={`/t-shirts/${card.id}`}
          className="flex relative flex-col gap-2"
        >
          <ImageSlider urls={card.images} />
          <div className="p-2">
            <p className="text-gray-600 font-medium">{productName}</p>
            <p className="text-lg font-medium text-gray-600">
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
