import Image from "next/image";
import React from "react";

interface newArrivalsBannerProps {
  bannerImage: {
    id: number;
    src: string;
    alt: string;
  };
}

const Banner = ({ bannerImage }: newArrivalsBannerProps) => {
  return (
    <div className="">
      <Image
        src={bannerImage.src}
        alt={bannerImage.alt}
        width={6003}
        height={2001}
        className="object-cover rounded"
      />
    </div>
  );
};

export default Banner;
