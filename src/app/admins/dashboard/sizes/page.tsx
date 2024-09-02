"use client";

import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import CreateSize from "@/components/admins/dashboard/sizes/create-size";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
import { Button } from "@/components/ui/button";
import { useGetAllSizesQuery } from "@/redux/api/size/size-api";
import { useState } from "react";
import SizeTableColumns from "./size-columns";

const Size = () => {
  const { data: sizes, isLoading } = useGetAllSizesQuery(undefined);
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
        page="Size"
        className="mb-3"
      />
      <PageTitle title="Size" description="Size information" />
      <div className="flex justify-end mt-3">
        <Button variant="link" onClick={() => setOpen(true)}>
          Add New Size
        </Button>
      </div>
      <SizeTableColumns sizes={sizes.data} />
      <CreateSize open={open} setOpen={setOpen} />
    </div>
  );
};

export default Size;
