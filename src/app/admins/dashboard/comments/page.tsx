"use client";

import SearchReviewsDrawer from "@/components/admins/dashboard/comments/search-reviews-drawer";
import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { useState } from "react";

const Comments = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(undefined);

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  if (isCategoriesLoading) {
    return <AdminDashboardLoading />;
  }

  const handleProductReviewSearch = () => {
    setOpen(true);
  };

  console.log("CCC => ", categories.data);

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
        <Button variant="outline" onClick={handleProductReviewSearch}>
          Search Product Reviews
        </Button>
      </div>

      <SearchReviewsDrawer
        open={open}
        setOpen={setOpen}
        categories={categories.data}
        setProductId={setProductId}
      />
    </div>
  );
};

export default Comments;
