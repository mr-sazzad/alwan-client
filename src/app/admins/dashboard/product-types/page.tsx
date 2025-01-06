"use client";
import React, { useState } from "react";
import PageTitle from "../../../../components/admins/dashboard/page-titles/page-title";
import ProductTypeDrawer from "../../../../components/admins/dashboard/product-types/product-type-drawer";
import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
import AdminColorSkeleton from "../../../../components/skeletons/admin-color-skeleton";
import { Button } from "../../../../components/ui/button";
import { useGetProductTypesQuery } from "../../../../redux/api/product-types/product-types-api";
import ProductTypeColumns from "./product-type-columns";

const ProductType = () => {
  const { data: productTypes, isLoading } = useGetProductTypesQuery(undefined);

  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <AdminColorSkeleton />;
  }
  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Product Type"
        className="my-3"
      />
      <PageTitle title="Product Type" description="Product Type information" />

      <div className="flex justify-end mt-3">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Create Product Type
        </Button>
      </div>

      <ProductTypeColumns productTypes={productTypes.data} />
      <ProductTypeDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default ProductType;
