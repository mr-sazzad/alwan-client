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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useGetSingleSizeQuery,
  useUpdateSingleSizeMutation,
} from "@/redux/api/size/size-api";
import { sizeUpdateSchema } from "@/schemas/admins/size-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BsCheck } from "react-icons/bs";
import { PiSpinnerLight } from "react-icons/pi";

interface SizeUpdateDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sizeId: string;
}

const SizeUpdateDrawer: React.FC<SizeUpdateDrawerProps> = ({
  open,
  setOpen,
  sizeId,
}) => {
  const [updateSingleSize, { isLoading: isUpdating }] =
    useUpdateSingleSizeMutation();

  const { data: size, isLoading } = useGetSingleSizeQuery(sizeId);

  const form = useForm<z.infer<typeof sizeUpdateSchema>>({
    resolver: zodResolver(sizeUpdateSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (size && !isLoading) {
      form.reset({
        name: size.data.name,
      });
    }
  }, [size, isLoading, form]);

  const onSubmit = (data: any) => {
    updateSingleSize({ id: sizeId, ...data });
    form.reset();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto max-w-sm w-full">
          <DrawerHeader>
            <DrawerTitle>Update Size</DrawerTitle>
            <DrawerDescription>Update product size</DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-5 flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1 md:w-auto">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isUpdating}>
                {isUpdating ? (
                  <PiSpinnerLight className="animate-spin" />
                ) : (
                  <div className="flex gap-2 items-center">
                    <BsCheck size={20} /> Update
                  </div>
                )}
              </Button>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose>
              <Button
                className="w-full"
                variant="outline"
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SizeUpdateDrawer;
