"use client";

import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { IProduct } from "@/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function InfiniteCarousel() {
  const { data: productsRes, isLoading } = useGetAllProductsQuery(undefined);
  const products = productsRes?.data || [];

  // Ensure we have at least 7 products
  const extendedProducts = [...products];
  while (extendedProducts.length < 7) {
    extendedProducts.push(...products);
  }
  const finalProducts = extendedProducts.slice(0, Math.max(8, products.length));

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-black to-white animate-pulse h-0 pb-[100%] rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (finalProducts.length === 0) {
    return <div className="text-center py-12">No products available</div>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 relative">
        <Swiper
          slidesPerView={2}
          spaceBetween={16}
          loop={true}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 28,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 32,
            },
          }}
          className="mySwiper"
        >
          {finalProducts.map((product: IProduct, index: number) => (
            <SwiperSlide key={`${product.id}-${index}`}>
              <Link href={`/product/${product.id}`} className="block h-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 h-full group">
                  <div className="relative w-full pb-[100%]">
                    <Image
                      src={product.imageUrls[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 14vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                      <h3 className="text-white text-sm sm:text-base lg:text-lg font-semibold p-2 text-center">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all">
          <ChevronLeft className="w-6 h-6 text-black" />
          <span className="sr-only">Previous</span>
        </button>
        <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all">
          <ChevronRight className="w-6 h-6 text-black" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </section>
  );
}
