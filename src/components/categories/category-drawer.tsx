"use client";

import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoies/categoriesApi";
import { categorySchema } from "@/schemas/admins/category-schema";
import { ICategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiSpinnerGapBold } from "react-icons/pi";
import { VscCloudUpload } from "react-icons/vsc";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "../ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";

interface CategoryDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  categoryId?: string;
  categories: any[];
  mode: "create" | "update";
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  open,
  setOpen,
  categoryId,
  categories,
  mode,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const { data: response, isLoading: isFetching } = useGetCategoryQuery(
    categoryId,
    { skip: !categoryId }
  );

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      file: null,
      parentId: "",
      firstTitle: "",
      secondTitle: "",
      isOnHomePage: "",
      isLeaf: "",
      isNavigational: "",
    },
  });

  useEffect(() => {
    if (mode === "create") {
      form.reset({
        name: "",
        file: null,
        parentId: "",
        firstTitle: "",
        secondTitle: "",
        isOnHomePage: "",
        isLeaf: "",
        isNavigational: "",
      });
    } else if (mode === "update" && response?.data) {
      form.reset({
        name: response.data.name || "",
        parentId: response.data.parentId || "",
        firstTitle: response.data.firstTitle || "",
        secondTitle: response.data.secondTitle || "",
        isOnHomePage: response.data.isOnHomePage ? "true" : "false",
        isLeaf: response.data.isLeaf ? "true" : "false",
        isNavigational: response.data.isNavigational ? "true" : "false",
      });
    }
  }, [mode, response?.data, form]);

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      const {
        name,
        file,
        parentId,
        firstTitle,
        secondTitle,
        isOnHomePage,
        isNavigational,
        isLeaf,
      } = values;

      if (isLeaf === "true" && !parentId) {
        toast({
          title: "Error",
          description: "Leaf categories must have a parent category",
          variant: "destructive",
        });
        return;
      }

      if (isOnHomePage === "true" && !file) {
        toast({
          title: "Error",
          description: "Categories shown on home page must have an image",
          variant: "destructive",
        });
        return;
      }

      if (
        isLeaf === "true" &&
        isOnHomePage === "true" &&
        (!firstTitle || !secondTitle)
      ) {
        toast({
          title: "Error",
          description:
            "Leaf categories shown on home page must have both first and second titles",
          variant: "destructive",
        });
        return;
      }

      const newValues: Partial<ICategory> = {
        isOnHomePage: isOnHomePage === "true",
        isNavigational: isNavigational === "true",
        isLeaf: isLeaf === "true",
      };

      if (name) newValues.name = name;
      if (file) newValues.file = file;
      if (firstTitle) newValues.firstTitle = firstTitle;
      if (secondTitle) newValues.secondTitle = secondTitle;
      if (parentId) newValues.parentId = parentId;

      let response: any;
      if (mode === "create") {
        response = await createCategory(newValues as ICategory);
      } else {
        response = await updateCategory({
          id: categoryId,
          ...newValues,
        } as ICategory);
      }

      if (!response.data.success) {
        toast({
          title: "Error Message",
          description: "Something went wrong, please try again",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Category ${
            mode === "create" ? "created" : "updated"
          } successfully`,
        });

        form.reset();
        setSelectedFile(null);
        setOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Error Message",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }
  };

  const isLoading = isCreating || isUpdating || isFetching;

  const watchIsLeaf = form.watch("isLeaf");
  const watchIsNavigational = form.watch("isNavigational");
  const watchIsOnHomePage = form.watch("isOnHomePage");

  useEffect(() => {
    if (watchIsLeaf === "true") {
      form.setValue("isNavigational", "false");
    } else if (watchIsLeaf === "false") {
      form.setValue("isNavigational", "true");
    }
  }, [watchIsLeaf, form]);

  useEffect(() => {
    if (watchIsNavigational === "true") {
      form.setValue("isLeaf", "false");
    } else if (watchIsNavigational === "false") {
      form.setValue("isLeaf", "true");
    }
  }, [watchIsNavigational, form]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md mt-2 py-4">
          <Alert variant="destructive" className="mb-4 dark:text-red-600">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important Note</AlertTitle>
            <AlertDescription>
              Please be cautious when setting &apos;isNavigational&apos; and
              &apos;isLeaf&apos; options. These settings have significant
              implications for category behavior and structure.
            </AlertDescription>
          </Alert>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-h-[50vh] overflow-y-auto h-full hide-scrollbar space-y-4 w-full px-2 mt-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1 md:w-auto">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category Name"
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
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent ID</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Parent ID" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Parent ID</SelectLabel>
                          {categories && categories.length > 0 ? (
                            categories.map((category: any) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-categories">
                              No categories available
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isLeaf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Leaf?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Is this a leaf category?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">
                          Yes, it&apos;s a leaf category
                        </SelectItem>
                        <SelectItem value="false">
                          No, it&apos;s not a leaf category
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      A leaf category is one that doesn&apos;t have any
                      subcategories.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isNavigational"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Navigational</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Is this a navigational category?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">
                          Yes, it&apos;s navigational
                        </SelectItem>
                        <SelectItem value="false">
                          No, it&apos;s not navigational
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      A navigational category is used for organizing
                      subcategories.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchIsLeaf === "true" && (
                <FormField
                  control={form.control}
                  name="isOnHomePage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>On Home?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Do you want to show this on the home page?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">
                            Yes, show on home page
                          </SelectItem>
                          <SelectItem value="false">
                            No, don&apos;t show on home page
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {watchIsOnHomePage === "true" && (
                <FormField
                  name="file"
                  control={form.control}
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="md:col-span-4 col-span-1">
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <div className="mb-4 flex justify-center items-center border border-dashed rounded-lg px-5 py-4 relative bg-gray-200 dark:bg-gray-900">
                          <Input
                            type="file"
                            {...fieldProps}
                            accept="image/*"
                            className="absolute w-full h-full opacity-0"
                            onChange={(event) => {
                              const file =
                                event.target.files && event.target.files[0];
                              onChange(file);
                              setSelectedFile(file);
                            }}
                          />
                          <div className="flex flex-col gap-2 items-center">
                            <VscCloudUpload size="30" />
                            <p className="ml-2 text-sm text-gray-500">
                              JPEG, PNG, GIF up to 2MB
                            </p>
                            {selectedFile && <p>{selectedFile.name}</p>}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {watchIsLeaf === "true" && watchIsOnHomePage === "true" && (
                <>
                  <FormField
                    control={form.control}
                    name="firstTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Title</FormLabel>
                        <FormControl>
                          <Input placeholder="First Title" {...field} />
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
                        <FormLabel>Second Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Second Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <PiSpinnerGapBold className="animate-spin" />
                ) : mode === "create" ? (
                  "Create Category"
                ) : (
                  "Update Category"
                )}
              </Button>
            </form>
          </Form>

          <DrawerFooter className="absolute top-2 right-2">
            <DrawerClose>
              <Button className="rounded-full" disabled={isLoading} size="icon">
                <X />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
