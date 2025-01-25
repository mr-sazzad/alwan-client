// "use client";

// import React, { useState } from "react";
// import PageTitle from "../../../../components/admins/dashboard/page-titles/page-title";
// import { DataTable } from "../../../../components/admins/dashboard/products/data-table";
// import SearchReviewsDrawer from "../../../../components/admins/dashboard/reviews/search-reviews-drawer";
// import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
// import { Button } from "../../../../components/ui/button";
// import { Skeleton } from "../../../../components/ui/skeleton";
// import { useGetLeafCategoriesQuery } from "../../../../redux/api/categoies/categoriesApi";
// import { useGetProductReviewsQuery } from "../../../../redux/api/reviews/reviews-api";
// import { IProduct } from "../../../../types";
// import ReviewsTableColumns from "./reviews-columns";

// const Reviews = () => {
//   const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const { data: categories, isLoading: isCategoriesLoading } =
//     useGetLeafCategoriesQuery(undefined);

//   const columns = ReviewsTableColumns();

//   const {
//     data: reviews,
//     isLoading: isReviewsLoading,
//     error: reviewsError,
//   } = useGetProductReviewsQuery(selectedProduct?.id || "", {
//     skip: !selectedProduct,
//   });

//   if (isCategoriesLoading) {
//     return (
//       <div className="flex flex-col gap-3">
//         <Skeleton className="w-[200px] h-7" />
//         <Skeleton className="w-full h-20" />
//         <Skeleton className="ml-auto w-[200px] h-10" />
//         <Skeleton className="w-full h-[30vh]" />
//       </div>
//     );
//   }

//   const handleProductReviewSearch = () => {
//     setIsDrawerOpen(true);
//   };

//   return (
//     <div>
//       <AlwanBreadCrumb
//         links={[
//           { label: "Home", href: "/" },
//           { label: "Dashboard", href: "/admins/dashboard" },
//         ]}
//         page="Reviews"
//         className="my-3"
//       />

//       <PageTitle title="Reviews" description="User Reviews information" />

//       <div className="flex justify-end items-center my-3">
//         <Button variant="outline" onClick={handleProductReviewSearch}>
//           Search Product Reviews
//         </Button>
//       </div>

//       {isReviewsLoading ? (
//         <div>Loading reviews...</div>
//       ) : reviewsError ? (
//         <div className="text-center text-red-500">
//           Error loading reviews. Please try again later.
//         </div>
//       ) : (
//         <>
//           <div>
//             <DataTable
//               columns={columns}
//               data={reviews?.data ?? []}
//               filterColumn="rating"
//             />
//           </div>
//         </>
//       )}

//       {isDrawerOpen && (
//         <SearchReviewsDrawer
//           open={isDrawerOpen}
//           setOpen={setIsDrawerOpen}
//           categories={categories?.data || []}
//           selectedProduct={selectedProduct}
//           setSelectedProduct={setSelectedProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default Reviews;

import React from "react";
export const Page = () => {
  return <div>Hello From Delivered Page</div>;
};
