"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Category } from "@/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [categoryStack]);

  const handleCategoryClick = (category: Category) => {
    if (category.clientUrl) {
      router.push(`/categories/${category.id}`);
    }

    if (category.subCategories && category.subCategories.length > 0) {
      setDirection("forward");
      setIsTransitioning(true);
      onCategorySelect(category);
    }
  };

  const handleBack = () => {
    setDirection("backward");
    setIsTransitioning(true);
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
          <div
            className={`absolute w-full h-full transition duration-1000 ease ${
              isTransitioning && direction === "forward"
                ? "-translate-x-[10%]"
                : "translate-x-0"
            }`}
          >
            <CategoryList
              categories={currentCategories}
              onCategoryClick={handleCategoryClick}
              backButtonText={backButtonText}
              parentCategoryName={parentCategoryName}
              onBack={handleBack}
              showBackButton={categoryStack.length > 0}
            />
          </div>
          <div
            className={`absolute w-full h-full transition-transform duration-300 ease-in-out ${
              isTransitioning
                ? direction === "forward"
                  ? "translate-x-0"
                  : "translate-x-full"
                : "translate-x-full"
            }`}
          >
            <CategoryList
              categories={currentCategories}
              onCategoryClick={handleCategoryClick}
              backButtonText={backButtonText}
              parentCategoryName={parentCategoryName}
              onBack={handleBack}
              showBackButton={categoryStack.length > 0}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface CategoryListProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
  backButtonText: string;
  parentCategoryName: string;
  onBack: () => void;
  showBackButton: boolean;
}

function CategoryList({
  categories,
  onCategoryClick,
  backButtonText,
  parentCategoryName,
  onBack,
  showBackButton,
}: CategoryListProps) {
  return (
    <div className="p-6 flex flex-col h-full">
      <div className="px-3">
        {showBackButton && (
          <button
            className="cursor-pointer flex gap-1 font-medium items-center text-lg -mt-3"
            onClick={onBack}
          >
            <IoIosArrowBack aria-hidden="true" />
            <span>{backButtonText}</span>
          </button>
        )}
      </div>

      <div className="mb-14" />
      <h2 className="text-2xl font-medium mb-6 px-4">{parentCategoryName}</h2>
      <div className="flex-grow overflow-y-auto">
        <ul className="list-none p-0 px-4 py-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`cursor-pointer text-lg font-medium ${
                category.subCategories ? "relative pr-12" : ""
              }`}
              onClick={() => onCategoryClick(category)}
            >
              <p className="w-full text-muted-foreground">{category.name}</p>
              {category.subCategories && category.subCategories.length > 0 && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <IoIosArrowForward aria-hidden="true" size={20} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
