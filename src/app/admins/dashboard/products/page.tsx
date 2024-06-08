"use client";

import Loading from "@/app/loading";
import { DataTable } from "@/components/admins/dashboard/products/data-table";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import ProductTableColumns from "./product-columns";

import Link from "next/link";
import { HiOutlineSquaresPlus } from "react-icons/hi2";

const Page = () => {
  const { data, isLoading } = useGetAllProductsQuery(undefined);
  const columns = ProductTableColumns();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end">
        <Link href="/admins/dashboard/products/add-new">
          <Button variant="link" className="flex gap-1 items-center">
            <HiOutlineSquaresPlus /> Add a new product
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
