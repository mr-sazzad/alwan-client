"use client";

import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { Button } from "../ui/button";

const NewArrivals = () => {
  return (
    <Link href="/new-arrivals">
      <div>
        <div className="mt-10 mb-6 w-full flex flex-col gap-3 items-center">
          <h2 className="text-4xl font-extrabold">New This Month</h2>
          <Button className="rounded-full text-[17px] font-medium capitalize group transition-all duration-300">
            Shop new arrivals
            <LuArrowUpRight
              size={30}
              className="ml-2 group-hover:rotate-45 group-hover:ml-5 group-hover:bg-white group-hover:text-black transition-all duration-300 ease-in-out rounded-full"
            />
          </Button>
        </div>

        <div className="w-full relative rounded overflow-hidden">
          <Image
            src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1835,c_limit/9cb2d651-5e7f-492f-95b3-95b62954226c/nike-just-do-it.jpg"
            alt="new-arrivals-image"
            width={1920}
            height={1080}
            sizes="100vw"
            className="hidden sm:block w-full h-auto"
            priority
          />

          <Image
            src="https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/w_390,c_limit/1eb01fb7-b8eb-46e7-a785-4494a7a3ac17/nike-just-do-it.jpg"
            alt="new-arrivals-image-mobile"
            width={390}
            height={500}
            sizes="100vw"
            className="sm:hidden w-full h-auto"
            priority
          />
        </div>
      </div>
    </Link>
  );
};

export default NewArrivals;
