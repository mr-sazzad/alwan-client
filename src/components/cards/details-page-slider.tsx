"use client";

import Image from "next/image";
import React, { useState } from "react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface DetailsPageImageSliderProps {
  urls: string[];
}

const DetailsPageImageSlider: React.FC<DetailsPageImageSliderProps> = ({
  urls,
}) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  return (
    <div className="group relative aspect-square rounded-t w-full h-full">
      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: swiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="main-swiper"
      >
        {urls.map((url, index) => (
          <SwiperSlide key={index}>
            <Image
              src={url}
              alt={`Slide ${index}`}
              width={1400}
              height={1400}
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mt-[10px]"
      >
        {urls.map((url, index) => (
          <SwiperSlide key={index}>
            <Image
              src={url}
              alt={`Thumbnail ${index}`}
              width={500}
              height={500}
              objectFit="cover"
              className="cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailsPageImageSlider;
