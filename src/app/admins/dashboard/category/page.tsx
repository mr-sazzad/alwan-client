"use client";

import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import CategoryDrawer from "@/components/categories/category-drawer";
import AdminsCategorySkeleton from "@/components/skeletons/admins-category-skeleton";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { Upload } from "lucide-react";
import { useState } from "react";
import CategoryTableColumns from "./category-columns";

const Category = () => {
  const [open, setOpen] = useState(false);

  const { data: categories, isLoading } = useGetCategoriesQuery(undefined);

  if (isLoading) {
    return <AdminsCategorySkeleton />;
  }

  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Category"
        className="my-3"
      />
      <PageTitle title="Category" description="Category information" />

      <div className="flex justify-end items-center mt-5">
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          <Upload className="w-4 h-4 mr-2" />
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
