"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import ProductCard from "../../../components/cards/product-card";
import MaxWidth from "../../../components/max-width";
import Filter from "../../../components/products/desktop-filter";
import EmptyProductsPage from "../../../components/products/EmptyProductsPage";
import MobileFilter from "../../../components/products/mobile-filter";
import ProductsSkeleton from "../../../components/skeletons/products-skeleton";
import { useGetCategoryQuery } from "../../../redux/api/categoies/categoriesApi";
import { useGetAllColorsQuery } from "../../../redux/api/color/color-api";
import { useGetCategoryProductsQuery } from "../../../redux/api/products/productsApi";
import { IProduct } from "../../../types";

export default function CategoryProductsClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const category_name = Array.isArray(params.category_name)
    ? params.category_name[0]
    : params.category_name || "";

  const { data: productRes, isLoading } =
    useGetCategoryProductsQuery(category_name);
  const { data: response, isLoading: isCategoryLoading } =
    useGetCategoryQuery(category_name);
  const { data: colors, isLoading: isColorsLoading } =
    useGetAllColorsQuery(undefined);

  const color = searchParams.get("color");
  const price = searchParams.get("price");
  const sort = searchParams.get("sort");

  const filterProducts = (products: IProduct[]) => {
    let filteredProducts = [...products];

    function isPriceInRange(productPrice: number, ranges: string[]) {
      for (const range of ranges) {
        const [min, max] = range.split(" to ").map(Number);
        if (productPrice >= min && productPrice <= max) {
          return true;
        }
      }
      return false;
    }

    if (color) {
      const colors = color.split(",").map((c) => c.toLowerCase());
      filteredProducts = filteredProducts.filter((product) =>
        product.sizeVariants.some((variant) =>
          colors.includes(variant.color.name.toLowerCase())
        )
      );
    }

    if (price) {
      const priceRanges = price.split(",");
      filteredProducts = filteredProducts.filter((product) =>
        product.sizeVariants.some((variant) =>
          isPriceInRange(variant.price, priceRanges)
        )
      );
    }

    if (sort) {
      switch (sort) {
        case "price_asc":
          filteredProducts.sort(
            (a, b) => a.sizeVariants[0].price - b.sizeVariants[0].price
          );
          break;
        case "price_desc":
          filteredProducts.sort(
            (a, b) => b.sizeVariants[0].price - a.sizeVariants[0].price
          );
          break;
        case "newest":
          filteredProducts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
      }
    }

    return filteredProducts;
  };

  if (isLoading || isCategoryLoading) {
    return <ProductsSkeleton />;
  }

  const filteredProducts = filterProducts(productRes?.data.products || []);

  return (
    <MaxWidth className="mt-[100px] md:px-14 sm:px-10 px-5">
      <h1 className="md:text-2xl sm:text-xl text-lg font-medium mb-6 capitalize">
        {response?.data.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-3 relative w-full">
        <div className="md:min-w-[240px]">
          <div className="w-full md:border-r md:sticky md:top-[90px] hidden md:flex self-start h-screen overflow-y-auto px-2">
            <Filter categoryId={category_name} />
          </div>
        </div>

        <div className="flex flex-col mt-2 w-full h-full overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium text-muted-foreground">
              {filteredProducts.length === 1
                ? "01 Result"
                : (filteredProducts.length < 10
                    ? "0" + filteredProducts.length
                    : filteredProducts.length) + " Results"}
            </div>

            <div className="md:hidden mb-4">
              <MobileFilter
                colorsFromServer={colors?.data}
                categoryId={category_name}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-start w-full h-full">
            {!filteredProducts.length ? (
              <EmptyProductsPage />
            ) : (
              filteredProducts.map((product: IProduct) => (
                <ProductCard key={product.id} {...product} />
              ))
            )}
          </div>
        </div>
      </div>
    </MaxWidth>
  );
}
