"use client";

import { useGetCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { Category } from "@/types";
import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function SheetComponent() {
  const [open, setOpen] = useState(false);
  const { data: response, isLoading } = useGetCategoriesQuery(undefined);
  const [categoryStack, setCategoryStack] = useState<Category[]>([]);

  if (isLoading) {
    return <Skeleton className="h-10 w-10" />;
  }

  const convertCategories = (categories: Category[]): Category[] => {
    const categoryMap: { [key: string]: Category } = {};

    categories.forEach((category) => {
      categoryMap[category.id] = { ...category, subCategories: [] };
    });

    const nestedCategories: Category[] = [];

    categories.forEach((category) => {
      if (category.parentId) {
        const parentCategory = categoryMap[category.parentId];
        if (parentCategory) {
          parentCategory.subCategories!.push(categoryMap[category.id]);
        }
      } else {
        nestedCategories.push(categoryMap[category.id]);
      }
    });

    return nestedCategories;
  };

  const convertedCategories =
    response?.data && convertCategories(response?.data);

  const handleCategorySelect = (category: Category) => {
    setCategoryStack((prev) => [...prev, category]);
  };

  const handleBack = () => {
    setCategoryStack((prev) => prev.slice(0, -1));
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="ghost" size="icon">
        <HiOutlineMenuAlt1 size={20} />
      </Button>

      {/* <Sidebar
        open={open}
        setOpen={setOpen}
        categories={convertedCategories}
        onBack={handleBack}
        onCategorySelect={handleCategorySelect}
        categoryStack={categoryStack}
      /> */}
    </>
  );
}
