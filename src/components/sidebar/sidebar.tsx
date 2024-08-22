import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Category } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface SidebarProps {
  categories: Category[];
  level?: number;
  parentCategory?: Category | null;
  onBack?: () => void;
  onCategorySelect?: (category: Category) => void;
  backButtonText?: string;
  currentCategory?: Category | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  level = 0,
  parentCategory = null,
  onBack,
  onCategorySelect,
  backButtonText = "All",
  currentCategory,
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const router = useRouter();

  const handleGoToSubCategory = (category: Category) => {
    if (category.subCategories && category.subCategories.length > 0) {
      setActiveSubMenu(category.id);

      console.log("handleGoToSubCategory", activeSubMenu);
    }
  };

  const handleCategoryClick = (category: Category) => {
    router.push(category.clientUrl);

    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      setActiveSubMenu(null);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mb-20" />
        <div className="h-full overflow-y-auto">
          {activeSubMenu === null && (
            <div
              className={`w-full z-50 transition-transform duration-500 bg-white`}
            >
              {level > 0 && (
                <div
                  className="p-4 cursor-pointer flex gap-2 items-center text-xl font-bold pb-20"
                  onClick={handleBackClick}
                >
                  <IoIosArrowBack /> {backButtonText}
                </div>
              )}
              <ul className="list-none p-0">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`px-4 py-2 cursor-pointer text-xl font-bold ${
                      category.subCategories ? "relative pr-12" : ""
                    }`}
                  >
                    <p
                      onClick={() => handleCategoryClick(category)}
                      className="w-full"
                    >
                      <p>{category.title}</p>
                    </p>

                    {category.subCategories &&
                      category.subCategories.length > 0 && (
                        <div
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          onClick={() => handleGoToSubCategory(category)}
                        >
                          <IoIosArrowForward size={20} />
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeSubMenu !== null && (
            <Sidebar
              categories={
                categories.find((category) => category.id === activeSubMenu)
                  ?.subCategories || []
              }
              level={level + 1}
              parentCategory={
                categories.find((category) => category.id === activeSubMenu) ||
                null
              }
              onBack={handleBackClick}
              onCategorySelect={onCategorySelect}
              backButtonText={parentCategory?.title || "All"}
              currentCategory={currentCategory}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
