"use client";

import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { useGetAllCarouselsQuery } from "../redux/api/carousel/carouselApi";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";

const MOBILE_ASPECT_RATIO = 207 / 250;
const DEFAULT_DESKTOP_ASPECT_RATIO = 72 / 25;

const Banner = () => {
  const { data: response, isLoading, isError } = useGetAllCarouselsQuery({});

  const [isDesktopImageLoaded, setIsDesktopImageLoaded] = useState(false);
  const [isMobileImageLoaded, setIsMobileImageLoaded] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const desktopImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      if (desktopImageRef.current && !isMobile) {
        const aspectRatio =
          desktopImageRef.current.naturalWidth /
          desktopImageRef.current.naturalHeight;
        setContainerHeight(width / aspectRatio);
      } else {
        setContainerHeight(
          width /
            (isMobile ? MOBILE_ASPECT_RATIO : DEFAULT_DESKTOP_ASPECT_RATIO)
        );
      }
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

  const handleDesktopImageLoad = () => {
    setIsDesktopImageLoaded(true);
    if (desktopImageRef.current) {
      const aspectRatio =
        desktopImageRef.current.naturalWidth /
        desktopImageRef.current.naturalHeight;
      setContainerHeight(window.innerWidth / aspectRatio);
    }
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
          ref={desktopImageRef}
          src={desktopImage || "/placeholder.svg"}
          alt="Desktop Banner Image"
          fill
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-opacity duration-700",
            isDesktopImageLoaded ? "opacity-100" : "opacity-0"
          )}
          priority
          onLoad={handleDesktopImageLoad}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
        />
        {/* Mobile Image (if available) */}
        {mobileImage && (
          <Image
            src={mobileImage || "/placeholder.svg"}
            alt="Mobile Banner Image"
            fill
            sizes="100vw"
            className={cn(
              "object-cover object-center transition-opacity duration-700 md:hidden",
              isMobileImageLoaded ? "opacity-100" : "opacity-0"
            )}
            priority
            onLoad={handleMobileImageLoad}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
          />
        )}
      </div>
    </div>
  );
};

// Helper function to generate SVG
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

// Helper function to convert SVG to Base64
const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default Banner;
