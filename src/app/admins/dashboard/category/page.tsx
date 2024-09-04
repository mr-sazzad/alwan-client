"use client";

import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import CategoryDrawer from "@/components/categories/category-drawer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { useState } from "react";
import CategoryTableColumns from "./category-columns";

const Category = () => {
  const [open, setOpen] = useState(false);

  const { data: categories, isLoading } = useGetCategoriesQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="w-[200px] h-7" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="ml-auto w-[150px] h-10" />
        <div className="flex justify-between gap-2">
          <Skeleton className="md:w-[250px] w-full h-10" />
          <Skeleton className="w-[100px] h-10" />
        </div>
        <Skeleton className="w-full h-[40vh]" />
      </div>
    );
  }

  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Category"
        className="mb-3"
      />
      <PageTitle title="Category" description="Category information" />

      <div className="flex justify-end items-center mt-5">
        <Button variant="link" size="sm" onClick={() => setOpen(true)}>
          Create Category
        </Button>
      </div>

      <div>
        {categories?.data && (
          <CategoryTableColumns categories={categories?.data} />
        )}
      </div>
      <CategoryDrawer
        open={open}
        setOpen={setOpen}
        categories={categories.data}
        mode="create"
      />
    </div>
  );
};

export default Category;
