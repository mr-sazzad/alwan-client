"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
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
  useCreateNewColorMutation,
  useUpdateColorMutation,
} from "@/redux/api/color/color-api";
import { colorSchema } from "@/schemas/admins/color-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";
import { z } from "zod";

interface ColorDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  color?: { id: string; name: string; hexCode: string };
}

const ColorDrawer: React.FC<ColorDrawerProps> = ({ open, setOpen, color }) => {
  const [createNewColor, { isLoading: isCreating }] =
    useCreateNewColorMutation();
  const [updateColor, { isLoading: isUpdating }] = useUpdateColorMutation();

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      hexCode: "",
    },
  });

  useEffect(() => {
    if (color) {
      form.reset({
        name: color.name,
        hexCode: color.hexCode,
      });
    } else {
      form.reset({
        name: "",
        hexCode: "",
      });
    }
  }, [color, form]);

  const onSubmit = async (values: z.infer<typeof colorSchema>) => {
    let result: any;
    if (color) {
      result = await updateColor({ id: color.id, ...values });
    } else {
      result = await createNewColor(values);
    }

    if (!result.data.success) {
      toast({
        title: color ? "Update Unsuccessful" : "Creation Unsuccessful",
        description: `There was an issue ${
          color ? "updating" : "creating"
        } the color. Please try again later.`,
        variant: "destructive",
      });
    } else {
      toast({
        title: color
          ? "Color Updated Successfully"
          : "Color Created Successfully",
        description: `The color has been ${
          color ? "updated" : "successfully added"
        } to your collection.`,
      });

      setOpen(false);
      form.reset();
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="max-w-sm w-full mx-auto py-4">
          <DrawerHeader>
            <DrawerTitle>{color ? "Update Color" : "Create Color"}</DrawerTitle>
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
                    <FormDescription className="text-xs">
                      Each hex code must be unique
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <PiSpinner className="animate-spin" />
                ) : color ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </Form>

          <DrawerFooter className="absolute top-4 right-4">
            <DrawerClose>
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

export default ColorDrawer;
