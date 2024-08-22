"use client";

import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import CreateCagegoryDrawer from "@/components/categories/create-category-drawer";
import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { useState } from "react";
import CategoryTableColumns from "./category-columns";

const Category = () => {
  const [open, setOpen] = useState(false);

  const { data: categories, isLoading } = useGetAllCategoriesQuery(undefined);

  if (isLoading) {
    return (
      <div className="w-full h-full justify-center items-center">
        <AdminDashboardLoading />
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
        {categories.data && (
          <CategoryTableColumns categories={categories.data} />
        )}
      </div>
      <CreateCagegoryDrawer
        open={open}
        setOpen={setOpen}
        categories={categories.data}
      />
    </div>
  );
};

export default Category;
