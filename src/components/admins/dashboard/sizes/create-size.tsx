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
import { toast } from "@/components/ui/use-toast";
import { useRegisterASizeMutation } from "@/redux/api/size/size-api";
import { sizeSchema } from "@/schemas/admins/size-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateSizeProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSize: React.FC<CreateSizeProps> = ({ open, setOpen }) => {
  const form = useForm<z.infer<typeof sizeSchema>>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: "",
    },
  });

  const [registerASize, { isLoading: isSizeCreating }] =
    useRegisterASizeMutation();

  const onSubmit = async (value: z.infer<typeof sizeSchema>) => {
    try {
      const response: any = await registerASize(value);

      if (!response.data.success) {
        toast({
          title: "Error",
          description: "Failed to create size",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Size created successfully",
        });
        setOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to create size error: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto max-w-sm w-full">
          <DrawerHeader>
            <DrawerTitle>Create Size</DrawerTitle>
            <DrawerDescription>
              Create a new size for your products.
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateSize;
