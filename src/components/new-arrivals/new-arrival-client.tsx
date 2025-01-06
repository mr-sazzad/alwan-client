"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import MaxWidth from "../../components/max-width";
import { Button } from "../../components/ui/button";
import { useGetAllProductsQuery } from "../../redux/api/products/productsApi";
import { IProduct } from "../../types";
import Filter from "../products/new-arrival-filter";
import NewArrivalSkeleton from "../skeletons/new-arrival-products";
import { formatPriceRange } from "../utils/utils";

const NewArrivalClient = () => {
  const {
    data: productsRes,
    isLoading,
    error,
  } = useGetAllProductsQuery(undefined);

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<{ [key: string]: number }>(
    {}
  );
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const searchParams = useSearchParams();

  if (isLoading) {
    return (
      <MaxWidth className="mt-[100px] md:px-14 sm:px-10 px-5">
        <h1 className="text-3xl font-bold mb-8">New Arrivals</h1>
        <NewArrivalSkeleton />
      </MaxWidth>
    );
  }

  if (error) {
    return (
      <MaxWidth className="mt-[100px] md:px-14 sm:px-10 px-5">
        <h1 className="text-3xl font-bold mb-8">New Arrivals</h1>
        <p className="text-red-500">
          Error loading new arrivals. Please try again later.
        </p>
      </MaxWidth>
    );
  }

  const newArrivalProducts = productsRes.data.filter(
    (product: IProduct) => product.isNewArrival
  );

  const filteredProducts = newArrivalProducts.filter((product: IProduct) => {
    const colorFilter = searchParams.get("color");
    const priceFilter = searchParams.get("price");

    if (colorFilter) {
      const colors = colorFilter.split(",");
      if (
        !colors.some((color) =>
          product.sizeVariants.some((variant) =>
            colors.includes(variant.color.name.toLowerCase())
          )
        )
      ) {
        return false;
      }
    }

    if (priceFilter) {
      const prices = priceFilter.split(",");
      const productPrice = Math.min(
        ...product.sizeVariants.map((v) => v.price)
      );
      if (
        !prices.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return productPrice >= min && (max ? productPrice <= max : true);
        })
      ) {
        return false;
      }
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort(
    (a: IProduct, b: IProduct) => {
      const sort = searchParams.get("sort");
      const aPrice = Math.min(...a.sizeVariants.map((v) => v.price));
      const bPrice = Math.min(...b.sizeVariants.map((v) => v.price));

      if (sort === "price_asc") {
        return aPrice - bPrice;
      } else if (sort === "price_desc") {
        return bPrice - aPrice;
      }
      return 0;
    }
  );

  if (sortedProducts.length === 0) {
    return (
      <MaxWidth className="mt-[100px] md:px-14 sm:px-10 px-5">
        <h1 className="text-3xl font-medium mb-8">New Arrivals</h1>
        <p>No new arrivals match your filters. Try adjusting your selection.</p>
      </MaxWidth>
    );
  }

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <MaxWidth className="mt-[100px] md:px-14 sm:px-10 px-5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium">New Arrivals</h1>
        <div className="hidden lg:block">
          <Button
            onClick={toggleFilter}
            variant="ghost"
            aria-expanded={isFilterVisible}
            aria-controls="filter-panel"
            className="text-lg no-underline flex items-center gap-1"
          >
            {isFilterVisible ? <>Hide Filters</> : <>Show Filters</>}
            <PiSlidersHorizontalBold className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        className={`flex flex-col lg:flex-row gap-8 transition-all duration-300 ease ${
          isFilterVisible ? "md:space-x-8" : "md:space-x-0"
        }`}
      >
        <div
          className={`lg:w-1/5 overflow-hidden transition duration-300 ease flex justify-between items-center ${
            isFilterVisible
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0 md:hidden"
          }`}
        >
          <div className="text-lg font-medium text-muted-foreground lg:hidden">
            {filteredProducts.length === 1
              ? "01 Result"
              : (filteredProducts.length < 10
                  ? "0" + filteredProducts.length
                  : filteredProducts.length) + " Results"}
          </div>
          <Filter />
        </div>

        <div
          className={`w-full transition duration-300 ease ${
            isFilterVisible ? "lg:w-3/4" : "w-full"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {sortedProducts.map((product: IProduct) => (
              <div
                key={product.id}
                className="shadow-md overflow-hidden"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => {
                  setHoveredProduct(null);
                  setHoveredImage((prev) => ({ ...prev, [product.id]: 0 }));
                }}
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative">
                    <Image
                      src={product.imageUrls[hoveredImage[product.id] || 0]}
                      alt={product.name}
                      width={700}
                      height={700}
                      className="w-full object-cover rounded"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      New
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    {hoveredProduct === product.id && (
                      <div className="mb-2">
                        <div className="flex space-x-2 overflow-x-auto">
                          {product.imageUrls.slice(0, 4).map((url, index) => (
                            <Image
                              key={index}
                              src={url}
                              alt={`${product.name} thumbnail ${index + 1}`}
                              width={30}
                              height={30}
                              className="h-18 w-18 object-cover cursor-pointer rounded-sm"
                              onMouseEnter={() =>
                                setHoveredImage((prev) => ({
                                  ...prev,
                                  [product.id]: index,
                                }))
                              }
                            />
                          ))}
                          {product.imageUrls.length > 4 && (
                            <div className="w-18 h-18 flex items-center justify-center text-gray-500 text-sm rounded">
                              +{product.imageUrls.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <p className="font-medium tag-color">
                      {product.availabilityTag}
                    </p>
                    {hoveredProduct !== product.id && (
                      <>
                        <h2 className="font-medium">{product.name}</h2>
                        <p className="text-muted-foreground">
                          {product.category.name}
                        </p>
                      </>
                    )}

                    <span className="font-medium">
                      BDT {formatPriceRange(product.sizeVariants)}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default NewArrivalClient;
