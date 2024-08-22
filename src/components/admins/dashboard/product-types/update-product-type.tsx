"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  useGetAProductTypeQuery,
  useUpdateProductTypeByIdMutation,
} from "@/redux/api/product-types/product-types-api";
import { productTypeSchema } from "@/schemas/admins/product-type-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PiSpinnerLight } from "react-icons/pi";
import { z } from "zod";

interface UpdateProductTypeProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productTypeId: string;
}

const UpdateProductType: React.FC<UpdateProductTypeProps> = ({
  open,
  setOpen,
  productTypeId,
}) => {
  const form = useForm<z.infer<typeof productTypeSchema>>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const { data: productType, isLoading } =
    useGetAProductTypeQuery(productTypeId);

  const [updateProductTypeById, { isLoading: isProductUpdating }] =
    useUpdateProductTypeByIdMutation();

  useEffect(() => {
    if (productType && !isLoading) {
      form.reset({
        name: productType.data.name,
      });
    }
  }, [productType, isLoading, form]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (value: z.infer<typeof productTypeSchema>) => {
    try {
      const response: any = await updateProductTypeById({
        productTypeId,
        ...value,
      });

      if (!response.data.success) {
        toast({
          title: "Error",
          description: "Failed to update product type. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Product type updated successfully.",
        });
        setOpen(false);
        form.reset();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update product type. Please try again later.",
        variant: "destructive",
      });
      setOpen(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto max-w-sm w-full">
          <DrawerHeader>
            <DrawerTitle>Product Type</DrawerTitle>
            <DrawerDescription>Update product type</DrawerDescription>
          </DrawerHeader>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-4 pb-0 space-y-8"
            >
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        "Product Type Loading..."
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isProductUpdating}
              >
                {isProductUpdating ? (
                  <PiSpinnerLight className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </FormProvider>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" disabled={isProductUpdating}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateProductType;
