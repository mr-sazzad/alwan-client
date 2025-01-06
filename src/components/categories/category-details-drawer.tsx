"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { ICategory } from "../../types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Drawer, DrawerClose, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface CategoryDetailsDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  category: ICategory;
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
      <DrawerContent className="h-[60vh]">
        <ScrollArea className="h-[calc(100vh-8rem)] px-4 pb-8 hide-scrollbar">
          <div className="w-full mx-auto sm:max-w-md mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{category?.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-center">
                  {category?.imageUrl ? (
                    <div className="relative h-48 w-48 sm:h-64 sm:w-64">
                      <Image
                        src={category.imageUrl}
                        alt="category-image"
                        fill
                        className="rounded-xl object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 w-48 sm:h-64 sm:w-64 items-center justify-center bg-secondary rounded-xl">
                      <p className="text-muted-foreground">
                        No image available
                      </p>
                    </div>
                  )}
                </div>
                <Separator />
                <InfoItem
                  label="Parent ID"
                  value={category?.parentId || "Not available"}
                />
                <InfoItem
                  label="Is Navigational"
                  value={
                    <Badge
                      variant={
                        category?.isNavigational ? "default" : "secondary"
                      }
                    >
                      {category?.isNavigational ? "Yes" : "No"}
                    </Badge>
                  }
                />
                <InfoItem
                  label="Is Leaf"
                  value={
                    <Badge variant={category?.isLeaf ? "default" : "secondary"}>
                      {category?.isLeaf ? "Yes" : "No"}
                    </Badge>
                  }
                />
                <InfoItem
                  label="Is On Home Page"
                  value={
                    <Badge
                      variant={category?.isOnHomePage ? "default" : "secondary"}
                    >
                      {category?.isOnHomePage ? "Yes" : "No"}
                    </Badge>
                  }
                />
                {(category?.firstTitle || category?.secondTitle) && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2">Titles</h3>
                      {category?.firstTitle && (
                        <p className="text-sm text-muted-foreground">
                          {category.firstTitle}
                        </p>
                      )}
                      {category?.secondTitle && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {category.secondTitle}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        <DrawerClose asChild className="absolute top-4 right-4">
          <Button className="rounded-full" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col space-y-1">
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <div className="font-medium">{value}</div>
  </div>
);

export default CategoryDetailsDrawer;
