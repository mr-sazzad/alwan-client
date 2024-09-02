"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { useGetAllCarouselsQuery } from "@/redux/api/carousel/carouselApi";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Skeleton } from "./ui/skeleton";

interface CarouselSliderProps {
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
}

export default function Carousel({ images }: CarouselSliderProps) {
  const { data: response, isLoading } = useGetAllCarouselsQuery(undefined);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="w-full md:h-[68vh] sm:h-[40vh] h-[30vh]" />
      </div>
    );
  }

  console.log("RESPONSE =>", response);

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
        className="md:h-[68vh] sm:h-[40vh] h-[30vh] w-full"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} className="bg-center bg-contain">
            <Image
              fill
              src={image.src}
              alt={image.alt}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
