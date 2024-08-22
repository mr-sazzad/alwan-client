"use client";

import Loading from "@/app/loading";
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
import transformCategories from "../utils/transformCategories";

const DesktopMenu: React.FC = () => {
  const { data, isLoading } = useGetAllCategoriesQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  const categories = transformCategories(data);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((parentCategory) => (
          <NavigationMenuItem key={parentCategory.id}>
            <NavigationMenuTrigger>
              {parentCategory.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="drop-shadow-none">
              <div className="p-4 flex flex-row gap-7 justify-start relative w-screen px-[150px]">
                <div className="flex flex-row">
                  {parentCategory.children.map((childCategory) => (
                    <div key={childCategory.id}>
                      <Link
                        href={childCategory.clientUrl}
                        className="text-sm font-semibold pt-5 p-4"
                      >
                        {childCategory.title}
                      </Link>
                      <ul className="flex flex-col gap-3 sm:px-3 mx-auto px-4">
                        {childCategory.children?.map((subCategory) => (
                          <ListItem
                            key={subCategory.id}
                            title={subCategory.title}
                            href={subCategory.clientUrl}
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
