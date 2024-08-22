"use client";

import { IReadCategory } from "@/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import AdminDashboardLoading from "../lodings/admin-dashboard-loding";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "../ui/drawer";

interface CategoryDetailsDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  category: IReadCategory;
  loading: boolean;
}

const CategoryDetailsDrawer: React.FC<CategoryDetailsDrawerProps> = ({
  open,
  setOpen,
  category,
  loading: isLoading,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto max-w-sm w-full">
          {isLoading ? (
            <AdminDashboardLoading />
          ) : (
            <div className="flex flex-row gap-5 justify-evenly items-center mx-5">
              <div>
                <div>
                  <h2 className="text-2xl font-medium">{category.name}</h2>

                  <div className="flex flex-col gap-1 mt-2 max-w-[500px] py-2 w-full">
                    <p className="text-sm text-muted-foreground font-medium">
                      Parent Id
                    </p>
                    <p className="font-medium">
                      {category.parentId
                        ? category.parentId
                        : "Parent id not available"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 py-2 mt-2 max-w-[500px]">
                  <p className="text-sm text-muted-foreground font-medium">
                    Client URL
                  </p>
                  <p className="font-medium">{category.clientUrl}</p>
                </div>

                <div className="flex flex-col gap-1 mt-2max-w-[500px]">
                  {category.firstTitle && (
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Titles
                      </p>
                      {category.firstTitle && <p>{category.firstTitle}</p>}
                      {category.secondTitle && <p>{category.secondTitle}</p>}
                    </div>
                  )}
                </div>
              </div>
              {category.imageUrl && (
                <div className="flex justify-center items-center h-[300px] w-[300px] relative">
                  <Image
                    src={category.imageUrl}
                    alt="category-image"
                    fill
                    className="mt-2 rounded-xl overflow-hidden object-cover p-1"
                  />
                </div>
              )}
            </div>
          )}

          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full mt-2" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDetailsDrawer;
