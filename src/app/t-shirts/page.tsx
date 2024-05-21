"use client";

import ProductCard from "@/components/cards/product-card";
import MaxWidth from "@/components/max-width";
import EmptyProductsPage from "@/components/products/EmptyProductsPage";
import Filter from "@/components/products/desktop-filter";
import MobileFilter from "@/components/products/mobile-filter";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import { ITShirt as ITShirtProduct } from "@/types";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";

const ProductsPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);
  const searchParams = useSearchParams();

  const color = searchParams.get("color");
  const price = searchParams.get("price");

  console.log(price, "PRICE");

  // Function to filter products based on query params
  const filterProducts = (products: ITShirtProduct[]) => {
    let filteredProducts = [...products];

    function isPriceInRange(price: number, ranges: string[]) {
      for (const range of ranges) {
        const [min, max] = range.split(" to ").map(Number);
        if (price >= min && price <= max) {
          return true;
        }
      }
      return false;
    }

    // Filter by color
    if (color) {
      const colors = Array.isArray(color) ? color : [color];
      filteredProducts = filteredProducts.filter((product) =>
        colors.includes(product.color)
      );
    }

    // Filter by price range
    if (price) {
      const priceRanges = price.split(/\s*,\s*/);

      filteredProducts = products.filter((product) => {
        const price =
          product.prices.length > 1 ? product.prices[1] : product.prices[0];

        return isPriceInRange(price, priceRanges);
      });
    }

    return filteredProducts;
  };

  if (isLoading) {
    return <Loading height={100} width={100} />;
  }

  // Apply filters
  const filteredProducts = filterProducts(products);

  return (
    <MaxWidth>
      <div className="flex flex-col md:flex-row gap-5 mt-[90px] relative w-full">
        {/* Desktop Filter (Fixed Position) */}
        <div className="md:w-[200px] w-full">
          <div className="md:min-w-[200px] md:border-r md:sticky md:top-[90px] hidden md:flex self-start h-screen">
            <Filter />
          </div>
          {/* Mobile Filter */}
          <div className="md:hidden block mt-5">
            <MobileFilter />
          </div>
        </div>

        {/* Products list */}
        <div className="flex-1 flex flex-wrap justify-start pt-5 h-full">
          {!filteredProducts.length && <EmptyProductsPage />}
          {filteredProducts.map((tShirt: ITShirtProduct) => (
            <ProductCard key={tShirt.id} {...tShirt} />
          ))}
        </div>
      </div>
    </MaxWidth>
  );
};

export default ProductsPage;
