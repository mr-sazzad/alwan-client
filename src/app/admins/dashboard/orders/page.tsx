"use client";

import Loading from "@/app/loading";
import { DataTable } from "@/components/admins/dashboard/products/data-table";
import { useGetAllOrdersQuery } from "@/redux/api/orders/ordersApi";
import OrderTableColumns from "./orders-column";

const Page = () => {
  const { data: response, isLoading } = useGetAllOrdersQuery(undefined);
  const columns = OrderTableColumns();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={response?.data} />
    </div>
  );
};

export default Page;
