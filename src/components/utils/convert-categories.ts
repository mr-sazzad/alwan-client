import { Category } from "@/types";

export const convertCategories = (categories: Category[]): Category[] => {
  const categoryMap: { [key: string]: Category } = {};

  categories.forEach((category) => {
    categoryMap[category.id] = { ...category, subCategories: [] };
  });

  const nestedCategories: Category[] = [];

  categories.forEach((category) => {
    if (category.parentId) {
      const parentCategory = categoryMap[category.parentId];
      if (parentCategory) {
        parentCategory.subCategories!.push(categoryMap[category.id]);
      }
    } else {
      nestedCategories.push(categoryMap[category.id]);
    }
  });

  return nestedCategories;
};
