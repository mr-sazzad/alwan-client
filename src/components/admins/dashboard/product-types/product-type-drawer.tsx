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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  useCreateProductTypeMutation,
  useUpdateProductTypeByIdMutation,
} from "@/redux/api/product-types/product-types-api";
import { productTypeSchema } from "@/schemas/admins/product-type-schema";
import { IProductType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";
import { z } from "zod";

interface ProductTypeDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productType?: IProductType;
}

const ProductTypeDrawer = ({
  open,
  setOpen,
  productType,
}: ProductTypeDrawerProps) => {
  const [createProductType, { isLoading: isCreating }] =
    useCreateProductTypeMutation();
  const [updateProductType, { isLoading: isUpdating }] =
    useUpdateProductTypeByIdMutation();

  const isEditing = !!productType;

  const form = useForm<z.infer<typeof productTypeSchema>>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      name: productType?.name || "",
    },
  });

  useEffect(() => {
    if (productType) {
      form.reset({ name: productType.name });
    } else {
      form.reset({ name: "" });
    }
  }, [productType, form]);

  const onSubmit = async (value: z.infer<typeof productTypeSchema>) => {
    try {
      console.log(value);
      let response;
      if (isEditing && productType) {
        response = await updateProductType({
          id: productType.id,
          ...value,
        }).unwrap();
      } else {
        response = await createProductType(value).unwrap();
      }

      if (response.success) {
        toast({
          title: "Success",
          description: `Product type ${
            isEditing ? "updated" : "created"
          } successfully`,
        });
        setOpen(false);
        form.reset();
      } else {
        throw new Error(response.message || "Operation failed");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message ||
          `Failed to ${isEditing ? "update" : "create"} product type`,
        variant: "destructive",
      });
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-4">
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? "Update" : "Create"} Product Type
            </DrawerTitle>
            <DrawerDescription>
              {isEditing ? "Edit the" : "Create a new"} product type
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-4 pb-0 space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="T-shirt or pant or parjabi"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Each product type must be unique
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mb-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <PiSpinner className="mr-2 h-4 w-4 animate-spin" />
                ) : isEditing ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </Form>
          <DrawerFooter className="absolute top-3 right-3">
            <DrawerClose asChild>
              <Button disabled={isLoading} size="icon" className="rounded-full">
                <X />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductTypeDrawer;
