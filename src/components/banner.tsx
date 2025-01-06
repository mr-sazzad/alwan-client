"use client";

import { AlertCircle } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { useGetAllCarouselsQuery } from "../redux/api/carousel/carouselApi";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";

const DESKTOP_ASPECT_RATIO = 72 / 25;
const MOBILE_ASPECT_RATIO = 207 / 250;

const getBlurPlaceholder = (url: string | undefined) => {
  if (!url) return "";
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
      setIsMobile(width < 768);
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
      <div className="w-full px-4 py-8 md:py-12 lg:py-16 mt-[90px]">
        <div className="mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="mb-2">Error Loading Banner</AlertTitle>
            <AlertDescription>
              We encountered an issue while trying to load the banner image.
              This could be due to a network problem or a temporary server
              issue.
            </AlertDescription>
          </Alert>

          <div className="text-center">
            <p className="mt-4 text-sm text-muted-foreground">
              If the problem persists, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const desktopImage = response.data[0]?.fileUrls[0];
  const mobileImage = response.data[0]?.fileUrls[1];
  const desktopBlurDataURL = getBlurPlaceholder(desktopImage);
  const mobileBlurDataURL = getBlurPlaceholder(mobileImage || desktopImage);

  const handleDesktopImageLoad = () => {
    setIsDesktopImageLoaded(true);
  };

  const handleMobileImageLoad = () => {
    setIsMobileImageLoaded(true);
  };

  if (!desktopImage) {
    return (
      <div className="w-full px-4 py-8 md:py-12 lg:py-16 mt-[90px]">
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Error Loading Banner</AlertTitle>
          <AlertDescription>
            We couldn&apos;t load the banner images. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden mt-[90px]"
      style={{ height: `${containerHeight}px` }}
    >
      <div className="relative h-full w-full">
        {/* Desktop Image */}
        <Image
          src={desktopBlurDataURL}
          alt="Desktop Banner Image (Blurred)"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <Image
          src={desktopImage}
          alt="Desktop Banner Image"
          fill
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-opacity duration-700",
            isDesktopImageLoaded ? "opacity-100" : "opacity-0"
          )}
          priority
          onLoad={handleDesktopImageLoad}
        />
        {/* Mobile Image (if available) */}
        {mobileImage && (
          <>
            <Image
              src={mobileBlurDataURL}
              alt="Mobile Banner Image (Blurred)"
              fill
              sizes="100vw"
              className="object-cover object-center md:hidden"
              priority
            />
            <Image
              src={mobileImage}
              alt="Mobile Banner Image"
              fill
              sizes="100vw"
              className={cn(
                "object-cover object-center transition-opacity duration-700 md:hidden",
                isMobileImageLoaded ? "opacity-100" : "opacity-0"
              )}
              priority
              onLoad={handleMobileImageLoad}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
