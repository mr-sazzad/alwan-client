interface Category {
  id: string;
  name: string;
  parentId: string | null;
  clientUrl: string;
  description: string | null;
  children?: Category[];
}

interface GroupedCategory {
  id: string;
  name: string;
  clientUrl: string;
  description: string | null;
  children: Category[];
}

const transformCategories = (data: Category[]): GroupedCategory[] => {
  const categoriesMap: { [key: string]: Category } = {};
  const groupedCategories: { [key: string]: GroupedCategory } = {};

  // Create a map of categories
  data.forEach((category) => {
    categoriesMap[category.id] = { ...category, children: [] };
  });

  // Group categories by parent
  data.forEach((category) => {
    if (category.parentId) {
      const parent = categoriesMap[category.parentId];
      if (parent) {
        parent.children!.push(category);
      }
    } else {
      groupedCategories[category.id] = {
        ...category,
        children: [],
      };
    }
  });

  // Ensure top-level categories include their child categories
  Object.values(categoriesMap).forEach((category) => {
    if (category.parentId) {
      const parentGroup = groupedCategories[category.parentId];
      if (parentGroup) {
        parentGroup.children.push(category);
      }
    }
  });

  return Object.values(groupedCategories);
};

export default transformCategories;
