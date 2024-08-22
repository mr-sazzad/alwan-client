"use client";

import { useCreateCategoryMutation } from "@/redux/api/categoies/categoriesApi";
import { categorySchema } from "@/schemas/admins/category-schema";
import { ICreateCategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
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

import { PiSpinnerGapBold } from "react-icons/pi";

interface UpdateCategoryDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: string;
  categories: any;
}

const UpdateCategoryDrawer: React.FC<UpdateCategoryDrawerProps> = ({
  open,
  setOpen,
  categoryId,
  categories,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      file: null,
      parentId: "",
      clientUrl: "",
      firstTitle: "",
      secondTitle: "",
      isOnHomePage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      const {
        name,
        file,
        parentId,
        clientUrl,
        firstTitle,
        secondTitle,
        isOnHomePage,
      } = values;
      const booleanIsOnHomePage = isOnHomePage === "true";

      const newValues: Partial<ICreateCategory> = {
        isOnHomePage: booleanIsOnHomePage,
      };

      if (name) newValues.name = name;
      if (file) newValues.file = file;
      if (firstTitle) newValues.firstTitle = firstTitle;
      if (secondTitle) newValues.secondTitle = secondTitle;
      if (parentId) newValues.parentId = parentId;
      if (clientUrl) newValues.clientUrl = clientUrl;

      const response: any = await createCategory(newValues);

      if (!response.data.success) {
        toast({
          title: "Error Message",
          description: "Something went wrong, please try again",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Category created successfully",
        });

        form.reset();
        setSelectedFile(null);
      }
    } catch (error: any) {
      toast({
        title: "Error Message",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-2 flex flex-col gap-2 max-h-[50vh] overflow-y-auto h-full hide-scrollbar"
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
                        onChange={(event) =>
                          onChange(
                            event.target.files && event.target.files[0],
                            setSelectedFile(
                              event.target.files && event.target.files[0]
                            )
                          )
                        }
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
            <div className="flex md:gap-5 sm:gap-3 sm:flex-row flex-col">
              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem className="flex-1 md:w-auto">
                    <FormLabel>Parent ID</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Parent ID" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Parent ID</SelectLabel>
                          {categories?.data?.map((category: any) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientUrl"
                render={({ field }) => (
                  <FormItem className="flex-1 md:w-auto">
                    <FormLabel>Client URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="/products/t-shirt"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="firstTitle"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>First Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="first title goes here"
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
              name="secondTitle"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-auto">
                  <FormLabel>Second Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="second Title goes here"
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
              name="isOnHomePage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>On Home?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                    yes means you want to show this category on home page
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <PiSpinnerGapBold className="animate-spin" />
              ) : (
                "Save"
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
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateCategoryDrawer;
