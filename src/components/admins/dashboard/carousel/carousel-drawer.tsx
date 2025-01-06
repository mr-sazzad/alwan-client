"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { GoShieldCheck } from "react-icons/go";
import { PiSpinner } from "react-icons/pi";
import { VscCloudUpload } from "react-icons/vsc";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "../../../../components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { toast } from "../../../../components/ui/use-toast";
import {
  useRegisterACarouselMutation,
  useUpdateCarouselMutation,
} from "../../../../redux/api/carousel/carouselApi";
import { carouselSchema } from "../../../../schemas/admins/carousel-schema";

interface CarouselDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  carouselId?: string;
  isUpdate: boolean;
}

const CarouselDrawer: React.FC<CarouselDrawerProps> = ({
  open,
  setOpen,
  carouselId,
  isUpdate,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [registerACarousel, { isLoading: isCreating }] =
    useRegisterACarouselMutation();
  const [updateCarousel, { isLoading: isUpdating }] =
    useUpdateCarouselMutation();

  const form = useForm<z.infer<typeof carouselSchema>>({
    resolver: zodResolver(carouselSchema),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = async () => {
    const formData = new FormData();

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => formData.append("files", file));
    } else if (isUpdate) {
      formData.append("noNewFiles", "true");
    }

    try {
      let result;
      if (isUpdate && carouselId) {
        formData.append("id", carouselId);

        result = await updateCarousel({
          id: carouselId,
          data: formData,
        }).unwrap();
      } else {
        result = await registerACarousel(formData).unwrap();
      }

      if (!result.success) {
        toast({
          title: "Error",
          description:
            result.message ||
            `Failed to ${isUpdate ? "update" : "upload"} carousel`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Carousel ${
            isUpdate ? "updated" : "uploaded"
          } successfully`,
        });
        setOpen(false);
        setSelectedFiles([]);
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isUpdate ? "update" : "upload"} carousel`,
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="max-w-sm w-full mx-auto mt-10">
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
                      <div className="mb-4 flex justify-center items-center border border-dashed rounded-lg px-5 py-4 relative">
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
                          <p className="ml-2 text-sm text-gray-500 text-center">
                            Hold{" "}
                            <span className="bg-orange-100 px-1 py-1 rounded text-orange-600 text-xs font-semibold">
                              CTRL
                            </span>{" "}
                            <span className="text-destructive">
                              btn to select multiple files you have to just give
                              2 files one for desktop and one for mobile screen
                            </span>
                          </p>

                          {selectedFiles.length > 0 && (
                            <div className="rounded flex flex-wrap gap-1 py-1 px-2 mt-2">
                              {selectedFiles.map((file, index) => (
                                <p
                                  key={index}
                                  className="text-muted-foreground text-sm"
                                >
                                  {file.name}
                                  {index < selectedFiles.length - 1 ? "," : ""}
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
              <Button
                type="submit"
                className="w-full mb-4"
                disabled={isCreating || isUpdating}
              >
                <div className="flex gap-2 items-center">
                  {isCreating || isUpdating ? (
                    <PiSpinner className="animate-spin" />
                  ) : (
                    <GoShieldCheck size={20} />
                  )}
                  <span>{isUpdate ? "Update" : "Create"} Carousel</span>
                </div>
              </Button>
            </form>
          </Form>

          <DrawerFooter className="absolute top-2 right-2">
            <DrawerClose>
              <Button
                className="w-full rounded-full px-2"
                variant="secondary"
                size="icon"
              >
                <X />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CarouselDrawer;
