// "use client";
// import {
//   AlertCircle,
//   Calendar,
//   Clipboard,
//   Database,
//   Dog,
//   Folder,
//   MapPin,
//   Package,
//   Phone,
//   Puzzle,
//   RefreshCw,
//   Star,
//   Truck,
//   User,
// } from "lucide-react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import React, { useState } from "react";

// import { Button } from "../../../../../components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../../../../components/ui/card";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../../../../../components/ui/tabs";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../../../../../components/ui/tooltip";
// import { toast } from "../../../../../components/ui/use-toast";

// import AdminProductPageSkeleton from "../../../../../components/skeletons/admin-product-page-skeleton";
// import { useGetSingleProductQuery } from "../../../../../redux/api/products/productsApi";
// import { IProduct } from "../../../../../types";
// import AdminProductTable from "./admin-product-columns";

// export default function AdminProductPage() {
//   const { id } = useParams();
//   const {
//     data: response,
//     isLoading,
//     error,
//     refetch,
//   } = useGetSingleProductQuery(id as string);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   if (isLoading) {
//     return <AdminProductPageSkeleton />;
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle className="text-center text-red-500">Error</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-center">
//               Error loading product. Please try again later.
//             </p>
//             <Button className="mt-4 w-full" onClick={() => refetch()}>
//               Retry
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const product = response?.data as IProduct | undefined;

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle className="text-center text-red-500">
//               Not Found
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-center">Product not found</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const totalStock =
//     product.sizeVariants?.reduce(
//       (acc, variant) => acc + (variant.stock || 0),
//       0
//     ) || 0;
//   const averageRating = product.reviews?.length
//     ? product.reviews.reduce((acc, review) => acc + (review.rating || 0), 0) /
//       product.reviews.length
//     : 0;

//   return (
//     <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-[#020817]">
//       <div className="mb-8 p-6 bg-white dark:bg-gray-900  rounded-lg shadow-sm">
//         <h1 className="text-3xl font-medium text-primary mb-2">
//           {product.name}
//         </h1>
//         <p className="text-sm text-muted-foreground mb-4">{product.id}</p>
//         <div className="flex items-center space-x-4">
//           <span
//             className={`${
//               product.stockStatus === "AVAILABLE"
//                 ? "bg-green-100 text-green-600"
//                 : "bg-red-100 text-red-600"
//             } px-3 py-2 rounded font-medium`}
//           >
//             {product.stockStatus}
//           </span>
//           <span className="bg-teal-100 text-teal-600 px-3 py-2 rounded font-medium">
//             {product.availabilityTag}
//           </span>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => {
//                     navigator.clipboard.writeText(product.id);
//                     toast({
//                       title: "Product ID Copied",
//                       description:
//                         "The product ID has been copied to your clipboard.",
//                     });
//                   }}
//                 >
//                   <Clipboard className="h-4 w-4" />
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent className="text-sm bg-primary text-primary-foreground">
//                 <p>Copy Product ID</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button variant="outline" size="icon" onClick={() => refetch()}>
//                   <RefreshCw className="h-4 w-4" />
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent className="text-sm bg-primary text-primary-foreground">
//                 <p>Refresh Product Data</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           <Card className="shadow-sm">
//             <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b">
//               <CardTitle className="flex items-center text-xl font-medium">
//                 <Package className="mr-2 text-muted-foreground" />
//                 Product Details
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6">
//               <InfoItem
//                 icon={<Folder className="text-green-600" />}
//                 label="Category"
//                 value={product.category?.name || "N/A"}
//               />
//               <InfoItem
//                 icon={<Database className="text-purple-600" />}
//                 label="Total Stock"
//                 value={totalStock.toString()}
//               />
//               <InfoItem
//                 icon={<Truck className="text-yellow-600" />}
//                 label="Free Delivery"
//                 value={product.freeShippingAvailable ? "Yes" : "No"}
//               />
//               <InfoItem
//                 icon={<Puzzle className="text-sky-600" />}
//                 label="Coupon Applicable"
//                 value={product.couponEligible ? "Yes" : "No"}
//               />
//               <InfoItem
//                 icon={<Calendar className="text-teal-600" />}
//                 label="Created"
//                 value={new Date(product.createdAt).toLocaleDateString()}
//               />
//               <InfoItem
//                 icon={<Calendar className="text-orange-600" />}
//                 label="Updated"
//                 value={new Date(product.updatedAt).toLocaleDateString()}
//               />
//             </CardContent>
//           </Card>

//           <Card className="shadow-sm">
//             <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b">
//               <CardTitle className="flex items-center text-xl font-medium">
//                 <Package className="mr-2 text-muted-foreground" />
//                 Size Variants
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="px-1">
//               <div className="h-[200px] hide-scrollbar overflow-x-auto overflow-y-auto">
//                 <AdminProductTable data={product.sizeVariants || []} />
//               </div>
//             </CardContent>
//           </Card>

//           <Tabs
//             defaultValue="description"
//             className="bg-white dark:bg-[#020817] rounded-lg shadow-sm"
//           >
//             <TabsList className="w-full justify-start border-b bg-gray-50 dark:bg-gray-900">
//               <TabsTrigger value="description" className="font-medium">
//                 Description
//               </TabsTrigger>
//               <TabsTrigger value="features" className="font-medium">
//                 Features
//               </TabsTrigger>
//               <TabsTrigger value="reviews" className="font-medium">
//                 Reviews
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="description" className="p-6">
//               <h3 className="text-xl font-medium text-primary/90 mb-4">
//                 Description
//               </h3>
//               <p className="text-gray-600">{product.description}</p>
//             </TabsContent>

//             <TabsContent value="features" className="p-6">
//               <h3 className="text-xl font-medium text-primary/90 mb-4">
//                 Features
//               </h3>
//               <ul className="list-disc pl-5 space-y-2 text-gray-600">
//                 {product.features?.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </TabsContent>

//             <TabsContent value="reviews" className="p-6">
//               <h3 className="text-xl font-medium text-primary/90 mb-4">
//                 Customer Reviews
//               </h3>
//               <div className="h-[200px] hide-scrollbar overflow-y-auto">
//                 <div className="space-y-6">
//                   {product.reviews.map((review) => (
//                     <div key={review.id} className="border-b pb-4">
//                       <div className="flex justify-between items-center">
//                         <p className="flex items-center mb-2 font-medium">
//                           <User className="w-4 h-4 mr-1 text-blue-600" />
//                           {review.user.addresses[0]?.recipientName ||
//                             "Anonymous"}
//                         </p>
//                         <div className="flex flex-col-reverse gap-2 mb-2">
//                           <div className="flex items-center">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`w-5 h-5 ${
//                                   i < review.rating
//                                     ? "text-yellow-400"
//                                     : "text-gray-300"
//                                 }`}
//                                 fill="currentColor"
//                               />
//                             ))}
//                           </div>
//                           <span className="text-xs text-gray-500">
//                             {new Date(review.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>

//                       <p className="mb-2 text-gray-600">{review.content}</p>
//                       <div className="text-sm text-gray-500">
//                         <p className="flex items-center mt-1">
//                           <Phone className="w-4 h-4 mr-1 text-green-600" />
//                           {review.user.addresses[0]?.phone || "N/A"}
//                         </p>
//                         <p className="flex items-center mt-1">
//                           <MapPin className="w-4 h-4 mr-1 text-red-600" />
//                           {review.user.addresses[0]?.streetAddress},{" "}
//                           {review.user.addresses[0]?.district},{" "}
//                           {review.user.addresses[0]?.division}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         <div className="space-y-8">
//           <Card className="bg-white dark:bg-[#020817] shadow-sm">
//             <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b">
//               <CardTitle className="text-xl font-medium flex items-center">
//                 <Dog className="mr-2 text-muted-foreground" />
//                 Product Images
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="aspect-square rounded-lg overflow-hidden border mb-4">
//                 <Image
//                   src={product.imageUrls[activeImageIndex]}
//                   alt={`${product.name} ${activeImageIndex + 1}`}
//                   layout="responsive"
//                   width={400}
//                   height={400}
//                   objectFit="cover"
//                 />
//               </div>
//               <div className="grid grid-cols-4 gap-2">
//                 {product.imageUrls?.map((url, index) => (
//                   <button
//                     key={index}
//                     className={`relative aspect-square rounded-md overflow-hidden border ${
//                       index === activeImageIndex ? "ring-2 ring-blue-500" : ""
//                     }`}
//                     onClick={() => setActiveImageIndex(index)}
//                   >
//                     <Image
//                       src={url}
//                       alt={`${product.name} ${index + 1}`}
//                       layout="fill"
//                       objectFit="cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-white dark:bg-[#020817] shadow-sm">
//             <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b">
//               <CardTitle className="flex items-center text-xl font-medium">
//                 <AlertCircle className="mr-2 text-muted-foreground" />
//                 Quick Stats
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4 p-6">
//               <QuickStat
//                 label="Total Variants"
//                 value={product.sizeVariants?.length || 0}
//               />
//               <QuickStat
//                 label="Price Range"
//                 value={`BDT ${Math.min(
//                   ...(product.sizeVariants?.map((v) => v.price || 0) || [0])
//                 )} - BDT ${Math.max(
//                   ...(product.sizeVariants?.map((v) => v.price || 0) || [0])
//                 )}`}
//               />
//               <QuickStat label="Total Stock" value={totalStock} />
//               <QuickStat
//                 label="Avg. Manufacturing Cost"
//                 value={`BDT ${(
//                   (product.sizeVariants?.reduce(
//                     (acc, v) => acc + (v.manufacturingCost || 0),
//                     0
//                   ) || 0) / (product.sizeVariants?.length || 1)
//                 ).toFixed(2)}`}
//               />
//               <QuickStat
//                 label="Average Rating"
//                 value={
//                   <div className="flex items-center">
//                     <span className="mr-2 font-medium">
//                       {averageRating.toFixed(1)}
//                     </span>
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ${
//                           i < Math.round(averageRating)
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                         fill="currentColor"
//                       />
//                     ))}
//                   </div>
//                 }
//               />
//               <QuickStat
//                 label="Total Reviews"
//                 value={product.reviews?.length || 0}
//               />
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoItem({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: React.ReactNode;
// }) {
//   return (
//     <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
//       <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 flex justify-center items-center shadow-sm">
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-muted-foreground font-medium">{label}</p>
//         <p className="font-medium text-primary">{value}</p>
//       </div>
//     </div>
//   );
// }

// function QuickStat({
//   label,
//   value,
// }: {
//   label: string;
//   value: React.ReactNode;
// }) {
//   return (
//     <div className="flex justify-between items-center">
//       <span className="font-medium text-sm text-muted-foreground">
//         {label}:
//       </span>
//       <span className="font-medium text-primary/80 text-sm">{value}</span>
//     </div>
//   );
// }

import React from "react";
export const Page = () => {
  return <div>Hello From Delivered Page</div>;
};
