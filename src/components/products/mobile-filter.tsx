"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { z } from "zod";
import { filterSchema } from "../../schemas/filter-schema";
import { prices } from "../../static/product-prices";
import { IColor } from "../../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
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
  const [showAllPrices, setShowAllPrices] = useState(false);

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

  const visiblePrices = showAllPrices ? prices : prices.slice(0, 3);

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex gap-2 items-center rounded-full py-0"
          >
            <p className="text-lg">Filter</p>
            <PiSlidersHorizontalBold size={18} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded">
          <DrawerHeader>
            <h2 className="text-lg font-medium mt-2 text-start">Filter</h2>
          </DrawerHeader>
          <Form {...form}>
            <form className="space-y-4 px-4 mb-10">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sort">
                  <AccordionTrigger>Sort by</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="sort"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
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
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="colors">
                  <AccordionTrigger>Color</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="colors"
                      render={() => (
                        <FormItem>
                          {colors?.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="colors"
                              render={({ field }) => (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        item.value
                                      )}
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
                              )}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prices">
                  <AccordionTrigger>Price</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="prices"
                      render={() => (
                        <FormItem>
                          {visiblePrices.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="prices"
                              render={({ field }) => (
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
                              )}
                            />
                          ))}
                          {prices.length > 3 && (
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => setShowAllPrices(!showAllPrices)}
                              className="mt-2"
                            >
                              {showAllPrices ? "Less" : "More"}
                            </Button>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </Form>
          <DrawerFooter className="absolute right-0 top-5">
            <DrawerClose>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileFilter;
