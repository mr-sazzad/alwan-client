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
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { sizeOptions } from "@/static/sizes";
import { useState } from "react";

import { BsDatabaseAdd } from "react-icons/bs";
import { VscCloudUpload } from "react-icons/vsc";

// react select
import ColorSelector from "@/components/select/color-select";
import DeliveryFeeSelector from "@/components/select/delivery-select";
import AvailabilityStatusSelector from "@/components/select/select-availavility-status";
import SizeSelector from "@/components/select/size-select";
import { Textarea } from "@/components/ui/textarea";
import { convertToArray } from "@/helpers/convert-to-array";
import { availabilityStatus } from "@/static/availability-status";
import { colorOptions } from "@/static/colors";
import { deliveryOptions } from "@/static/delivery-options";

const Page = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [deliveryFee, setDeliveryFee] = useState<boolean>();
  const [productAvailability, setProductAvailability] = useState<string>();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [] as File[],
      name: "",
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

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    const finalData = {
      images: data.images,
      name: data.name,
      sizes: selectedSizes,
      mSizeStocks: Number(data.mSizeStocks),
      lSizeStocks: Number(data.lSizeStocks),
      xlSizeStocks: Number(data.xlSizeStocks),
      xxlSizeStocks: Number(data.xxlSizeStocks),
      prices: convertToArray(true, data.prices),
      color: selectedColor,
      isFreeDelivaryAvailable: deliveryFee,
      status: productAvailability,
      features: convertToArray(false, data.features),
      desc: convertToArray(false, data.desc),
    };

    // perform the add functionality
  };

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

  return (
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
                    <Input placeholder="100" {...field} className="w-full" />
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
  );
};

export default Page;
