"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Category } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { CategoryList } from "./category-list";

interface SidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categories: Category[];
  onBack: () => void;
  onCategorySelect: (category: Category) => void;
  categoryStack: Category[];
}

export default function Sidebar({
  categories,
  onBack,
  onCategorySelect,
  open,
  setOpen,
  categoryStack,
}: SidebarProps) {
  const router = useRouter();
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const handleCategoryClick = (category: Category) => {
    if (category.isLeaf) {
      router.push(`/categories/${category.id}`);
    }

    if (category.subCategories && category.subCategories.length > 0) {
      setDirection("forward");
      onCategorySelect(category);
    }
  };

  const handleBack = () => {
    setDirection("backward");
    onBack();
  };

  const currentCategories =
    categoryStack.length > 0
      ? categoryStack[categoryStack.length - 1].subCategories || []
      : categories;

  const backButtonText =
    categoryStack.length > 1
      ? categoryStack[categoryStack.length - 2].name
      : "All";

  const parentCategoryName =
    categoryStack.length > 0
      ? categoryStack[categoryStack.length - 1].name
      : "";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={parentCategoryName}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={{
                enter: (direction) => ({
                  x: direction === "forward" ? "100%" : "-100%",
                  opacity: 0,
                }),
                center: { x: 0, opacity: 1 },
                exit: (direction) => ({
                  x: direction === "forward" ? "-100%" : "100%",
                  opacity: 0,
                }),
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute w-full h-full"
            >
              <CategoryList
                categories={currentCategories}
                onCategoryClick={handleCategoryClick}
                backButtonText={backButtonText}
                parentCategoryName={parentCategoryName}
                onBack={handleBack}
                showBackButton={categoryStack.length > 0}
                isFirstPage={categoryStack.length === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
