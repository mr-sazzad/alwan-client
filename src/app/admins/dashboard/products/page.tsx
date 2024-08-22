"use client";

import { DataTable } from "@/components/admins/dashboard/products/data-table";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import ProductTableColumns from "./product-columns";

import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
import Link from "next/link";
import { HiOutlineSquaresPlus } from "react-icons/hi2";

const Page = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);
  const columns = ProductTableColumns();

  if (isLoading) {
    return <AdminDashboardLoading />;
  }

  console.log("PRODUCTS =>", products.data);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end">
        <Link href="/admins/dashboard/products/add-new">
          <Button variant="link" className="flex gap-1 items-center">
            <HiOutlineSquaresPlus /> Add a new product
          </Button>
        </Link>
      </div>
      {!isLoading && products && (
        <DataTable
          columns={columns}
          data={products?.data}
          filterColumn="name"
        />
      )}
    </div>
  );
};

export default Page;
