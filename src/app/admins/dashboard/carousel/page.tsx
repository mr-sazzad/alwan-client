"use client";

import AddCarouselDrawer from "@/components/admins/dashboard/carousel/add-carousel-drawer";
import PageTitle from "@/components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AdminCarousel from "@/components/carousels/admin-carousel";
import NotFound from "@/components/not-found/not-found";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { transformCarousel } from "@/components/utils/transform-carousel";
import { useGetlatestCarouselQuery } from "@/redux/api/carousel/carouselApi";
import { useState } from "react";
import { LiaPoopSolid } from "react-icons/lia";

const Page = () => {
  const [open, setOpen] = useState(false);
  const { data: response, isLoading } = useGetlatestCarouselQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="w-[200px] h-7" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="ml-auto w-[150px] h-10" />
        <Skeleton className="w-full h-[30vh]" />
      </div>
    );
  }

  const transformedData = response?.data
    ? transformCarousel(response.data)
    : [];

  return (
    <div className="container mx-auto px-4">
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

      <div className="mt-6">
        {!response?.success || !response?.data ? (
          <div className="flex justify-center mt-[20vh]">
            <NotFound icon={LiaPoopSolid} size={40} text="Carousel Not Found" />
          </div>
        ) : (
          <div className="w-full max-w-[1200px] mx-auto rounded overflow-hidden">
            <AdminCarousel images={transformedData} />
          </div>
        )}
        <AddCarouselDrawer open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Page;
