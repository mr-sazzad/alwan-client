"use client";

import { useGetAllCarouselsQuery } from "@/redux/api/carousel/carouselApi";
import Image from "next/image";
import { useState } from "react";
import { PiSpinner } from "react-icons/pi";
import { Skeleton } from "./ui/skeleton";

// Helper function to get Cloudinary blur placeholder URL
const getBlurPlaceholder = (url: string) => {
  console.log(url);
  return url.replace("/upload/", "/upload/w_100,e_blur:1000,q_auto,f_auto/");
};

const Banner = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllCarouselsQuery(undefined);

  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  if (isLoading) {
    return (
      <div className="mt-[90px] w-full h-[80vh] relative">
        <Skeleton className="w-full h-full">
          <div className="absolute inset-0 flex justify-center items-center">
            <PiSpinner className="w-5 h-5 animate-spin" />
          </div>
        </Skeleton>
      </div>
    );
  }

  if (isError || !response?.data || response.data.length === 0) {
    return (
      <div className="mt-[90px] w-full text-center text-gray-500">
        <p>Failed to load banner image.</p>
      </div>
    );
  }

  const image = response.data[0].fileUrls[0];
  const blurDataURL = getBlurPlaceholder(image);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setAspectRatio(img.naturalWidth / img.naturalHeight);
  };

  return (
    <div className="mt-[90px] w-full">
      <div className="mt-[90px] w-full h-[600px] relative">
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
