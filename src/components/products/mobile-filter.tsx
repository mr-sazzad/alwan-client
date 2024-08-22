"use client";

import { useGetAllColorsQuery } from "@/redux/api/color/color-api";
import { filterSchema } from "@/schemas/filter-schema";
import { prices } from "@/static/product-prices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LiaFilterSolid } from "react-icons/lia";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const MobileFilter = () => {
  const router = useRouter();
  const { data: colors, isLoading: isLoading } =
    useGetAllColorsQuery(undefined);
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      colors: [],
      prices: [],
    },
  });

  const { watch } = form;

  const updateQueryParams = useCallback(() => {
    const colorsValue = form.getValues("colors");
    const pricesValue = form.getValues("prices");
    const queryParams = new URLSearchParams();

    if (colorsValue.length) {
      queryParams.set("color", colorsValue.join(","));
    }
    if (pricesValue.length) {
      queryParams.set("price", pricesValue.join(","));
    }

    const queryString = queryParams.toString();
    router.replace(
      `/products${queryString ? `?${queryString}` : ""}`,
      undefined
    );
  }, [form, router]);

  useEffect(() => {
    const subscription = watch(() => {
      updateQueryParams();
    });
    return () => subscription.unsubscribe();
  }, [watch, updateQueryParams]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full flex gap-2 items-center">
            <LiaFilterSolid /> Filter
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded">
          <DialogHeader>
            <h2 className="text-2xl font-semibold mt-2">Filter</h2>
            <DialogDescription>
              for getting your favorite product easily.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="colors"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">By Color</FormLabel>
                    </div>
                    {colors.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="colors"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.value,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prices"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Price</FormLabel>
                      <FormDescription>
                        Select your affordable price.
                      </FormDescription>
                    </div>
                    {prices.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="prices"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileFilter;
