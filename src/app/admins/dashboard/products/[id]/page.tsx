"use client";

import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import {
  AlertCircle,
  Calendar,
  Clipboard,
  Database,
  Folder,
  MapPin,
  Package,
  Phone,
  Puzzle,
  RefreshCw,
  Star,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

type Address = {
  recipientName: string;
  phone: string;
  streetAddress: string;
  district: string;
  division: string;
};

type UserInfo = {
  id: string;
  email: string;
  addresses: Address[];
};

type Review = {
  id: string;
  rating: number;
  content: string;
  createdAt: string;
  user: UserInfo;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string[];
  features: string[];
  imageUrls: string[];
  category: { id: string; name: string };
  sizeVariants: {
    id: string;
    size: { id: string; name: string };
    color: { id: string; name: string; hexCode: string };
    price: number;
    stock: number;
    manufacturingCost: number;
  }[];
  reviews: Review[];
  isCouponApplicable: boolean;
  isFreeDeliveryAvailable: boolean;
  stockStatus: string;
  statusTag: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
  productType: { id: string; name: string };
};

export default function AdminProductPage() {
  const { id } = useParams();
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetSingleProductQuery(id as string);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) {
    return <AdminDashboardLoading />;
  }

  console.log(response);

  if (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              Error loading product. Please try again later.
            </p>
            <Button className="mt-4 w-full" onClick={() => refetch()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const product = response?.data as Product | undefined;

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-500">
              Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">Product not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalStock =
    product.sizeVariants?.reduce(
      (acc, variant) => acc + (variant.stock || 0),
      0
    ) || 0;
  const averageRating = product.reviews?.length
    ? product.reviews.reduce((acc, review) => acc + (review.rating || 0), 0) /
      product.reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-3">
      <AlwanBreadCrumb
        links={[
          { label: "Dashboard", href: "/admins/dashboard" },
          { label: "Products", href: "/admins/dashboard/products" },
        ]}
        page={`${product.name}`}
        className="mb-6"
      />

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-medium text-gray-900">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">{product.id}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span
                className={`text-sm px-2 py-1 rounded ${
                  product.statusTag === "coming soon"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-teal-100 text-teal-600"
                }`}
              >
                {product.stockStatus}
              </span>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  product.statusTag === "coming soon"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-teal-100 text-teal-600"
                }`}
              >
                {product.statusTag}
              </span>

              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => {
                  navigator.clipboard.writeText(product.id);
                  toast({
                    title: "Product ID Copied",
                    description:
                      "The product ID has been copied to your clipboard.",
                  });
                }}
              >
                <Clipboard className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => refetch()}
                className="flex items-center"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-medium">
                    <Package className="mr-2" />
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  <InfoItem
                    icon={<Folder className="h-6 w-6" />}
                    label="Category"
                    value={product.category?.name || "N/A"}
                  />
                  <InfoItem
                    icon={<Database className="h-6 w-6" />}
                    label="Total Stock"
                    value={totalStock.toString()}
                  />
                  <InfoItem
                    icon={<Truck className="h-6 w-6" />}
                    label="Free Delivery"
                    value={product.isFreeDeliveryAvailable ? "Yes" : "No"}
                  />
                  <InfoItem
                    icon={<Puzzle className="h-6 w-6" />}
                    label="Coupon Applicable"
                    value={product.isCouponApplicable ? "Yes" : "No"}
                  />
                  <InfoItem
                    icon={<Calendar className="h-6 w-6" />}
                    label="Created"
                    value={new Date(product.createdAt).toDateString()}
                  />
                  <InfoItem
                    icon={<Calendar className="h-6 w-6" />}
                    label="Updated"
                    value={new Date(product.updatedAt).toDateString()}
                  />
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-medium">
                    <Package className="mr-2" />
                    Size Variants
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-medium">Size</TableHead>
                          <TableHead className="font-medium">Color</TableHead>
                          <TableHead className="font-medium">Price</TableHead>
                          <TableHead className="font-medium">
                            Manufacturing Cost
                          </TableHead>
                          <TableHead className="font-medium">Stock</TableHead>
                          <TableHead className="font-medium">Profit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.sizeVariants?.map((variant) => (
                          <TableRow key={variant.id}>
                            <TableCell>{variant.size.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div
                                  className="w-4 h-4 rounded-full mr-2 border"
                                  style={{
                                    backgroundColor: variant.color.hexCode,
                                  }}
                                ></div>
                                {variant.color.name}
                              </div>
                            </TableCell>
                            <TableCell>${variant.price.toFixed(2)}</TableCell>
                            <TableCell>
                              ${variant.manufacturingCost.toFixed(2)}
                            </TableCell>
                            <TableCell>{variant.stock}</TableCell>
                            <TableCell>
                              $
                              {(
                                variant.price - variant.manufacturingCost
                              ).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="description" className="mt-8">
                <TabsList className="w-full justify-start border-b">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-medium">
                        Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        {product.description?.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-medium">
                        Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        {product.features?.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-medium">
                        Customer Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {product.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4">
                            <div className="flex justify-between items-center">
                              <p className="flex items-center mb-2">
                                <User className="w-4 h-4 mr-1" />
                                {review.user.addresses[0]?.recipientName ||
                                  "Anonymous"}
                              </p>
                              <div className="flex flex-col-reverse gap-2 mb-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-5 h-5 ${
                                        i < review.rating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                      fill="currentColor"
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(review.createdAt).toDateString()}
                                </span>
                              </div>
                            </div>

                            <p className="mb-2">{review.content}</p>
                            <div className="text-sm text-muted-foreground">
                              <p className="flex items-center mt-1">
                                <Phone className="w-4 h-4 mr-1" />
                                {review.user.addresses[0]?.phone || "N/A"}
                              </p>
                              <p className="flex items-center mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {review.user.addresses[0]?.streetAddress},{" "}
                                {review.user.addresses[0]?.district},{" "}
                                {review.user.addresses[0]?.division}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-medium">
                    Product Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square rounded-lg overflow-hidden border mb-4">
                    <Image
                      src={product.imageUrls[activeImageIndex]}
                      alt={`${product.name} ${activeImageIndex + 1}`}
                      layout="responsive"
                      width={400}
                      height={400}
                      objectFit="cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.imageUrls?.map((url, index) => (
                      <button
                        key={index}
                        className={`relative aspect-square rounded-md overflow-hidden border ${
                          index === activeImageIndex
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <Image
                          src={url}
                          alt={`${product.name} ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-medium">
                    <AlertCircle className="mr-2" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-muted-foreground">
                      Total Variants:
                    </span>
                    <span>{product.sizeVariants?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-muted-foreground">
                      Price Range:
                    </span>
                    <span>
                      $
                      {Math.min(
                        ...(product.sizeVariants?.map((v) => v.price || 0) || [
                          0,
                        ])
                      )}{" "}
                      - $
                      {Math.max(
                        ...(product.sizeVariants?.map((v) => v.price || 0) || [
                          0,
                        ])
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-muted-foreground">
                      Total Stock:
                    </span>
                    <span>{totalStock}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-muted-foreground">
                      Avg. Manufacturing Cost:
                    </span>
                    <span>
                      $
                      {(
                        (product.sizeVariants?.reduce(
                          (acc, v) => acc + (v.manufacturingCost || 0),
                          0
                        ) || 0) / (product.sizeVariants?.length || 1)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-muted-foreground">
                      Average Rating:
                    </span>
                    <div className="flex items-center">
                      <span className="mr-2">{averageRating.toFixed(1)}</span>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(averageRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-muted-foreground">
                      Total Reviews:
                    </span>
                    <span>{product.reviews?.length || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-gray-100 rounded">
      <div className="h-8 w-8 rounded mb-3 bg-gray-300 flex justify-center items-center mt-2 ml-2 text-gray-800">
        {icon}
      </div>
      <span className="font-medium text-muted-foreground text-sm ml-2">
        {label}
      </span>
      <span className="ml-2 mb-2 font-medium">{value}</span>
    </div>
  );
}
