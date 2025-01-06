"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { useGetCategoriesQuery } from "../../redux/api/categoies/categoriesApi";
import { Button } from "../ui/button";

interface ICategory {
  id: string;
  name: string;
  firstTitle: string;
  secondTitle: string;
  imageUrl: string;
  isOnHomePage: boolean;
  isLeaf: boolean;
}

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
};

const HomeCategories = () => {
  const { data: categoriesRes, isLoading } = useGetCategoriesQuery(undefined);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (categoriesRes?.data) {
      const filteredCategories = categoriesRes.data
        .filter(
          (category: ICategory) => category.isOnHomePage && category.isLeaf
        )
        .slice(0, 2);

      if (filteredCategories.length === 1) {
        setCategories([
          filteredCategories[0],
          { ...filteredCategories[0], id: `${filteredCategories[0].id}-copy` },
        ]);
      } else {
        setCategories(filteredCategories);
      }
    }
  }, [categoriesRes]);

  return (
    <section className="mt-10 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {isLoading
          ? Array(2)
              .fill(0)
              .map((_, index) => <CategorySkeleton key={index} />)
          : categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                className={index === 1 ? "hidden md:block" : ""}
              />
            ))}
      </div>
    </section>
  );
};

const CategoryCard = ({
  category,
  className = "",
}: {
  category: ICategory;
  className?: string;
}) => (
  <div className="relative overflow-hidden shado">
    <Image
      alt={category.name}
      src={category.imageUrl}
      height={1000}
      width={1400}
      className="object-cover w-full"
    />
    <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start space-y-2 text-white">
      <p className="text-sm -mb-1">{category.secondTitle}</p>
      <h3 className="text-2xl">{category.firstTitle}</h3>
      <Button
        size="sm"
        className="rounded-full px-6 bg-white text-black hover:bg-white/90"
        asChild
      >
        <Link href={`categories/${category.id}`}>Shop</Link>
      </Button>
    </div>
  </div>
);

const CategorySkeleton = () => (
  <div className="relative overflow-hidden shadow rounded-none">
    <Skeleton className="w-full h-[400px] md:h-[600px]" />
    <div className="absolute bottom-6 left-6 right-6 space-y-2">
      <Skeleton className="h-8 w-1/3 rounded" />
      <Skeleton className="h-4 w-1/4 rounded" />
      <Skeleton className="h-9 w-32 rounded" />
    </div>
  </div>
);

export default HomeCategories;
