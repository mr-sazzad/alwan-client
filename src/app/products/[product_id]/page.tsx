import { Metadata } from "next";
import ProductDetailsClient from "./ProductDetailsClient";

type Props = {
  params: { product_id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Product Details | Alwan`,
    description: `${params.product_id}`,
  };
}

export default function ProductDetailsPage({ params }: Props) {
  return <ProductDetailsClient />;
}
