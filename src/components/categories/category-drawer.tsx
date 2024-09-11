"use client";

import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoies/categoriesApi";
import { categorySchema } from "@/schemas/admins/category-schema";
import { ICreateCategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiSpinnerGapBold } from "react-icons/pi";
import { VscCloudUpload } from "react-icons/vsc";
import { z } from "zod";
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

      const newValues: Partial<ICreateCategory> = {
        isOnHomePage: isOnHomePage === "true",
        isNavigational: isNavigational === "true",
        isLeaf: isLeaf === "true",
      };

      if (name) newValues.name = name;
      if (file) newValues.file = file;
      if (firstTitle) newValues.firstTitle = firstTitle;
      if (secondTitle) newValues.secondTitle = secondTitle;
      if (parentId) newValues.parentId = parentId;

      let response;
      if (mode === "create") {
        response = await createCategory(newValues as ICreateCategory);
      } else {
        response = await updateCategory({
          id: categoryId,
          ...newValues,
        } as ICreateCategory);
      }

      if ("error" in response) {
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

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md mt-2">
          <div className="text-xs text-center mb-2 bg-red-50 border-2 border-red-200 mx-2 rounded px-2 py-3 text-muted-foreground">
            The &apos;isNavigational&apos; and &apos;isLeaf&apos; options should
            not be set to
            <span className="font-medium text-black"> Yeah</span> or
            <span className="font-medium text-black"> Nope</span>.
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-h-[50vh] overflow-y-auto h-full hide-scrollbar space-y-4 w-full px-2 mt-2"
            >
              <FormField
                name="file"
                control={form.control}
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="md:col-span-4 col-span-1">
                    <FormControl>
                      <div className="mb-4 flex justify-center items-center border border-dashed rounded-lg px-5 py-4 relative bg-gray-200">
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                            <SelectItem value="">
                              No categories available
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isNavigational"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Navigational</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Do You Stored Products to this?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">✅ Yeah</SelectItem>
                        <SelectItem value="false">❎ Nope</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* First Title and Second Title fields (unchanged) */}

              <FormField
                control={form.control}
                name="isLeaf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Leaf?</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Do You Stored Products to this?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">✅ Yeah</SelectItem>
                        <SelectItem value="false">❎ Nope</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isOnHomePage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>On Home?</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Do you want to show this on the home page ?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">✅ Yes, I want</SelectItem>
                        <SelectItem value="false">
                          ❎ No, I don&apos;t want
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Yes means you want to show this category on home page
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <PiSpinnerGapBold className="animate-spin" />
                ) : mode === "create" ? (
                  "Create"
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </Form>

          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
