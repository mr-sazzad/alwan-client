"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterACarouselMutation } from "@/redux/api/carousel/carouselApi";
import { carouselSchema } from "@/schemas/admins/carousel-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { GoShieldCheck } from "react-icons/go";
import { VscCloudUpload } from "react-icons/vsc";
import { z } from "zod";

interface AddCarouselDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  carouselId?: string;
}

const AddCarouselDrawer: React.FC<AddCarouselDrawerProps> = ({
  open,
  setOpen,
  carouselId,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [registerACarousel, { isLoading }] = useRegisterACarouselMutation();

  const form = useForm<z.infer<typeof carouselSchema>>({
    resolver: zodResolver(carouselSchema),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const result = await registerACarousel(formData).unwrap();
      setOpen(false);
    } catch (error) {
      console.error("Error uploading carousel:", error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm mt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                name="files"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="md:col-span-4 col-span-1">
                    <FormControl>
                      <div className="mb-4 flex justify-center items-center border border-dashed rounded-lg px-5 py-8 relative">
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute w-full h-full opacity-0"
                          onChange={(e) => {
                            const filesArray = Array.from(e.target.files || []);
                            setSelectedFiles(filesArray);
                            field.onChange(filesArray);
                          }}
                          multiple
                        />
                        <div className="flex flex-col gap-2 items-center">
                          <VscCloudUpload size="30" />
                          <p className="ml-2 text-sm text-gray-500">
                            JPEG, PNG, GIF up to 10MB
                          </p>
                          <p className="ml-2 text-sm text-gray-500">
                            Hold the CTRL button to select multiple images
                          </p>

                          {selectedFiles.length > 0 && (
                            <div className="rounded flex gap-1 bg-slate-100 py-1 px-2 mt-2">
                              {selectedFiles.map((file, index) => (
                                <p
                                  key={index}
                                  className="text-gray-600 text-sm font-thin"
                                >
                                  {file.name}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                <div className="flex gap-2 items-center">
                  <GoShieldCheck size={20} /> Create Carousel
                </div>
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

export default AddCarouselDrawer;
