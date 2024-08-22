"use client";

import AddNewCoupon from "@/components/admins/dashboard/coupons/add-new-coupon";
import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import { Button } from "@/components/ui/button";
import { useGetAllCouponsQuery } from "@/redux/api/coupon/couponApi";
// import { ICoupon } from "@/types";
import { useState } from "react";

const Coupon = () => {
  const [open, setOpen] = useState(false);
  const { data: coupons, isLoading } = useGetAllCouponsQuery(undefined);

  // if (isLoading) {
  //   return <AdminDashboardLoading />;
  // }

  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
        ]}
        page="Coupons"
        className="mb-3"
      />
      <PageTitle title="Coupons" description="Coupons informations" />

      <div className="flex w-full justify-end mt-3">
        <Button
          variant="link"
          onClick={() => setOpen(true)}
          className="flex items-center gap-1"
        >
          + Add New Coupon
        </Button>
      </div>

      {/* <div>
        {coupons &&
          coupons.map((coupon: ICoupon) => (
            <div key={coupon.id}>
              <div>
                <p>{coupon.code}</p>
              </div>
            </div>
          ))}
      </div> */}
      <AddNewCoupon open={open} setOpen={setOpen} />
    </div>
  );
};

export default Coupon;
