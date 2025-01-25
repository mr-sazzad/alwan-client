// "use client";
// import React, { useState } from "react";
// import { LuSquirrel } from "react-icons/lu";
// import CarouselDrawer from "../../../../components/admins/dashboard/carousel/carousel-drawer";
// import PageTitle from "../../../../components/admins/dashboard/page-titles/page-title";
// import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
// import AdminCarousel from "../../../../components/carousels/admin-carousel";
// import NotFound from "../../../../components/not-found/not-found";
// import AdminCarouselSkeleton from "../../../../components/skeletons/admin-carousel-skeleton";
// import { Button } from "../../../../components/ui/button";
// import { transformCarousel } from "../../../../components/utils/transform-carousel";
// import { useGetlatestCarouselQuery } from "../../../../redux/api/carousel/carouselApi";

// export default function CarouselPage() {
//   const [open, setOpen] = useState(false);
//   const { data: response, isLoading } = useGetlatestCarouselQuery(undefined);

//   if (isLoading) {
//     return <AdminCarouselSkeleton />;
//   }

//   const transformedData = response?.data
//     ? transformCarousel(response.data)
//     : [];

//   const carouselExists = response?.success && response?.data;

//   return (
//     <div className="container mx-auto px-4">
//       <AlwanBreadCrumb
//         links={[
//           { label: "Home", href: "/" },
//           { label: "Dashboard", href: "/admins/dashboard" },
//         ]}
//         page="Carousel"
//         className="my-3"
//       />

//       <PageTitle
//         title="Carousel"
//         description="carousel information"
//         accentColor="red"
//       />

//       <div className="flex justify-end mt-3">
//         <Button variant="outline" onClick={() => setOpen(true)}>
//           {carouselExists ? "Update Carousel" : "Add New Carousel"}
//         </Button>
//       </div>

//       <div className="mt-6">
//         {!carouselExists ? (
//           <div className="flex justify-center mt-[20vh]">
//             <NotFound icon={LuSquirrel} size={40} text="Carousel Not Found" />
//           </div>
//         ) : (
//           <div className="w-full max-w-full mx-auto rounded overflow-hidden">
//             <AdminCarousel images={transformedData} />
//           </div>
//         )}
//         <CarouselDrawer
//           open={open}
//           setOpen={setOpen}
//           carouselId={response?.data?.id}
//           isUpdate={carouselExists}
//         />
//       </div>
//     </div>
//   );
// }

import React from "react";
const Page = () => {
  return <div>Hello From Page</div>;
};

export default Page;
