"use client";

import ProductCard from "@/components/cards/product-card";
import MaxWidth from "@/components/max-width";
import Filter from "@/components/products/desktop-filter";
import EmptyProductsPage from "@/components/products/EmptyProductsPage";
import ProductsSkeleton from "@/components/skeletons/products-skeleton";
import { useGetAllColorsQuery } from "@/redux/api/color/color-api";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import { IProduct } from "@/types";
import { useSearchParams } from "next/navigation";

const ProductsPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);
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

  if (isLoading || isColorsLoading) {
    return <ProductsSkeleton />;
  }

  // Apply filters
  const filteredProducts = filterProducts(products?.data);

  return (
    <MaxWidth>
      <div className="flex flex-col md:flex-row gap-3 mt-[90px] relative w-full">
        {/* Desktop Filter (Fixed Position) */}
        <div className="md:w-[190px] w-full">
          <div className="md:min-w-[190px] md:border-r md:sticky md:top-[90px] hidden md:flex self-start h-screen">
            <Filter colorsFromServer={colors} />
          </div>
          {/* // Mobile Filter */}
          <div className="md:hidden block mt-5">{/* <MobileFilter /> */}</div>
        </div>

        {/* Products list */}
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

export default ProductsPage;
