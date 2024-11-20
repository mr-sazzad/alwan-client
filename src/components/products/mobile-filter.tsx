"use client";

import { filterSchema } from "@/schemas/filter-schema";
import { prices } from "@/static/product-prices";
import { IColor } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { ConvertedColors } from "../utils/convert-color";

// Extend the filterSchema to include sorting
const extendedFilterSchema = filterSchema.extend({
  sort: z.enum(["", "price_asc", "price_desc"]).default(""),
});

interface MobileFilterProps {
  categoryId: string;
  colorsFromServer: IColor[];
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  categoryId,
  colorsFromServer,
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof extendedFilterSchema>>({
    resolver: zodResolver(extendedFilterSchema),
    defaultValues: {
      colors: [],
      prices: [],
      sort: "",
    },
  });

  const { watch } = form;

  const updateQueryParams = useCallback(() => {
    const colorsValue = form.getValues("colors");
    const pricesValue = form.getValues("prices");
    const sortValue = form.getValues("sort");
    const queryParams = new URLSearchParams();

    if (colorsValue.length) {
      queryParams.set("color", colorsValue.join(","));
    }
    if (pricesValue.length) {
      queryParams.set("price", pricesValue.join(","));
    }
    if (sortValue) {
      queryParams.set("sort", sortValue);
    }

    const queryString = queryParams.toString();
    router.replace(
      `/categories/${categoryId}/${queryString ? `?${queryString}` : ""}`,
      undefined
    );
  }, [form, categoryId, router]);

  useEffect(() => {
    const subscription = watch(() => {
      updateQueryParams();
    });
    return () => subscription.unsubscribe();
  }, [watch, updateQueryParams]);

  const colors = ConvertedColors(colorsFromServer);

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex gap-2 items-center rounded-full py-0"
          >
            <p className="text-lg">Filter</p>
            <PiSlidersHorizontalBold size={18} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded">
          <DrawerHeader>
            <h2 className="text-xl font-medium mt-2">Filter</h2>
          </DrawerHeader>
          <Form {...form}>
            <form className="space-y-8 px-4 mb-10">
              <FormField
                control={form.control}
                name="sort"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Sort by</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="price_asc" />
                          </FormControl>
                          <FormLabel className="font-normal text-[17px]">
                            Price: Low to High
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="price_desc" />
                          </FormControl>
                          <FormLabel className="font-normal text-[17px]">
                            Price: High to Low
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="colors"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Color</FormLabel>
                    </div>
                    {colors?.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="colors"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-center space-x-3 space-y-0"
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
                              <FormLabel className="text-[17px] font-normal">
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
              <Separator />
              <FormField
                control={form.control}
                name="prices"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Price</FormLabel>
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
                              className="flex flex-row items-center space-x-3 space-y-0"
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
                              <FormLabel className="text-[17px] font-normal">
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
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileFilter;
