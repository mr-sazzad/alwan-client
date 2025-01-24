"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../../../components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from "../../../../components/ui/use-toast";
import { homeTextSchema } from "../../../../schemas/admins/home-text-schema";
import type { ICategory } from "../../../../types";

const extendedHomeTextSchema = homeTextSchema.extend({ text: z.string() });
type HomeTextFormData = z.infer<typeof extendedHomeTextSchema>;

interface HomeTextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isUpdating: boolean;
  categories: ICategory[];
  onSubmit: (values: HomeTextFormData) => void;
  initialData?: HomeTextFormData | null;
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
      firstTitle: "",
      secondTitle: "",
      text: "",
      buttonText: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        firstTitle: initialData.firstTitle ?? "",
        secondTitle: initialData.secondTitle ?? "",
        categoryId: initialData.categoryId ?? "",
        buttonText: initialData.buttonText ?? "",
        text: Array.isArray(initialData.text)
          ? initialData.text.join(", ")
          : initialData.text || "",
      });
    } else {
      form.reset({
        firstTitle: "",
        secondTitle: "",
        text: "",
        buttonText: "",
        categoryId: "",
      });
    }
  }, [initialData, form]);

  const removeEmptyFields = (data: HomeTextFormData) => {
    return Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "")
    ) as HomeTextFormData;
  };

  const handleSubmit = async (data: HomeTextFormData) => {
    const submissionData: HomeTextFormData = {
      ...data,
      text: data.text.trim()
        ? data.text
            .split(",")
            .map((item) => item.trim())
            .join(", ")
        : "",
    };

    const cleanedData = removeEmptyFields(submissionData);

    try {
      onSubmit(cleanedData);
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again!",
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-4">
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
                name="firstTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Second Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter second title" {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
          <DrawerFooter className="absolute top-3 right-3">
            <DrawerClose asChild>
              <Button className="rounded-full" size="icon">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
