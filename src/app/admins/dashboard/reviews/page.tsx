"use client";

import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import SearchReviewsDrawer from "@/components/admins/dashboard/reviews/search-reviews-drawer";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { IProduct } from "@/types";
import { useState } from "react";

const Reviews = () => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(undefined);

  const [open, setOpen] = useState(false);

  console.log("SELECTED PRODUCT =>", selectedProduct);

  if (isCategoriesLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="w-[200px] h-7" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="ml-auto w-[200px] h-10" />
        <Skeleton className="w-full h-[30vh]" />
      </div>
    );
  }

  const handleProductReviewSearch = () => {
    setOpen(true);
  };

  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Reviews"
        className="my-3"
      />

      <PageTitle title="Reviews" description="User Reviews information" />

      <div className="flex justify-end my-3">
        <Button variant="secondary" onClick={handleProductReviewSearch}>
          Search Product Reviews
        </Button>
      </div>

      <SearchReviewsDrawer
        open={open}
        setOpen={setOpen}
        categories={categories?.data || []}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
};

export default Reviews;
