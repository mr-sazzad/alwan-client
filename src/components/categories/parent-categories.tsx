"use client";

import { useGetParentCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { useCategories } from "@/static/deleteable-data/categories";
import Image from "next/image";
import { Button } from "../ui/button";

// Icons

const ParentCategories = () => {
  const { data: parentCategories, isLoading } =
    useGetParentCategoriesQuery(undefined);

  const categories = useCategories();

  return (
    <div className="mt-5">
      <div className="flex flex-row flex-wrap w-full">
        {categories.map((category: any) => (
          <div
            key={category.id}
            className="flex flex-start flex-col gap-2 items-center sm:w-[50%] relative bg-green-500"
          >
            <Image
              alt="image"
              src={category.image}
              height={1000}
              width={1440}
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5">
              <p className="text-base font-medium text-white">
                {category.desc}
              </p>
              <p className="text-lg font-bold text-white">{category.name}</p>
              <Button variant="black" size="sm" className="rounded-full px-5">
                Shop
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentCategories;
