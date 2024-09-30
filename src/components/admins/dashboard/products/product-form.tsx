"use client";

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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { BsDatabaseAdd } from "react-icons/bs";
import { PiSpinnerLight } from "react-icons/pi";
import { SlPin } from "react-icons/sl";
import { TbCubePlus } from "react-icons/tb";
import { VscCloudUpload } from "react-icons/vsc";
import { z } from "zod";

// Import your API hooks and types here
import { useGetLeafCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import { useGetAllColorsQuery } from "@/redux/api/color/color-api";
import { useGetProductTypesQuery } from "@/redux/api/product-types/product-types-api";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/products/productsApi";
import { useGetAllSizesQuery } from "@/redux/api/size/size-api";
import { productSchema } from "@/schemas/product-schema";
import {
  IProduct,
  IReadCategory,
  IReadColor,
  IReadProductType,
  IReadSize,
} from "@/types";

interface ProductFormProps {
  mode: "create" | "update";
  product?: IProduct;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProductForm = ({ mode, product, setOpen }: ProductFormProps) => {
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
      files: [] as File[],
      name: "",
      description: "",
      features: "",
      categoryId: "",
      productTypeId: "",
      stockStatus: "IN_STOCK",
      statusTag: "",
      isFreeDeliveryAvailable: "No",
      isCouponApplicable: "No",
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
        description: Array.isArray(product.description)
          ? product.description.join(", ")
          : product.description,
        features: Array.isArray(product.features)
          ? product.features.join(", ")
          : product.features,
        categoryId: product.categoryId,
        productTypeId: product.productTypeId,
        stockStatus: product.stockStatus,
        statusTag: product.statusTag,
        isCouponApplicable: product.isCouponApplicable ? "Yes" : "No",
        isFreeDeliveryAvailable: product.isFreeDeliveryAvailable ? "Yes" : "No",
        sizeVariants: product.sizeVariants,
      });
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
        description: data.description.split(",").map((desc) => desc.trim()),
        features: data.features.split(",").map((feature) => feature.trim()),
        isCouponApplicable: data.isCouponApplicable === "Yes",
        isFreeDeliveryAvailable: data.isFreeDeliveryAvailable === "Yes",
      };

      formData.append("data", JSON.stringify(productData));

      let response;
      if (mode === "create") {
        response = await createProduct(formData);
      } else {
        response = await updateProduct({
          id: product && product.id,
          data: formData,
        });
      }

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

  const handleSizeChange = (index: number, sizeId: string) => {
    const updatedSizes = [...selectedSizes];
    updatedSizes[index] = sizeId;
    setSelectedSizes(updatedSizes);
  };

  const availableSizes = (index: number) => {
    const usedSizes = selectedSizes.slice(0, index);
    return sizes?.data.filter(
      (size: IReadSize) => !usedSizes.includes(size.id)
    );
  };

  if (
    isCategoryLoading ||
    isColorLoading ||
    isSizeLoading ||
    isProductTypeLoading
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PiSpinnerLight className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {mode === "update" && product && (
          <div className="flex gap-5 md:flex-row flex-col mb-4 bg-gray-100 border-gray-300 border border-dashed rounded-lg overflow-hidden p-4">
            <div className="h-[120px] w-[120px]">
              <ImageSlider urls={product.imageUrls} />
            </div>
            <div className="flex flex-col gap-3 border-l border-gray-300 border-dashed p-4">
              <h2 className="font-semibold flex items-center gap-2">
                <SlPin /> Updating Product
              </h2>
              <p className="text-sm text-gray-600">
                Remember to include all previous images along with any new ones
                when updating the product.
              </p>
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg px-6 py-7 relative">
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
                    <VscCloudUpload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drag and drop or click to upload images
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    {selectedFiles.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-1"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
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
                      {categories?.data.map((category: IReadCategory) => (
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
                      {productTypes?.data.map((type: IReadProductType) => (
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

          <FormField
            control={form.control}
            name="stockStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stock status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="IN_STOCK">In Stock</SelectItem>
                      <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="statusTag"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status Tag</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status tag" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="sustainable material">
                        Sustainable material
                      </SelectItem>
                      <SelectItem value="just in">Just In</SelectItem>
                      <SelectItem value="coming soon">Coming Soon</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFreeDeliveryAvailable"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Free Delivery</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Is free delivery available?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Free Delivery</SelectLabel>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isCouponApplicable"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Coupon Applicable</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Is coupon applicable?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Coupon Applicable</SelectLabel>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Product Variants</h3>
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
              Add Variant
            </Button>
          </div>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex md:flex-row flex-col gap-4 items-end p-4 bg-gray-50 rounded-lg w-full justify-between"
            >
              <FormField
                control={form.control}
                name={`sizeVariants.${index}.price`}
                render={({ field }) => (
                  <FormItem className="w-full">
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
                  <FormItem className="w-full">
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
                  <FormItem className="w-full">
                    <FormLabel>Color</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors?.data.map((color: IReadColor) => (
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
                  <FormItem className="w-full">
                    <FormLabel>Size</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleSizeChange(index, value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableSizes(index)?.map((size: IReadSize) => (
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
                  <FormItem className="w-full">
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
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="md:w-auto w-full"
              >
                <BiTrash className="h-4 w-4" />
                <span className="sr-only">Remove variant</span>
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Description 1, Description 2"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isCreating || isUpdating}
        >
          {isCreating || isUpdating ? (
            <PiSpinnerLight className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BsDatabaseAdd className="mr-2 h-4 w-4" />
          )}
          {mode === "create" ? "Create Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
