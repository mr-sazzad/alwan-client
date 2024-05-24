"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import notFoundSvg from "../../images/product-not-found.svg";
import { Button } from "../ui/button";

const EmptyProductsPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Image
        src={notFoundSvg}
        alt="No Products Found"
        height={100}
        width={100}
      />
      <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
      <p className="text-center text-gray-600 mb-2">
        We can&apos;t find any products matching your filters.
      </p>
      <p className="text-center text-gray-600 mb-2">
        Please reset your filters and try again.
      </p>

      <Button variant="link" onClick={() => router.push("/")}>
        Back to home
      </Button>
    </div>
  );
};

export default EmptyProductsPage;
