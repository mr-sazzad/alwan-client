"use client";

import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import { IProduct } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const NewArrivalProductsSlider = () => {
  const { data: productsRes, isLoading } = useGetAllProductsQuery(undefined);
  const [products, setProducts] = useState<IProduct[]>([]);
  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    if (productsRes?.data) {
      const originalProducts = productsRes.data;
      let extendedProducts = [...originalProducts];

      while (extendedProducts.length < 20) {
        extendedProducts = [...extendedProducts, ...originalProducts];
      }

      setProducts(extendedProducts);
    }
  }, [productsRes]);

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto space-x-4 py-5">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-gray-200 to-white animate-pulse w-48 h-48 flex-shrink-0 rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5 text-gray-600">
        No products available
      </div>
    );
  }

  return (
    <section className="py-5 relative">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
          <h2 className="text-4xl font-medium relative mb-4 sm:mb-0">
            New Arrivals
          </h2>
          <p>
            {productsRes?.data?.length || 0} Item
            {(productsRes?.data?.length || 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView="auto"
            spaceBetween={24}
            loop={true}
            centeredSlides={false}
            slideToClickedSlide={true}
            speed={800}
            breakpoints={{
              320: { slidesPerView: 2.2, spaceBetween: 16 },
              640: { slidesPerView: 3.2, spaceBetween: 20 },
              768: { slidesPerView: 4.2, spaceBetween: 24 },
              1024: { slidesPerView: 5.2, spaceBetween: 28 },
              1280: { slidesPerView: 6.2, spaceBetween: 32 },
            }}
            className="mySwiper"
          >
            {products.map((product: IProduct, index: number) => (
              <SwiperSlide key={`${product.id}-${index}`} className="w-auto">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg group">
                    <div className="relative aspect-square w-48 h-48">
                      <Image
                        src={product.imageUrls[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                        <h3 className="text-white font-medium p-4 text-center line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalProductsSlider;
