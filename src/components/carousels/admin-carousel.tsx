"use client";

import Image from "next/image";
import { useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Skeleton } from "../ui/skeleton";

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

interface AdminCarouselProps {
  images: CarouselImage[];
}

const AUTOPLAY_DELAY = 3000;
const CAROUSEL_HEIGHT = "30vh";

export default function AdminCarousel({ images }: AdminCarouselProps) {
  const [isLoading, setIsLoading] = useState(true);

  const swiperParams: SwiperOptions = {
    spaceBetween: 0,
    effect: "fade",
    autoplay: {
      delay: AUTOPLAY_DELAY,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    modules: [Autoplay, EffectFade, Navigation, Pagination],
  };

  if (images.length === 0) {
    return (
      <div className="h-[30vh] w-full bg-gray-200 flex items-center justify-center">
        No images available
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height: CAROUSEL_HEIGHT }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      <Swiper {...swiperParams} className="h-full w-full">
        {images.map((image) => (
          <SwiperSlide key={image.id} className="relative w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                priority={image.id === 0}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
