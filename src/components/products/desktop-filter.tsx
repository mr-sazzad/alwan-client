"use client";

import { filterSchema } from "@/schemas/filter-schema";
import { prices } from "@/static/product-prices";
import { IConvertedColor, IReadColor } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ConvertedColors } from "../utils/convert-color";

interface IFilterProps {
  colorsFromServer: {
    data: IReadColor[];
  };
}

const Filter: React.FC<IFilterProps> = ({ colorsFromServer }) => {
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

  const colors = ConvertedColors(colorsFromServer?.data);

  return (
    <div>
      <h2 className="text-lg font-semibold py-5">Filter by</h2>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="colors"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Colors</FormLabel>
                </div>
                {colors.map((item: IConvertedColor) => (
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
                                  ? field.onChange([...field.value, item.value])
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
                                  ? field.onChange([...field.value, item.id])
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
    </div>
  );
};

export default Filter;
