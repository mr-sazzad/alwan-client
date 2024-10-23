"use client";

import Image from "next/image";
import React, { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface DetailsPageImageSliderProps {
  urls: string[];
}

const DetailsPageImageSlider: React.FC<DetailsPageImageSliderProps> = ({
  urls,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Swiper
          spaceBetween={0}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} bg-gray-300 opacity-70 hover:bg-gray-400 transition-colors duration-200"></span>`;
            },
          }}
          modules={[FreeMode, Thumbs, Pagination]}
          className="h-full w-full product-main-swiper"
        >
          {urls.map((url, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={url}
                  alt={`Product image ${index + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative w-full">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="h-20 product-thumbs-swiper"
        >
          {urls.map((url, index) => (
            <SwiperSlide key={index} className="!w-20">
              <div className="relative h-full w-full overflow-hidden rounded-md border-2 border-transparent transition-all duration-200 hover:border-primary">
                <Image
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="cursor-pointer"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DetailsPageImageSlider;

const styles = `
  .product-main-swiper .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: #d1d5db;
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  .product-main-swiper .swiper-pagination-bullet-active {
    background-color: #000000;
    opacity: 1;
  }

  .product-thumbs-swiper .swiper-slide-thumb-active div {
    border-color: #000000;
  }
`;

export { styles as detailsPageImageSliderStyles };
