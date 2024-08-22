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
import { useCreateAProductTypeMutation } from "@/redux/api/product-types/product-types-api";
import { productTypeSchema } from "@/schemas/admins/product-type-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { PiSpinnerLight } from "react-icons/pi";

interface CreateproductTypeProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProductType: React.FC<CreateproductTypeProps> = ({
  open,
  setOpen,
}) => {
  const [createAProductType, { isLoading }] = useCreateAProductTypeMutation();
  const form = useForm<z.infer<typeof productTypeSchema>>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof productTypeSchema>) => {
    try {
      const response: any = await createAProductType(value);

      if (!response.data.success) {
        toast({
          title: "Error",
          description: "Failed to create product type",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Product type created successfully",
        });
        setOpen(false);
        form.reset();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Product Type</DrawerTitle>
            <DrawerDescription>Create product type</DrawerDescription>
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
                  <PiSpinnerLight className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateProductType;
