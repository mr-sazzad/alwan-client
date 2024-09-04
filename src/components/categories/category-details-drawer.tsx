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
      <DrawerContent className="w-full max-w-full">
        <div className="w-full max-w-md mx-auto">
          {isLoading ? (
            <AdminDashboardLoading />
          ) : (
            <div className="flex flex-row gap-5 justify-between w-full">
              <div className="flex-1 w-full mt-4">
                <h2 className="text-2xl font-medium mb-4">{category?.name}</h2>

                <div className="space-y-4">
                  <InfoItem
                    label="Parent Id"
                    value={category?.parentId || "not available"}
                  />
                  <InfoItem
                    label="Is Navigational?"
                    value={category?.isNavigational ? "Yes" : "No"}
                  />
                  <InfoItem
                    label="Is Leaf?"
                    value={category?.isLeaf ? "Yes" : "No"}
                  />
                  <InfoItem
                    label="Is On Home?"
                    value={category?.isOnHomePage ? "Yes" : "No"}
                  />

                  {category?.firstTitle && (
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Titles
                      </p>
                      <p>{category?.firstTitle}</p>
                      {category?.secondTitle && <p>{category.secondTitle}</p>}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                {category?.imageUrl && (
                  <div className="relative h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px]">
                    <Image
                      src={category.imageUrl}
                      alt="category-image"
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="w-full mt-4" variant="outline">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground font-medium">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default CategoryDetailsDrawer;
