"use client";

import AddCarouselDrawer from "@/components/admins/dashboard/carousel/add-carousel-drawer";
import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AdminCarousel from "@/components/carousels/admin-carousel";
import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
import NotFound from "@/components/not-found/not-found";
import { Button } from "@/components/ui/button";
import { transformCarousel } from "@/components/utils/transform-carousel";
import { useGetlatestCarouselQuery } from "@/redux/api/carousel/carouselApi";
import { useState } from "react";
import { LiaPoopSolid } from "react-icons/lia";

const Page = () => {
  const [open, setOpen] = useState(false);
  const { data: carousel, isLoading } = useGetlatestCarouselQuery(undefined);

  if (isLoading) {
    return <AdminDashboardLoading />;
  }

  console.log("CAROUSEL => ", carousel);

  const transformedData = transformCarousel(carousel);

  return (
    <div>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Carousel"
        className="mb-3"
      />

      <PageTitle title="Carousel" description="carousel information" />

      <div className="flex justify-end mt-3">
        <Button variant="link" onClick={() => setOpen(true)}>
          + Add Carousel
        </Button>
      </div>

      <div>
        {!carousel.success || !carousel.data ? (
          <div className="flex justify-center mt-[20vh]">
            <NotFound icon={LiaPoopSolid} size={40} text="Carousel Not Found" />
          </div>
        ) : (
          <div>
            <AdminCarousel images={transformedData} />
          </div>
        )}
        <AddCarouselDrawer open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Page;
