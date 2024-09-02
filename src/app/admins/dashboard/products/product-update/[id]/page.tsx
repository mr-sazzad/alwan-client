"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { BsDatabaseAdd } from "react-icons/bs";
import { SlPin } from "react-icons/sl";
import { TbCubePlus } from "react-icons/tb";
import { VscCloudUpload } from "react-icons/vsc";
import { z } from "zod";

import Loading from "@/app/loading";
import ImageSlider from "@/components/cards/image-slider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { useGetAllCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { useGetAllColorsQuery } from "@/redux/api/color/color-api";
import { useGetAllProductTypesQuery } from "@/redux/api/product-types/product-types-api";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useGetAllSizesQuery } from "@/redux/api/size/size-api";
import { productSchema } from "@/schemas/product-schema";
import {
  IReadCategory,
  IReadColor,
  IReadProductType,
  IReadSize,
} from "@/types";

export default function UpdateProductPage() {
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const { data: product, isLoading } = useGetSingleProductQuery(id);
  const { data: categories, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery(undefined);
  const { data: colors, isLoading: isColorLoading } =
    useGetAllColorsQuery(undefined);
  const { data: sizes, isLoading: isSizeLoading } =
    useGetAllSizesQuery(undefined);
  const { data: productTypes, isLoading: isProductTypeLoading } =
    useGetAllProductTypesQuery(undefined);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      files: [] as File[],
      name: "",
      description: "",
      features: "",
      categoryId: "",
      productTypeId: "",
      status: "IN_STOCK",
      isCouponApplicable: "No",
      isFreeDeliveryAvailable: "No",
      sizeVariants: [
        {
          price: 0,
          stock: 0,
          colorId: "",
          sizeId: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sizeVariants",
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.data.name,
        description: product.data.description,
        features: Array.isArray(product.data.features)
          ? product.data.features.join(", ")
          : product.data.features,
        categoryId: product.data.categoryId,
        productTypeId: product.data.productTypeId,
        status: product.data.status,
        isCouponApplicable: product.data.isCouponApplicable ? "Yes" : "No",
        isFreeDeliveryAvailable: product.data.isFreeDeliveryAvailable
          ? "Yes"
          : "No",
        sizeVariants: product.data.sizeVariants,
        files: product.data.imageUrls.map((url: string) => ({ filename: url })),
      });
    }
  }, [product, form]);

  if (
    isLoading ||
    isCategoryLoading ||
    isColorLoading ||
    isSizeLoading ||
    isProductTypeLoading
  ) {
    return <Loading />;
  }

  const handleSizeChange = (index: number, sizeId: string) => {
    const updatedSizes = [...selectedSizes];
    updatedSizes[index] = sizeId;
    setSelectedSizes(updatedSizes);
  };

  const availableSizes = (index: number) => {
    const usedSizes = selectedSizes.slice(0, index);
    return sizes.data.filter((size: IReadSize) => !usedSizes.includes(size.id));
  };

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    const finalData = {
      name: data.name,
      description: data.description,
      features: data.features.split(",").map((feature) => feature.trim()),
      categoryId: data.categoryId,
      productTypeId: data.productTypeId,
      status: data.status,
      isCouponApplicable: data.isCouponApplicable === "Yes",
      isFreeDeliveryAvailable: data.isFreeDeliveryAvailable === "Yes",
      sizeVariants: data.sizeVariants,
      files: data.files,
    };
    // Handle form submission (e.g., API call to update product)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-5 md:flex-row flex-col mb-4 bg-gray-200 border-black/50 border border-dashed rounded-lg overflow-hidden p-1">
        <div className="h-[120px] w-[120px]">
          <ImageSlider urls={product?.data.imageUrls} />
        </div>
        <div className="flex flex-col gap-3 border-l border-black/50 border-dashed p-5">
          <h1 className="font-semibold flex items-center gap-1">
            <SlPin /> Remember when updating a product
          </h1>
          <p className="text-sm font-medium text-destructive opacity-70">
            You have to remember when you&apos;re updating a product, please add
            all previous images and also new images
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="files"
            control={form.control}
            render={({ field }) => (
              <FormItem className="md:col-span-4 col-span-1">
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <div className="mb-4 flex justify-center items-center border border-dashed rounded-lg px-5 py-8 relative">
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute w-full h-full opacity-0"
                      onChange={(e) => {
                        const filesArray = Array.from(e.target.files || []);
                        setSelectedFiles(filesArray);
                        field.onChange(filesArray);
                      }}
                      multiple
                    />
                    <div className="flex flex-col gap-2 items-center">
                      <VscCloudUpload size="30" />
                      <p className="ml-2 text-sm text-gray-500">
                        JPEG, PNG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
                {selectedFiles?.length > 0 && (
                  <div className="rounded-lg flex gap-1 bg-slate-200 py-2 border border-dashed px-4">
                    <p className="font-medium text-sm">Selected files: </p>
                    {selectedFiles?.map((file, index) => (
                      <p key={index} className="text-gray-300 text-sm">
                        {file.name + ","}
                      </p>
                    ))}
                  </div>
                )}
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Premium T-shirt"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>Select Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories.data.map((category: IReadCategory) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="productTypeId"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>Select Product Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Product Types</SelectLabel>
                        {productTypes.data.map((type: IReadProductType) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>Select Product Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="IN_STOCK">✅ In Stock</SelectItem>
                        <SelectItem value="OUT_OF_STOCK">
                          ❎ Out of Stock
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="isFreeDeliveryAvailable"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>Free Delivery?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Delivery Options</SelectLabel>
                        <SelectItem value="Yes">✅ Yes</SelectItem>
                        <SelectItem value="No">❎ No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isCouponApplicable"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>Coupon Applicable?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select coupon applicable or not" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Coupons options</SelectLabel>
                        <SelectItem value="Yes">✅ Yes</SelectItem>
                        <SelectItem value="No">❎ No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2 bg-green-100/50 p-2 rounded border border-dashed">
            <div className="flex justify-between">
              <p className="font-medium mb-2 ml-3">Product Variants</p>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({ price: 0, stock: 0, colorId: "", sizeId: "" })
                }
                className="flex items-center gap-2"
              >
                <TbCubePlus />
                <p className="font-medium">New variant</p>
              </Button>
            </div>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="flex md:flex-row flex-col gap-4 items-end w-full"
              >
                <FormField
                  control={form.control}
                  name={`sizeVariants.${index}.price`}
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value ? Number(e.target.value) : ""
                            )
                          }
                          placeholder="400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sizeVariants.${index}.stock`}
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value ? Number(e.target.value) : ""
                            )
                          }
                          placeholder="40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sizeVariants.${index}.colorId`}
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Color" />
                          </SelectTrigger>
                          <SelectContent>
                            {colors.data.map((color: IReadColor) => (
                              <SelectItem key={color.id} value={color.id}>
                                {color.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sizeVariants.${index}.sizeId`}
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleSizeChange(index, value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Size" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSizes(index).map((size: IReadSize) => (
                              <SelectItem key={size.id} value={size.id}>
                                {size.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    remove(index);
                    setSelectedSizes((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  }}
                  className="flex items-center gap-2 sm:w-[90px] w-full"
                >
                  <BiTrash size={16} />
                  <p className="font-medium">Trash</p>
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Feature 1, Feature 2"
                      {...field}
                      className="w-full"
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
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description 1, Description 2"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:justify-end">
            <Button
              className="md:w-[220px] w-full flex gap-2 items-center"
              type="submit"
            >
              <BsDatabaseAdd />
              Update This Product
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
