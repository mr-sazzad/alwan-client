"use client";

import Loading from "@/app/loading";
import ImageSlider from "@/components/cards/image-slider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { productSchema } from "@/schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VscCloudUpload } from "react-icons/vsc";
import { z } from "zod";

import ColorSelector from "@/components/select/color-select";
import DeliveryFeeSelector from "@/components/select/delivery-select";
import AvailabilityStatusSelector from "@/components/select/select-availavility-status";
import SizeSelector from "@/components/select/size-select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { convertSizesToSelectorFormat } from "@/helpers/convert-sizes-to-selector-format";
import { availabilityStatus } from "@/static/availability-status";
import { colorOptions } from "@/static/colors";
import { deliveryOptions } from "@/static/delivery-options";
import { sizeOptions } from "@/static/sizes";
import { BsDatabaseAdd } from "react-icons/bs";
import { SlPin } from "react-icons/sl";

const UpdateProductPage = () => {
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [deliveryFee, setDeliveryFee] = useState<boolean>();
  const [productAvailability, setProductAvailability] = useState<string>();

  const { data: product, isLoading } = useGetSingleProductQuery(id);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [] as File[],
      name: product && product.name,
      sizes: [],
      prices: "",
      color: "black",
      isFreeDelivaryAvailable: "no",
      status: "in_stock",
      mSizeStocks: "",
      lSizeStocks: "",
      xlSizeStocks: "",
      xxlSizeStocks: "",
      features: "",
      desc: "",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        prices: product.prices,
      });
    }
  }, [product, form.reset]);

  if (isLoading) {
    return <Loading />;
  }

  const handleSelectSizes = (values: string[]) => {
    console.log(values);
    setSelectedSizes(values);
  };

  const handleSelectColor = (value: string) => {
    console.log(value);
    setSelectedColor(value);
  };

  const handleSelectDeliveryFee = (value: string) => {
    console.log(value);
    if (value === "yes") {
      setDeliveryFee(true);
    } else setDeliveryFee(false);
  };

  const handleSelectAvailability = (value: string) => {
    setProductAvailability(value);
  };

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    const finalData = {
      name: data.name,
    };
  };

  return (
    <div>
      <div className="flex gap-5 md:flex-row flex-col mb-4 bg-gray-200 border-black/50 border border-dashed rounded-lg overflow-hidden p-1">
        <div className="h-[120px] w-[120px]">
          <ImageSlider urls={product.images} />
        </div>
        <div className="flex flex-col gap-3 border-l border-black/50 border-dashed p-5">
          <h1 className="font-semibold flex items-center gap-1">
            <SlPin /> Remember when updating a prouduct
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            You have to remember when you are updatin a product please add all
            previous images and also mew images
          </p>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Image field */}
            <FormField
              name="images"
              control={form.control}
              render={({ field }) => (
                <FormItem className="md:col-span-4 col-span-1">
                  <FormLabel>Upload Images</FormLabel>
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
                  {selectedFiles.length > 0 && (
                    <div className="rounded-lg flex gap-1 bg-slate-200 py-2 border border-dashed px-4">
                      <p className="font-medium text-sm">Selected files: </p>
                      {selectedFiles.map((file, index) => (
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
              {/* name filed */}
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
              <div className="flex-1 w-full">
                <SizeSelector
                  title="Select Sizes"
                  placeholder="Select Sizes..."
                  multiple={true}
                  options={sizeOptions}
                  defaultValue={convertSizesToSelectorFormat(product.sizes)}
                  closeMenuOnSelect={false}
                  handleSelect={handleSelectSizes}
                  name="sizes"
                />
              </div>

              <FormField
                control={form.control}
                name="prices"
                render={({ field }) => (
                  <FormItem className="flex-1 md:w-auto">
                    <FormLabel>Prices</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="750 , 560"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 w-full">
                <ColorSelector
                  title="Select Color"
                  placeholder="Select Color..."
                  options={colorOptions}
                  closeMenuOnSelect
                  handleSelect={handleSelectColor}
                  name="color"
                />
              </div>

              <div className="flex-1 w-full">
                <DeliveryFeeSelector
                  title="Delivery Free ?"
                  placeholder="Select Yes or No..."
                  options={deliveryOptions}
                  closeMenuOnSelect
                  handleSelect={handleSelectDeliveryFee}
                  name="isFreeDelivaryAvailable"
                />
              </div>

              <div className="flex-1 w-full">
                <AvailabilityStatusSelector
                  title="Product Availability"
                  placeholder="Select availability"
                  options={availabilityStatus}
                  closeMenuOnSelect
                  handleSelect={handleSelectAvailability}
                  name="isFreeDelivaryAvailable"
                />
              </div>
            </div>

            <div>
              <p className="text-sm mb-[7px]">Total Stocks Info</p>

              <div className="flex flex-col md:flex-row gap-4 w-full border border-dashed p-5 rounded-lg">
                <FormField
                  control={form.control}
                  name="mSizeStocks"
                  render={({ field }) => (
                    <FormItem className="flex-1 md:w-auto">
                      <FormLabel>M Size Stocks</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="100"
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
                  name="lSizeStocks"
                  render={({ field }) => (
                    <FormItem className="flex-1 md:w-auto">
                      <FormLabel>L Size Stocks</FormLabel>
                      <FormControl>
                        <Input placeholder="70" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="xlSizeStocks"
                  render={({ field }) => (
                    <FormItem className="flex-1 md:w-auto">
                      <FormLabel>XL Size Stocks</FormLabel>
                      <FormControl>
                        <Input placeholder="40" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="xxlSizeStocks"
                  render={({ field }) => (
                    <FormItem className="flex-1 md:w-auto">
                      <FormLabel>XXL Size Stocks</FormLabel>
                      <FormControl>
                        <Input placeholder="10" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desc"
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
                Upload This Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProductPage;
