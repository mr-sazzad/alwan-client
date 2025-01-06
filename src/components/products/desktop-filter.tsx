"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { ConvertedColors } from "../../components/utils/convert-color";
import { useGetAllColorsQuery } from "../../redux/api/color/color-api";
import { prices } from "../../static/product-prices";
import { Separator } from "../ui/separator";

const filterSchema = z.object({
  category: z.string().optional(),
  colors: z.array(z.string()),
  prices: z.array(z.string()),
  sort: z.string().optional(),
});

interface FilterProps {
  categoryId: string;
}

export default function Filter({ categoryId }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAllColors, setShowAllColors] = useState(false);
  const [showAllPrices, setShowAllPrices] = useState(false);

  const { data: colorsData } = useGetAllColorsQuery(undefined);

  const colors = ConvertedColors(colorsData?.data || []);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      category: categoryId,
      colors: [],
      prices: [],
      sort: "",
    },
  });

  useEffect(() => {
    const color = searchParams.get("color");
    const price = searchParams.get("price");
    const sort = searchParams.get("sort");

    form.reset({
      colors: color ? color.split(",") : [],
      prices: price ? price.split(",") : [],
      sort: sort || "",
    });
  }, [searchParams, categoryId, form]);

  useEffect(() => {
    const applyFilters = (values: z.infer<typeof filterSchema>) => {
      const queryParams = new URLSearchParams();

      if (values.category) queryParams.set("category", values.category);
      if (values.colors.length)
        queryParams.set("color", values.colors.join(","));
      if (values.prices.length)
        queryParams.set("price", values.prices.join(","));
      if (values.sort) queryParams.set("sort", values.sort);

      router.push(`/categories/${categoryId}?${queryParams.toString()}`);
    };

    const subscription = form.watch(() => {
      applyFilters(form.getValues());
    });
    return () => subscription.unsubscribe();
  }, [form, router, categoryId]);

  return (
    <Form {...form}>
      <form className="space-y-4 w-full">
        <Accordion
          type="multiple"
          defaultValue={["categories", "sortby", "colors", "prices"]}
          className="w-full"
        >
          <AccordionItem value="sortby" className="border-none">
            <AccordionTrigger className="hover:no-underline text-lg font-medium">
              Sort By
            </AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="sort"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg">
                            Default
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="price_asc" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg">
                            Price: Low to High
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="price_desc" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg">
                            Price: High to Low
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <Separator />
          <AccordionItem value="colors" className="border-none">
            <AccordionTrigger className="hover:no-underline text-lg font-medium">
              Colors
            </AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="colors"
                render={() => (
                  <FormItem className="space-y-2">
                    {colors
                      .slice(0, showAllColors ? undefined : 3)
                      .map((item) => (
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
                              <FormLabel className="text-lg font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    {colors.length > 3 && (
                      <Button
                        type="button"
                        onClick={() => setShowAllColors(!showAllColors)}
                        variant="link"
                        className="px-0"
                      >
                        {showAllColors ? "Show Less" : "Show More"}
                      </Button>
                    )}
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <Separator />
          <AccordionItem value="prices" className="border-none">
            <AccordionTrigger className="hover:no-underline text-lg font-medium">
              Prices
            </AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="prices"
                render={() => (
                  <FormItem className="space-y-2">
                    {prices
                      .slice(0, showAllPrices ? undefined : 3)
                      .map((item) => (
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
                              <FormLabel className="font-normal text-lg">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    {prices.length > 3 && (
                      <Button
                        type="button"
                        onClick={() => setShowAllPrices(!showAllPrices)}
                        variant="link"
                        className="px-0"
                      >
                        {showAllPrices ? "Less" : "More"}
                      </Button>
                    )}
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
}
