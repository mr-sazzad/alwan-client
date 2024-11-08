import { Metadata } from "next";
import CategoryProductsClient from "./CategoryProductsClient";

type Props = {
  params: { category_name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category_name = params.category_name;

  return {
    title: `${category_name} Products | Alwan`,
    description: `Browse our collection of ${category_name} products at Alwan.`,
  };
}

export default function CategoryProductsPage({ params }: Props) {
  return <CategoryProductsClient />;
}
