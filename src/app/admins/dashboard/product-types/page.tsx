"use client";

import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import CreateProductType from "@/components/admins/dashboard/product-types/create-product-type";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
import { Button } from "@/components/ui/button";
import { useGetAllProductTypesQuery } from "@/redux/api/product-types/product-types-api";
import { useState } from "react";
import ProductTypeColumns from "./product-type-columns";

const ProductType = () => {
  const { data: productTypes, isLoading } =
    useGetAllProductTypesQuery(undefined);

  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <AdminDashboardLoading />;
  }
  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Product Type"
        className="mb-3"
      />
      <PageTitle title="Product Type" description="Product Type information" />

      <div className="flex justify-end mt-3">
        <Button variant="link" onClick={() => setOpen(true)}>
          Create Product Type
        </Button>
      </div>

      <ProductTypeColumns productTypes={productTypes.data} />
      <CreateProductType open={open} setOpen={setOpen} />
    </div>
  );
};

export default ProductType;
