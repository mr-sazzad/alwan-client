"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productSchema } from "@/schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { useState } from "react";

import { BsDatabaseAdd } from "react-icons/bs";
import { VscCloudUpload } from "react-icons/vsc";

import { PiSpinner } from "react-icons/pi";
import { TbCubePlus } from "react-icons/tb";

// react select
import AdminDashboardLoading from "@/components/lodings/admin-dashboard-loding";
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
import { toast } from "@/components/ui/use-toast";
import { useGetAllCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { useGetAllColorsQuery } from "@/redux/api/color/color-api";
import { useGetAllProductTypesQuery } from "@/redux/api/product-types/product-types-api";
import { useRegisterAProductMutation } from "@/redux/api/products/productsApi";
import { useGetAllSizesQuery } from "@/redux/api/size/size-api";
import {
  IReadCategory,
  IReadColor,
  IReadProductType,
  IReadSize,
} from "@/types";
import { BiTrash } from "react-icons/bi";

const Page = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // RTK QUERY
  const { data: categories, isLoading } = useGetAllCategoriesQuery(undefined);
  const { data: colors, isLoading: isColorLoading } =
    useGetAllColorsQuery(undefined);
  const { data: sizes, isLoading: isSizeLoading } =
    useGetAllSizesQuery(undefined);
  const { data: productTypes, isLoading: isProductTypeLoading } =
    useGetAllProductTypesQuery(undefined);

  const [registerAProduct, { isLoading: isProductInstalling }] =
    useRegisterAProductMutation();

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
      isFreeDeliveryAvailable: "",
      isCouponApplicable: "",
      sizeVariants: [{ price: 0, stock: 0, colorId: "", sizeId: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sizeVariants",
  });

  if (isLoading || isSizeLoading || isColorLoading || isProductTypeLoading) {
    return <AdminDashboardLoading />;
  }

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    const {
      files,
      isCouponApplicable,
      isFreeDeliveryAvailable,
      features,
      description,
      ...rest
    } = data;

    const featuresArray = features
      ? features.split(",").map((item) => item.trim())
      : [];
    const descriptionArray = description
      ? description.split(",").map((item) => item.trim())
      : [];

    const stringData = JSON.stringify({
      features: featuresArray,
      description: descriptionArray,
      ...rest,
    });

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("data", stringData);

    try {
      const response: any = await registerAProduct(formData);

      if (!response?.data?.success) {
        toast({
          title: "Error occurred",
          description: "Failed to create product.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Product created successfully",
          description: "Product has been created successfully.",
        });
        form.reset();
        setSelectedFiles([]);
        setSelectedSizes([]);
      }
    } catch (error: any) {
      toast({
        title: "Error occurred",
        description: "Failed to create product.",
        variant: "destructive",
      });
    }
  };

  const handleSizeChange = (index: number, sizeId: string) => {
    const updatedSizes = [...selectedSizes];
    updatedSizes[index] = sizeId;
    setSelectedSizes(updatedSizes);
  };

  const availableSizes = (index: number) => {
    const usedSizes = selectedSizes.slice(0, index);
    return sizes.data.filter((size: IReadSize) => !usedSizes.includes(size.id));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="files"
          control={form.control}
          render={({ field }) => (
            <FormItem className="md:col-span-4 col-span-1">
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
                    <p className="ml-2 text-sm text-muted-foreground">
                      JPEG, PNG, GIF up to 10MB
                    </p>
                    <p className="ml-2 text-sm font-semibold text-muted-foreground">
                      Upload Files
                    </p>
                    {selectedFiles.length > 0 && (
                      <div className="flex gap-1 items-center">
                        {selectedFiles.map((file, index) => (
                          <p
                            key={index}
                            className="text-sm text-muted-foreground"
                          >
                            {file.name + ","}
                          </p>
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
          <div className="flex justify-end">
            <Button
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
              className="flex md:flex-row flex-col gap-4 items-end w-full "
            >
              {/* Price Field */}
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

              {/* Stock Field */}
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

              {/* Color Field */}
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

              {/* Size Field */}
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

              {/* Remove Button */}
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
                    placeholder="Features 1, Features 2"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
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
              </FormItem>
            )}
          />
        </div>

        <div className="flex md:justify-end">
          <Button
            className="md:w-[220px] w-full md:mb-0 mb-16"
            type="submit"
            disabled={isProductInstalling}
          >
            {isProductInstalling ? (
              <div className="flex justify-center items-center">
                <PiSpinner className="animate-spin" />
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <BsDatabaseAdd />
                <p>Upload This Product</p>
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Page;
