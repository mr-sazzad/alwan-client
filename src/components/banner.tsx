"use client";

import { cn } from "@/lib/utils";
import { useGetAllCarouselsQuery } from "@/redux/api/carousel/carouselApi";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";

const DESKTOP_ASPECT_RATIO = 72 / 25;
const MOBILE_ASPECT_RATIO = 207 / 250;

const getBlurPlaceholder = (url: string) => {
  return url.replace("/upload/", "/upload/w_100,e_blur:1000,q_auto,f_auto/");
};

const Banner = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllCarouselsQuery(undefined);

  const [isDesktopImageLoaded, setIsDesktopImageLoaded] = useState(false);
  const [isMobileImageLoaded, setIsMobileImageLoaded] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Adjust this breakpoint as needed
      setContainerHeight(
        width / (isMobile ? MOBILE_ASPECT_RATIO : DESKTOP_ASPECT_RATIO)
      );
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isMobile]);

  if (isLoading) {
    return (
      <div
        className="relative w-full mt-[90px]"
        style={{ height: `${containerHeight}px` }}
      >
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60" />
      </div>
    );
  }

  if (isError || !response?.data || response.data.length === 0) {
    return (
      <div className="w-full px-4 py-8 md:py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unable to load banner image. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const desktopImage = response.data[0].fileUrls[0];
  const mobileImage = response.data[0].fileUrls[1];
  const desktopBlurDataURL = getBlurPlaceholder(desktopImage);
  const mobileBlurDataURL = getBlurPlaceholder(mobileImage);

  const handleDesktopImageLoad = () => {
    setIsDesktopImageLoaded(true);
  };

  const handleMobileImageLoad = () => {
    setIsMobileImageLoaded(true);
  };

  return (
    <div
      className="relative w-full overflow-hidden mt-[90px]"
      style={{ height: `${containerHeight}px` }}
    >
      <div className="relative h-full w-full">
        {/* Desktop Image */}
        <Image
          src={desktopImage}
          alt="Desktop Banner Image"
          fill
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-all duration-700 hidden md:block",
            isDesktopImageLoaded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          )}
          priority
          onLoad={handleDesktopImageLoad}
          placeholder="blur"
          blurDataURL={desktopBlurDataURL}
          quality={100}
        />
        {/* Mobile Image */}
        <Image
          src={mobileImage}
          alt="Mobile Banner Image"
          fill
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-all duration-700 md:hidden",
            isMobileImageLoaded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          )}
          priority
          onLoad={handleMobileImageLoad}
          placeholder="blur"
          blurDataURL={mobileBlurDataURL}
          quality={100}
        />
      </div>
    </div>
  );
};

export default Banner;
