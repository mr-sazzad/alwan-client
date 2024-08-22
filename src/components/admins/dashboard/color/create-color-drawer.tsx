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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { colorSchema } from "@/schemas/admins/color-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateColorDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateColorDrawer: React.FC<CreateColorDrawerProps> = ({
  open,
  setOpen,
}) => {
  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      hexCode: "",
    },
  });

  const onSubmit = () => {
    console.log("onSubmit");
    // form.reset();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="max-w-sm w-full mx-auto">
          <DrawerHeader>
            <DrawerTitle>Create Color</DrawerTitle>
            <DrawerDescription>
              Create a new color for your products
            </DrawerDescription>
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Black / White"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex md:gap-5 sm:gap-3 sm:flex-row flex-col">
                <FormField
                  control={form.control}
                  name="hexCode"
                  render={({ field }) => (
                    <FormItem className="flex-1 md:w-auto">
                      <FormLabel>Hex code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="#000000"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </Form>

          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full" variant="secondary">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateColorDrawer;
