"use client";

import Loading from "@/app/loading";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import { bannerImage } from "@/static/banner-image";
import { ITShirt } from "@/types";
import ProductCard from "../cards/product-card";
import MaxWidth from "../max-width";
import Banner from "./banner";

const NewArrivals = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return (
      <div className="h-[400px]">
        <Loading />;
      </div>
    );
  }

  return (
    <MaxWidth>
      <div className="my-2 w-full">
        <Banner bannerImage={bannerImage} />
      </div>

      <div className="flex flex-wrap justify-start">
        {products &&
          products.map((card: ITShirt, index: number) => (
            <ProductCard key={index} {...card} />
          ))}
      </div>
    </MaxWidth>
  );
};

export default NewArrivals;
