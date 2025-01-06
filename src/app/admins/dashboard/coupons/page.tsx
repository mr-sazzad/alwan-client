"use client";
import React, { useState } from "react";
import { z } from "zod";
import CouponForm from "../../../../components/admins/dashboard/coupons/coupon-form";
import PageTitle from "../../../../components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
import AdminColorSkeleton from "../../../../components/skeletons/admin-color-skeleton";
import { Button } from "../../../../components/ui/button";
import { useGetLeafCategoriesQuery } from "../../../../redux/api/categoies/categoriesApi";
import {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
} from "../../../../redux/api/coupon/couponApi";
import { useGetAllProductsQuery } from "../../../../redux/api/products/productsApi";
import { CouponSchema } from "../../../../schemas/admins/coupon-schema";
import CouponTableColumns from "./coupon-table";

const Coupon = () => {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<
    z.infer<typeof CouponSchema> | undefined
  >(undefined);

  const { data: response, isLoading } = useGetCouponsQuery(undefined);
  const { data: categoryRes, isLoading: categoryLoading } =
    useGetLeafCategoriesQuery(undefined);
  const { data: productRes, isLoading: productLoading } =
    useGetAllProductsQuery(undefined);
  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  if (isLoading || categoryLoading || productLoading) {
    return <AdminColorSkeleton />;
  }

  const handleCreateCoupon = () => {
    setIsUpdating(false);
    setSelectedCoupon(undefined);
    setOpen(true);
  };

  const handleUpdateCoupon = (coupon: z.infer<typeof CouponSchema>) => {
    setIsUpdating(true);
    setSelectedCoupon(coupon);
    setOpen(true);
  };

  const handleSubmit = async (data: z.infer<typeof CouponSchema>) => {
    try {
      if (isUpdating) {
        await updateCoupon(data).unwrap();
      } else {
        await createCoupon(data).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Error submitting coupon:", error);
    }
  };

  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
        ]}
        page="Coupons"
        className="my-3"
      />
      <PageTitle title="Coupons" description="Coupons information" />

      <div className="flex w-full justify-end mt-3">
        <Button
          variant="outline"
          onClick={handleCreateCoupon}
          className="flex items-center gap-1"
        >
          Add New Coupon
        </Button>
      </div>

      <CouponForm
        open={open}
        setOpen={setOpen}
        categories={categoryRes.data}
        products={productRes.data}
        onSubmit={handleSubmit}
        isUpdating={isUpdating}
        couponData={selectedCoupon}
      />
      <CouponTableColumns
        coupons={response.data}
        onUpdateCoupon={handleUpdateCoupon}
      />
    </div>
  );
};

export default Coupon;
