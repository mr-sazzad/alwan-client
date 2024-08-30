"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const NewArrivals = () => {
  return (
    <div>
      <div className="mt-10 mb-6 w-full flex flex-col gap-3 items-center">
        <h2 className="text-4xl font-extrabold">New This Month</h2>
        <Button
          className="rounded-full text-[17px] font-medium capitalize"
          asChild
        >
          <Link href="/new-arrivals">Shop new arrivals</Link>
        </Button>
      </div>

      <div className="flex flex-wrap justify-start">
        <Image
          src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_796,c_limit/e2f836f7-0cf7-4548-9202-c1992b443698/nike-just-do-it.jpg"
          alt="new-arrivals-image"
          height={559}
          width={1035}
        />
      </div>
    </div>
  );
};

export default NewArrivals;
