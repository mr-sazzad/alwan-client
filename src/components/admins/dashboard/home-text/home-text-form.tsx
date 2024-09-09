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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { homeTextSchema } from "@/schemas/admins/home-text-schema";
import { IReadCategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const extendedHomeTextSchema = homeTextSchema.extend({ text: z.string() });
type HomeTextFormData = z.infer<typeof extendedHomeTextSchema>;

interface HomeTextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isUpdating: boolean;
  categories: IReadCategory[];
  onSubmit: (values: z.infer<typeof homeTextSchema>) => void;
  initialData?: z.infer<typeof homeTextSchema> | null;
  isLoading: boolean;
}

export default function HomeTextForm({
  open,
  setOpen,
  isUpdating,
  categories,
  onSubmit,
  initialData,
  isLoading,
}: HomeTextProps) {
  const form = useForm<HomeTextFormData>({
    resolver: zodResolver(extendedHomeTextSchema),
    defaultValues: {
      title: "",
      text: "",
      buttonText: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        text: Array.isArray(initialData.text)
          ? initialData.text.join(", ")
          : initialData.text,
      });
    } else {
      form.reset({
        title: "",
        text: "",
        buttonText: "",
        categoryId: "",
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (data: HomeTextFormData) => {
    try {
      onSubmit(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {isUpdating ? "Update Text" : "Create Text"}
            </DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 px-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="SUMMER-2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buttonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text</FormLabel>
                    <FormControl>
                      <Input placeholder="Explore / Shop" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter text items separated by commas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? "Loading..."
                  : isUpdating
                  ? "Update Text"
                  : "Add Text"}
              </Button>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
