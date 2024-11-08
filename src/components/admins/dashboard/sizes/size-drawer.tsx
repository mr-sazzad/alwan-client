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
  useRegisterSizeMutation,
  useUpdateSizeMutation,
} from "@/redux/api/size/size-api";
import { sizeSchema } from "@/schemas/admins/size-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";
import { z } from "zod";

interface SizeDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: { id: string; name: string };
}

const SizeDrawer: React.FC<SizeDrawerProps> = ({ open, setOpen, size }) => {
  const form = useForm<z.infer<typeof sizeSchema>>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: "",
    },
  });

  const [registerSize, { isLoading: isCreating }] = useRegisterSizeMutation();
  const [updateSize, { isLoading: isUpdating }] = useUpdateSizeMutation();

  useEffect(() => {
    if (size) {
      form.reset({ name: size.name });
    } else {
      form.reset({ name: "" });
    }
  }, [size, form]);

  const onSubmit = async (value: z.infer<typeof sizeSchema>) => {
    try {
      let response: any;
      if (size) {
        response = await updateSize({ id: size.id, ...value });
      } else {
        response = await registerSize(value);
      }

      if (!response?.data.success) {
        toast({
          title: "Error",
          description: `Failed to ${size ? "update" : "create"} size`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Size ${size ? "updated" : "created"} successfully`,
        });
        setOpen(false);
        form.reset();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to ${size ? "update" : "create"} size: ${
          error.message
        }`,
        variant: "destructive",
      });
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto max-w-sm w-full py-4">
          <DrawerHeader>
            <DrawerTitle>{size ? "Update Size" : "Create Size"}</DrawerTitle>
            <DrawerDescription>
              {size
                ? "Update an existing size."
                : "Create a new size for your products."}
            </DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 p-4 pb-0"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter size name" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Each size must be unique
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <PiSpinner className="animate-spin" />
                ) : size ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </Form>
          <DrawerFooter className="absolute top-3 right-3">
            <DrawerClose asChild>
              <Button className="rounded-full" size="icon">
                <X />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SizeDrawer;
