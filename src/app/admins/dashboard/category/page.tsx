// "use client";
// import { Plus } from "lucide-react";
// import React, { useState } from "react";
// import PageTitle from "../../../../components/admins/dashboard/page-titles/page-title";
// import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
// import CategoryDrawer from "../../../../components/categories/category-drawer";
// import AdminsCategorySkeleton from "../../../../components/skeletons/admins-category-skeleton";
// import { Button } from "../../../../components/ui/button";
// import { useGetCategoriesQuery } from "../../../../redux/api/categoies/categoriesApi";
// import CategoryTableColumns from "./category-columns";

// const Category = () => {
//   const [open, setOpen] = useState(false);

//   const { data: categories, isLoading } = useGetCategoriesQuery(undefined);

//   if (isLoading) {
//     return <AdminsCategorySkeleton />;
//   }

//   return (
//     <div>
//       <AlwanBreadCrumb
//         links={[
//           { label: "Home", href: "/" },
//           { label: "Dashboard", href: "/admins/dashboard" },
//         ]}
//         page="Category"
//         className="my-3"
//       />
//       <PageTitle title="Category" description="Category information" />

//       <div className="flex justify-end items-center mt-5">
//         <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
//           <Plus className="w-4 h-4 mr-2" />
//           Create Category
//         </Button>
//       </div>

//       <div>
//         {categories?.data && (
//           <CategoryTableColumns categories={categories?.data} />
//         )}
//       </div>
//       <CategoryDrawer
//         open={open}
//         setOpen={setOpen}
//         categories={categories.data}
//         mode="create"
//       />
//     </div>
//   );
// };

// export default Category;

import React from "react";
const Page = () => {
  return <div>Hello From Page</div>;
};

export default Page;
