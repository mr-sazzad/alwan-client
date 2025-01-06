"use client";
import React, { useState } from "react";
import CreateColorDrawer from "../../../../components/admins/dashboard/color/create-color-drawer";
import PageTitle from "../../../../components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
import AdminColorSkeleton from "../../../../components/skeletons/admin-color-skeleton";
import { Button } from "../../../../components/ui/button";
import { useGetAllColorsQuery } from "../../../../redux/api/color/color-api";
import ColorTableColumns from "./color-columns";

const Color = () => {
  const [open, setOpen] = useState(false);
  const { data: colors, isLoading } = useGetAllColorsQuery(undefined);

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
        page="Colors"
        className="my-3"
      />
      <PageTitle title="Color" description="Color information" />

      <div className="flex justify-end mt-3">
        <Button
          variant="outline"
          className="flex items-center"
          onClick={() => setOpen(true)}
        >
          Add New Color
        </Button>
      </div>

      <CreateColorDrawer open={open} setOpen={setOpen} />
      <ColorTableColumns colors={colors.data} />
    </div>
  );
};

export default Color;
