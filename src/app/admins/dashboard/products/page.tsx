"use client";

import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import ProductTableColumns from "./product-columns";

import { DataTable } from "@/components/admins/dashboard/products/data-table";
import ProductForm from "@/components/admins/dashboard/products/product-form";
import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { HiOutlineSquaresPlus } from "react-icons/hi2";

const Page = () => {
  const { data: response, isLoading } = useGetAllProductsQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = ProductTableColumns();

  if (isLoading) {
    return <AdminDashboardLoading />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="flex gap-1 items-center">
              <HiOutlineSquaresPlus /> Add a new product
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
