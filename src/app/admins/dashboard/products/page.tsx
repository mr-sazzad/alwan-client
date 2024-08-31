"use client";

import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import ProductTableColumns from "./product-columns";

import { DataTable } from "@/components/admins/dashboard/products/data-table";
import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
import Link from "next/link";
import { HiOutlineSquaresPlus } from "react-icons/hi2";

const Page = () => {
  const { data: response, isLoading } = useGetAllProductsQuery(undefined);
  const columns = ProductTableColumns();

  if (isLoading) {
    return <AdminDashboardLoading />;
  }

  console.log("🚀 =>", response.data);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end">
        <Link href="/admins/dashboard/products/add-new">
          <Button variant="link" className="flex gap-1 items-center">
            <HiOutlineSquaresPlus /> Add a new product
          </Button>
        </Link>
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
