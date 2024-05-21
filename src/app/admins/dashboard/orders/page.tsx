"use client";

import Loading from "@/app/loading";
import { DataTable } from "@/components/admins/dashboard/products/product-table";
import OrderTableColumns from "./orders-column";
import { useGetAllOrdersQuery } from "@/redux/api/orders/ordersApi";

const Page = () => {
  const { data, isLoading } = useGetAllOrdersQuery(undefined);
  const columns = OrderTableColumns();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
