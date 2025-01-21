"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import MaxWidth from "../../components/max-width";
import { useGetAllProductsQuery } from "../../redux/api/products/productsApi";
import type { IProduct } from "../../types";
import EmptyProductsPage from "../products/EmptyProductsPage";
import Filter from "../products/new-arrival-filter";
import ProductsSkeleton from "../skeletons/products-skeleton";
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
  const searchParams = useSearchParams();

  if (isLoading) {
    return <ProductsSkeleton />;
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

  return (
    <MaxWidth className="mt-[100px] md:px-14 sm:px-10 px-5">
      <div
        className="flex flex-col lg:flex-row transition-all duration-300 ease md:space-x-6
        "
      >
        <div
          className={`md:min-w-[280px] overflow-hidden flex justify-between max-h-[1000px] opacity-100`}
        >
          <div className="text-lg text-muted-foreground lg:hidden mb-4 w-full">
            {filteredProducts.length === 1
              ? "01 Result"
              : (filteredProducts.length < 10
                  ? "0" + filteredProducts.length
                  : filteredProducts.length) + " Results"}
          </div>
          <div className="md:flex flex-col gap-2 w-full hidden">
            <p className="md:text-2xl sm:text-xl text-lg font-medium">
              New Arrival
            </p>
            <Filter />
          </div>
        </div>

        <div className={`w-full lg:w-3/4`}>
          <div className="hidden lg:block text-lg text-muted-foreground mb-4">
            {filteredProducts.length === 1
              ? "01 Result"
              : (filteredProducts.length < 10
                  ? "0" + filteredProducts.length
                  : filteredProducts.length) + " Results"}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredProducts.length === 0 ? (
              <div className="col-span-2 lg:col-span-3 flex justify-center items-center min-h-[50vh]">
                <EmptyProductsPage />
              </div>
            ) : (
              sortedProducts.map((product: IProduct) => (
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
                                src={url || "/placeholder.svg"}
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
                              <div className="w-18 h-18 flex items-center justify-center text-muted-foreground text-sm rounded">
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
              ))
            )}
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default NewArrivalClient;
