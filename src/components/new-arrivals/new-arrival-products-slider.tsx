"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../../components/ui/button";
import { useGetAllProductsQuery } from "../../redux/api/products/productsApi";
import type { IProduct } from "../../types";

const NewArrivalProductsSlider = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);
  const swiperRef = useRef<SwiperType>();

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto space-x-4 py-5">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-gray-200 to-white animate-pulse w-full pb-[133.33%] flex-shrink-0 rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-5 text-muted-foreground">
        No products available
      </div>
    );
  }

  return (
    <section className="py-5 relative mt-16">
      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
          <h2 className="text-3xl md:text-4xl font-bold relative mb-4 sm:mb-0">
            Shop New Arrivals
          </h2>
          <p className="text-sm sm:text-base">
            {products.length} Item{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView="auto"
            spaceBetween={14}
            loop={false}
            centeredSlides={false}
            slideToClickedSlide={true}
            speed={800}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 16 },
              480: { slidesPerView: 2.2, spaceBetween: 16 },
              640: { slidesPerView: 3.2, spaceBetween: 20 },
              768: { slidesPerView: 4.2, spaceBetween: 24 },
              1024: { slidesPerView: 5.2, spaceBetween: 28 },
              1280: { slidesPerView: 6.2, spaceBetween: 32 },
            }}
            className="mySwiper"
          >
            {products.map((product: IProduct) => (
              <SwiperSlide key={product.id} className="w-full">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="bg-white shadow-md overflow-hidden transition-all hover:shadow-lg group">
                    <div className="relative w-full pb-[133.33%]">
                      <Image
                        src={product.imageUrls[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        className="object-cover"
                        loading="lazy"
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
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black text-white"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black text-white"
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
