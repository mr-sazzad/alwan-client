"use client";

import ProductCard from "@/components/cards/product-card";
import MaxWidth from "@/components/max-width";
import Filter from "@/components/products/desktop-filter";
import EmptyProductsPage from "@/components/products/EmptyProductsPage";
import MobileFilter from "@/components/products/mobile-filter";
import ProductsSkeleton from "@/components/skeletons/products-skeleton";
import { useGetCategoryQuery } from "@/redux/api/categoies/categoriesApi";
import { useGetAllColorsQuery } from "@/redux/api/color/color-api";
import { useGetCategoryProductsQuery } from "@/redux/api/products/productsApi";
import { IProduct } from "@/types";
import { useParams, useSearchParams } from "next/navigation";

const CategoryProductsClient = () => {
  const params = useParams();
  const category_name = Array.isArray(params.category_name)
    ? params.category_name[0]
    : params.category_name || "";

  const { data: productRes, isLoading } =
    useGetCategoryProductsQuery(category_name);
  const { data: response, isLoading: isCategoryLoading } =
    useGetCategoryQuery(category_name);
  const { data: colors, isLoading: isColorsLoading } =
    useGetAllColorsQuery(undefined);

  const searchParams = useSearchParams();

  const color = searchParams.get("color");
  const price = searchParams.get("price");

  // Function to filter products based on query params
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

    // Filter by color
    if (color) {
      const colors = Array.isArray(color) ? color : [color];
      filteredProducts = filteredProducts.filter((product) =>
        product.sizeVariants.some((variant) =>
          colors.includes(variant.color.name.toLocaleLowerCase())
        )
      );
    }

    // Filter by price range
    if (price) {
      const priceRanges = price.split(/\s*,\s*/);
      filteredProducts = filteredProducts.filter((product) =>
        product.sizeVariants.some((variant) =>
          isPriceInRange(variant.price, priceRanges)
        )
      );
    }

    return filteredProducts;
  };

  if (isLoading || isCategoryLoading || isColorsLoading) {
    return <ProductsSkeleton />;
  }

  const filteredProducts = filterProducts(productRes?.data.products);

  return (
    <MaxWidth className="mt-[100px] md:px-14 sm:px-10 px-5">
      <h1 className="md:text-2xl sm:text-xl text-lg font-medium mb-6 capitalize">
        {response?.data.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-3 relative w-full">
        {/* Desktop Filter (Fixed Position) */}
        <div className="md:min-w-[240px]">
          <div className="w-full md:border-r md:sticky md:top-[90px] hidden md:flex self-start h-screen">
            <Filter colorsFromServer={colors} categoryId={category_name} />
          </div>
          <div className="md:hidden mt-5 flex justify-between items-center">
            <h2 className="text-muted-foreground">
              {productRes?.data.products.length < 10
                ? `${productRes.data.products.length}`
                : productRes.data.products.length}{" "}
              {productRes?.data.products.length === 1 ? "Result" : "Results"}
            </h2>
            <MobileFilter
              colorsFromServer={colors}
              categoryId={category_name}
            />
          </div>
        </div>

        <div className="flex flex-col mt-2 w-full h-full overflow-hidden">
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
};

export default CategoryProductsClient;
