import { ICategory } from "@/types";

export const convertCategories = (categories: ICategory[]): ICategory[] => {
  const categoryMap: { [key: string]: ICategory } = {};

  categories.forEach((category) => {
    categoryMap[category.id] = { ...category, subCategories: [] };
  });

  const nestedCategories: ICategory[] = [];

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
