"use client";

import { useGetAllCarouselsQuery } from "@/redux/api/carousel/carouselApi";
import Image from "next/image";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "./ui/skeleton";

// Import Swiper styles
import { PiSpinner } from "react-icons/pi";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel() {
  const { data: response, isLoading } = useGetAllCarouselsQuery(undefined);

  if (isLoading) {
    return (
      <div className="mt-[90px] w-full">
        <Skeleton className="w-full h-[300px] md:h-[400px] lg:h-[700px]">
          <div className="w-full h-full flex justify-center items-center">
            <PiSpinner className="animate-spin" />
          </div>
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="mt-[90px] w-full overflow-hidden">
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="w-screen"
      >
        {response?.data[0] &&
          response?.data[0].fileUrls.map((url: string, i: number) => (
            <SwiperSlide key={i} className="w-full">
              <div className="relative w-full h-[300px] md:h-[500px] lg:h-[700px] max-h-[80vh] bg-green-500">
                <Image
                  fill
                  src={url}
                  alt={`carouselImage-${i}`}
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
