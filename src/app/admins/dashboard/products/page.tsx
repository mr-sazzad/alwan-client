"use client";

import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import ProductTableColumns from "./product-columns";

import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import { DataTable } from "@/components/admins/dashboard/products/data-table";
import ProductForm from "@/components/admins/dashboard/products/product-form";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AdminColorSkeleton from "@/components/skeletons/admin-color-skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Box } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const { data: response, isLoading } = useGetAllProductsQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = ProductTableColumns();

  if (isLoading) {
    return <AdminColorSkeleton />;
  }

  console.log(response);

  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
        ]}
        page="Products"
        className="my-3"
      />
      <PageTitle title="Products" description="Products information" />

      <div className="flex justify-end mt-3">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-1 items-center">
              <Box className="w-4 h-4" /> Add a new product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <div className="h-[85vh] overflow-y-auto hide-scrollbar mt-5 px-1">
              <ProductForm mode="create" setOpen={setIsModalOpen} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {!isLoading && response?.data && (
        <DataTable
          columns={columns}
          data={response?.data}
          filterColumn="name"
        />
      )}
    </div>
  );
};

export default Page;
