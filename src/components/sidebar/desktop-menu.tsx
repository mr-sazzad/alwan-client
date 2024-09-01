"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useGetAllCategoriesQuery } from "@/redux/api/categoies/categoriesApi";
import Link from "next/link";
import * as React from "react";
import { Skeleton } from "../ui/skeleton";
import transformCategories from "../utils/transformCategories";

const DesktopMenu: React.FC = () => {
  const { data: response, isLoading } = useGetAllCategoriesQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    );
  }

  const categories = transformCategories(response?.data);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((parentCategory) => (
          <NavigationMenuItem key={parentCategory.id}>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-lg font-medium">
              {parentCategory.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="drop-shadow-none rounded-none">
              <div className="p-4 flex flex-row gap-7 justify-start relative w-screen px-[150px] rounded-none">
                <div className="flex flex-row">
                  {parentCategory.children.map((childCategory) => (
                    <div key={childCategory.id}>
                      {childCategory.clientUrl ? (
                        <Link
                          href={`/categories/${childCategory.id}`}
                          className="font-medium pt-5 p-4 text-sm"
                        >
                          {childCategory.name}
                        </Link>
                      ) : (
                        <p className="text-sm font-medium pt-5 p-4 cursor-pointer hover:text-muted-foreground">
                          {childCategory.name}
                        </p>
                      )}
                      <ul className="flex flex-col gap-3 sm:px-3 mx-auto px-4">
                        {childCategory.children?.map((subCategory) => (
                          <ListItem
                            key={subCategory.id}
                            title={subCategory.name}
                            href={`/categories/${subCategory.id}`}
                          >
                            {subCategory.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 leading-none no-underline py-3 outline-none group",
            className
          )}
          {...props}
        >
          <div className="relative text-sm font-medium leading-none text-muted-foreground group-hover:text-black pb-1">
            {title}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default DesktopMenu;
