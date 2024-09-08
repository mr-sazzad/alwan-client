"use client";

import { useGetAllCarouselsQuery } from "@/redux/api/carousel/carouselApi";
import Image from "next/image";
import { useState } from "react";
import { PiSpinner } from "react-icons/pi";
import { Skeleton } from "./ui/skeleton";

// Helper function to get Cloudinary blur placeholder URL
const getBlurPlaceholder = (url: string) => {
  return url.replace("/upload/", "/upload/w_100,e_blur:1000,q_auto,f_auto/");
};

const Banner = () => {
  const { data: response, isLoading } = useGetAllCarouselsQuery(undefined);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  if (isLoading) {
    return (
      <div className="mt-[90px] w-full">
        <Skeleton className="w-full h-[80vh] md:h-[70vh] lg:h-[79vh]">
          <div className="w-full h-full flex justify-center items-center">
            <PiSpinner className="w-5 h-5 animate-spin" />
          </div>
        </Skeleton>
      </div>
    );
  }

  if (!response?.data || response.data.length === 0) {
    return null;
  }

  const image = response.data[0].fileUrls[0];
  const blurDataURL = getBlurPlaceholder(image);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setAspectRatio(img.naturalWidth / img.naturalHeight);
  };

  return (
    <div className="mt-[90px] w-full">
      <div
        className="relative w-full"
        style={{ paddingBottom: `${100 / aspectRatio}%` }}
      >
        <Image
          src={image}
          alt="Banner Image"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          onLoad={handleImageLoad}
          placeholder="blur"
          blurDataURL={blurDataURL}
          quality={100}
        />
      </div>
    </div>
  );
};

export default Banner;
