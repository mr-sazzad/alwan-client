import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { TbCubePlus } from "react-icons/tb";
import { VscCloudUpload } from "react-icons/vsc";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// Assume these imports are available
import { useGetLeafCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { useGetAllColorsQuery } from "@/redux/api/color/color-api";
import { useGetProductTypesQuery } from "@/redux/api/product-types/product-types-api";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/products/productsApi";
import { useGetAllSizesQuery } from "@/redux/api/size/size-api";
import { productSchema } from "@/schemas/product-schema";
import { IProduct } from "@/types";
import { Loader } from "lucide-react";

interface ProductFormProps {
  mode: "create" | "update";
  product?: IProduct;
  setOpen: (open: boolean) => void;
}

export default function Component({
  mode = "create",
  product,
  setOpen,
}: ProductFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const { data: categories, isLoading: isCategoryLoading } =
    useGetLeafCategoriesQuery(undefined);
  const { data: colors, isLoading: isColorLoading } =
    useGetAllColorsQuery(undefined);
  const { data: sizes, isLoading: isSizeLoading } =
    useGetAllSizesQuery(undefined);
  const { data: productTypes, isLoading: isProductTypeLoading } =
    useGetProductTypesQuery(undefined);

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      files: [],
      name: "",
      description: "",
      features: "",
      categoryId: "",
      productTypeId: "",
      stockStatus: "AVAILABLE",
      availabilityTag: "",
      freeShippingAvailable: false,
      couponEligible: false,
      isNewArrival: false,
      sku: "",
      sizeVariants: [
        { price: 0, stock: 0, colorId: "", sizeId: "", manufacturingCost: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sizeVariants",
  });

  useEffect(() => {
    if (mode === "update" && product) {
      form.reset({
        name: product.name,
        description: product.description,
        features: Array.isArray(product.features)
          ? product.features.join(", ")
          : product.features,
        categoryId: product.categoryId,
        productTypeId: product.productTypeId,
        stockStatus: product.stockStatus,
        availabilityTag: product.availabilityTag,
        couponEligible: product.couponEligible,
        freeShippingAvailable: product.freeShippingAvailable,
        isNewArrival: product.isNewArrival,
        sku: product.sku,
        sizeVariants: product.sizeVariants,
      });
      setSelectedSizes(
        product.sizeVariants.map((variant: any) => variant.sizeId)
      );
    }
  }, [product, form, mode]);

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      const formData = new FormData();

      data.files.forEach((file) => {
        formData.append("files", file);
      });

      const productData = {
        ...data,
        features: data.features.split(",").map((feature) => feature.trim()),
      };

      formData.append("data", JSON.stringify(productData));

      const response =
        mode === "create"
          ? await createProduct(formData)
          : await updateProduct({ id: product?.id, data: formData });

      if ("data" in response && response.data.success) {
        toast({
          title: "Success",
          description: `Product ${
            mode === "create" ? "created" : "updated"
          } successfully`,
        });
        form.reset();
        setSelectedFiles([]);
        setSelectedSizes([]);
        setOpen(false);
      } else {
        throw new Error("Operation failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode} product. Please try again later.`,
        variant: "destructive",
      });
    }
  };

  if (
    isCategoryLoading ||
    isColorLoading ||
    isSizeLoading ||
    isProductTypeLoading
  ) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-40 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-medium">
              {mode === "create" ? "Create New Product" : "Update Product"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <div className="flex justify-center items-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg px-6 py-10 relative">
                      <Input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const filesArray = Array.from(e.target.files || []);
                          setSelectedFiles(filesArray);
                          field.onChange(filesArray);
                        }}
                        multiple
                      />
                      <div className="text-center">
                        <VscCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Drag and drop or click to upload images
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                        {selectedFiles.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {selectedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded px-2 py-1"
                              >
                                {file.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Premium T-shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="PRD-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories?.data.map((category: any) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Product Types</SelectLabel>
                          {productTypes?.data.map((type: any) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="stockStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stock status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="AVAILABLE">Available</SelectItem>
                          <SelectItem value="OUT_OF_STOCK">
                            Out of Stock
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availabilityTag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Tag</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability tag" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Availability Tag</SelectLabel>
                          {[
                            "sustainable material",
                            "Just In",
                            "Coming Soon",
                            "Comfortable",
                            "Durable",
                            "Stylish",
                            "Trendy",
                            "Elegant",
                            "Casual",
                            "Formal",
                            "Sporty",
                            "Luxurious",
                            "Minimalist",
                            "Premium",
                            "Limited Edition",
                            "Exclusive",
                            "Versatile",
                            "Unique",
                            "Handmade",
                            "Organic",
                            "Eco-Friendly",
                            "High-Quality",
                            "Innovative",
                            "Modern",
                            "Classic",
                            "Trending",
                            "Hipster",
                            "Vintage",
                            "Retro",
                            "Budget friendly",
                          ].map((tag) => (
                            <SelectItem key={tag} value={tag}>
                              {tag}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Product Variants</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      price: 0,
                      stock: 0,
                      colorId: "",
                      sizeId: "",
                      manufacturingCost: 0,
                    })
                  }
                >
                  <TbCubePlus className="mr-2 h-4 w-4" />
                  Add New Variant
                </Button>
              </div>
              {fields.map((item, index) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <FormField
                        control={form.control}
                        name={`sizeVariants.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="400"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value ? Number(e.target.value) : ""
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sizeVariants.${index}.stock`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="40"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value ? Number(e.target.value) : ""
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sizeVariants.${index}.colorId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Color" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {colors?.data.map((color: any) => (
                                  <SelectItem key={color.id} value={color.id}>
                                    {color.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sizeVariants.${index}.sizeId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedSizes((prev) => {
                                  const newSizes = [...prev];
                                  newSizes[index] = value;
                                  return newSizes;
                                });
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sizes?.data
                                  .filter(
                                    (size: any) =>
                                      !selectedSizes.includes(size.id) ||
                                      selectedSizes[index] === size.id
                                  )
                                  .map((size: any) => (
                                    <SelectItem key={size.id} value={size.id}>
                                      {size.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sizeVariants.${index}.manufacturingCost`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manufacturing Cost</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="240"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value ? Number(e.target.value) : ""
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                      className="mt-4"
                    >
                      <BiTrash className="mr-2 h-4 w-4" />
                      Remove variant
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Feature 1, Feature 2"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Small description about the product"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="freeShippingAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 flex-1">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-medium">
                        Free Shipping
                      </FormLabel>
                      <FormDescription>
                        Offer free shipping for this product
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="couponEligible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 flex-1">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-medium">
                        Coupon Eligible
                      </FormLabel>
                      <FormDescription>
                        Allow coupons to be used on this product
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isNewArrival"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 flex-1">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-medium">
                        New Arrival
                      </FormLabel>
                      <FormDescription>
                        Mark this product as a new arrival
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TbCubePlus className="mr-2 h-4 w-4" />
              )}
              {mode === "create" ? "Create Product" : "Update Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
