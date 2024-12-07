"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CouponSchema } from "@/schemas/admins/coupon-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiLoaderLine } from "react-icons/ri";
import { z } from "zod";

interface CouponFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categories: { id: string; name: string }[];
  products: { id: string; name: string }[];
  isUpdating: boolean;
  couponData?: z.infer<typeof CouponSchema> | null;
  onSubmit: (data: z.infer<typeof CouponSchema>) => Promise<void>;
}

export default function CouponForm({
  open,
  setOpen,
  categories,
  products,
  isUpdating,
  couponData,
  onSubmit,
}: CouponFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CouponSchema>>({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      code: "",
      discountType: "PERCENTAGE",
      type: "PRODUCT",
      discountValue: 0,
      startDate: new Date(),
      endDate: new Date(),
      categories: [],
      products: [],
      usageLimit: 0,
      minOrderValue: 0,
      usedCount: 0,
    },
  });

  useEffect(() => {
    if (isUpdating && couponData) {
      form.reset(couponData);
    } else {
      form.reset({
        code: "",
        discountType: "PERCENTAGE",
        discountValue: 0,
        type: "PRODUCT",
        startDate: new Date(),
        endDate: new Date(),
        categories: [],
        products: [],
        usageLimit: 0,
        minOrderValue: 0,
        usedCount: 0,
      });
    }
  }, [isUpdating, couponData, form]);

  const handleSubmit = async (data: z.infer<typeof CouponSchema>) => {
    console.log("Submitting data:", data);
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        categories: data.type === "CATEGORY" ? data.categories : undefined,
        products: data.type === "PRODUCT" ? data.products : undefined,
      };

      // Remove categories and products if they're not needed
      if (data.type !== "CATEGORY") delete formattedData.categories;
      if (data.type !== "PRODUCT") delete formattedData.products;

      await onSubmit(formattedData);
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const couponType = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-full h-[85vh] overflow-y-auto hide-scrollbar rounded">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            {isUpdating ? "Update Coupon" : "Create New Coupon"}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 pb-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input placeholder="SUMMER-2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            <SelectItem value="GLOBAL">
                              Global Coupon
                            </SelectItem>
                            <SelectItem value="DELIVERY">
                              Delivery Coupon
                            </SelectItem>
                            <SelectItem value="CATEGORY">
                              Category Coupon
                            </SelectItem>
                            <SelectItem value="PRODUCT">
                              Product Coupon
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            <SelectItem value="PERCENTAGE">
                              Percentage
                            </SelectItem>
                            <SelectItem value="FIXED">Fixed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount value</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="3.0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-2">
                      <FormLabel>Start Date</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-2">
                      <FormLabel>End Date</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <= form.getValues("startDate") ||
                              date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {couponType === "CATEGORY" && (
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <Controller
                          name="categories"
                          control={form.control}
                          render={({ field }) => (
                            <MultiSelect
                              options={categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                              }))}
                              onValueChange={(newValue) =>
                                field.onChange(newValue)
                              }
                              defaultValue={field.value || []}
                              placeholder="Select categories"
                              modalPopover={true}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {couponType === "PRODUCT" && (
                <FormField
                  control={form.control}
                  name="products"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Products</FormLabel>
                      <FormControl>
                        <Controller
                          name="products"
                          control={form.control}
                          render={({ field }) => (
                            <MultiSelect
                              options={products.map((product) => ({
                                label: product.name,
                                value: product.id,
                              }))}
                              onValueChange={(newValue) =>
                                field.onChange(newValue)
                              }
                              defaultValue={field.value || []}
                              placeholder="Select products"
                              modalPopover={true}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="usageLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minOrderValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Order Value</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                {isLoading ? (
                  <RiLoaderLine className="animate-spin h-5 w-5" />
                ) : isUpdating ? (
                  "Update Coupon"
                ) : (
                  "Create Coupon"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
