"use client";

import MaxWidth from "@/components/max-width";
import { BiMeteor } from "react-icons/bi";

const Categories = () => {
  return (
    <MaxWidth className="mt-[100px]">
      <div className="flex justify-center items-center w-full h-[40vh]">
        <div className="flex flex-col items-center gap-5">
          <BiMeteor size={35} />
          <h1 className="text-xl font-semibold text-center">
            THE PAGE YOU ARE LOOKING FOR IS NO LONGER AVAILABLE
          </h1>
        </div>
      </div>
    </MaxWidth>
  );
};

export default Categories;
