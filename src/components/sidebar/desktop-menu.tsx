"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import { useGetCategoriesQuery } from "../../redux/api/categoies/categoriesApi";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import transformCategories from "../utils/transformCategories";

const DesktopMenu: React.FC = () => {
  const { data: response, isLoading } = useGetCategoriesQuery(undefined);
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );

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
    <nav className="relative z-10">
      <ul className="flex gap-6">
        {categories &&
          categories?.map((parentCategory: any) => (
            <li
              key={parentCategory.id}
              className="relative"
              onMouseEnter={() => setActiveCategory(parentCategory.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Button
                variant="link"
                className="flex items-center space-x-1 text-[18px] transition-colors"
              >
                <span>{parentCategory.name}</span>
              </Button>

              <AnimatePresence>
                {activeCategory === parentCategory.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute -left-[735px] top-full mt-2 w-screen bg-background"
                  >
                    <div className="mx-auto grid grid-cols-4 gap-8 p-8">
                      {parentCategory.children.map((childCategory: any) => (
                        <div key={childCategory.id} className="space-y-4">
                          {childCategory.isLeaf ? (
                            <Link
                              href={`/categories/${childCategory.id}`}
                              className="font-medium block text-primary hover:text-muted-foreground"
                            >
                              {childCategory.name}
                            </Link>
                          ) : (
                            <React.Fragment>
                              <span className="font-medium block text-primary cursor-pointer">
                                {childCategory.name}
                              </span>
                              {childCategory.children &&
                                childCategory.children.length > 0 && (
                                  <ul className="space-y-2">
                                    {childCategory.children.map(
                                      (subCategory: any) => (
                                        <ListItem
                                          key={subCategory.id}
                                          title={subCategory.name}
                                          href={`/categories/${subCategory.id}`}
                                          isLeaf={subCategory.isLeaf}
                                        />
                                      )
                                    )}
                                  </ul>
                                )}
                            </React.Fragment>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
      </ul>
    </nav>
  );
};

const ListItem: React.FC<{
  title: string;
  href: string;
  isLeaf: boolean;
}> = ({ title, href, isLeaf }) => {
  if (isLeaf) {
    return (
      <li>
        <Link
          href={href}
          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {title}
        </Link>
      </li>
    );
  }
  return (
    <li>
      <span className="block text-sm text-muted-foreground">{title}</span>
    </li>
  );
};

export default DesktopMenu;
