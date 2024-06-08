"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

interface CarouselSliderProps {
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
}

export default function Carousel({ images }: CarouselSliderProps) {
  return (
    <div className="mt-[90px]">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="md:h-[68vh] sm:h-[40vh] h-[23vh] w-full"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} className="bg-center bg-contain">
            <Image fill src={image.src} alt={image.alt} objectFit="cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
