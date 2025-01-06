"use client";
import Link from "next/link";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";
import { cn } from "../../lib/utils";
import { useGetCategoriesQuery } from "../../redux/api/categoies/categoriesApi";
import { Skeleton } from "../ui/skeleton";
import transformCategories from "../utils/transformCategories";

const DesktopMenu: React.FC = () => {
  const { data: response, isLoading } = useGetCategoriesQuery(undefined);

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

  const categories = response?.data && transformCategories(response?.data);

  return (
    <NavigationMenu className="relative z-10">
      <NavigationMenuList>
        {categories &&
          categories?.map((parentCategory: any) => (
            <NavigationMenuItem key={parentCategory.id}>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-lg font-medium">
                {parentCategory.name}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className="ml-[150px] w-screen p-4">
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mt-14 mb-8">
                    {parentCategory.children.map((childCategory: any) => (
                      <div key={childCategory.id} className="space-y-2">
                        {childCategory.isLeaf ? (
                          <Link
                            href={`/categories/${childCategory.id}`}
                            className="font-medium text-sm block text-muted-foreground hover:text-black dark:hover:text-white"
                          >
                            {childCategory.name}
                          </Link>
                        ) : (
                          <span className="font-medium text-sm cursor-default">
                            {childCategory.name}
                          </span>
                        )}
                        <ul className="space-y-1 text-sm">
                          {childCategory.children?.map((subCategory: any) => (
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
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
