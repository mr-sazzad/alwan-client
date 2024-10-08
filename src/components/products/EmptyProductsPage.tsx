"use client";

import Image from "next/image";
import Link from "next/link";
import notFoundSvg from "../../images/product-not-found.svg";
import { Button } from "../ui/button";

const EmptyProductsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full mt-[90px]">
      <Image
        src={notFoundSvg}
        alt="No Products Found"
        height={100}
        width={100}
      />
      <h2 className="text-xl font-medium mb-2">Not Found</h2>
      <p className="text-center text-gray-600 mb-2">
        We can&apos;t find any products matching your filters.
      </p>
      <p className="text-center text-gray-600 mb-2">
        Please reset your filters and try again.
      </p>

      <Button variant="link" asChild>
        <Link href="/">Reset Filters</Link>
      </Button>
    </div>
  );
};

export default EmptyProductsPage;
