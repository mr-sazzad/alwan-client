"use clint";

import Loading from "@/app/loading";
import { useGetAllCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { Category } from "@/types";
import { useState } from "react";
import { convertCategories } from "../utils/convert-categories";
import Sidebar from "./sidebar";

const SheetComponent = () => {
  const { data, isLoading } = useGetAllCategoriesQuery(undefined);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  const handleBack = () => {
    console.log("BREADCRUMB =>", breadcrumb);
    if (breadcrumb.length > 0) {
      const newBreadcrumb = [...breadcrumb];
      newBreadcrumb.pop();
      setBreadcrumb(newBreadcrumb);

      const parentCategoryId =
        newBreadcrumb.length > 0
          ? newBreadcrumb[newBreadcrumb.length - 1]
          : null;
      const parentCategory = data.find(
        (category: Category) => category.id === parentCategoryId
      );
      setCurrentCategory(parentCategory || null);
    } else {
      setCurrentCategory(null);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const convertedCategories = convertCategories(data);

  const handleCategorySelect = (category: Category) => {
    setCurrentCategory(category);
    setBreadcrumb((prev) => [...prev, category.id]);
  };

  return (
    <>
      <Sidebar
        categories={convertedCategories}
        onBack={handleBack}
        onCategorySelect={handleCategorySelect}
        backButtonText={
          breadcrumb.length > 1 ? breadcrumb[breadcrumb.length - 2] : "Back"
        }
        currentCategory={currentCategory}
      />
    </>
  );
};

export default SheetComponent;
