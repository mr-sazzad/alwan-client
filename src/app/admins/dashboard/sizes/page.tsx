"use client";
import React, { useState } from "react";
import PageTitle from "../../../../components/admins/dashboard/page-titles/page-title";
import SizeDrawer from "../../../../components/admins/dashboard/sizes/size-drawer";
import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
import AdminColorSkeleton from "../../../../components/skeletons/admin-color-skeleton";
import { Button } from "../../../../components/ui/button";
import { useGetAllSizesQuery } from "../../../../redux/api/size/size-api";
import SizeTableColumns from "./size-columns";

const Size = () => {
  const { data: sizes, isLoading } = useGetAllSizesQuery(undefined);
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
        page="Size"
        className="mb-3"
      />
      <PageTitle title="Size" description="Size information" />
      <div className="flex justify-end mt-3">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Add New Size
        </Button>
      </div>
      <SizeTableColumns sizes={sizes.data} />
      <SizeDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default Size;
