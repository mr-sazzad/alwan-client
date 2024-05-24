"use client";

import { filterSchema } from "@/schemas/filter-schema";

import { colors } from "@/static/product-color";
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
  DialogFooter,
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

const Filter = () => {
  const router = useRouter();
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
      `/t-shirts${queryString ? `?${queryString}` : ""}`,
      undefined
    );
  }, [form, router]);

  useEffect(() => {
    // This ensures effect runs only when watch values change after the initial render
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
              Filter for getting your product easily.
            </DialogDescription>
          </DialogHeader>
          <h2 className="text-2xl font-semibold py-5">Filter By</h2>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="colors"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Color</FormLabel>
                      <FormDescription>
                        Select your Favorite color.
                      </FormDescription>
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
          <DialogFooter>
            <p className="text-sm text-center text-gray-500">
              All right reserved by @alwan
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Filter;
