import CheckoutPageSingleProductCard from "@/components/cards/checkout-page-single-product-card";
import { IUserCartProduct } from "@/types";

interface ProductReviewProps {
  products: IUserCartProduct[];
}

const ProductReview: React.FC<ProductReviewProps> = ({ products }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg mb-4">Order Review</h3>
      {products.map((product) => (
        <CheckoutPageSingleProductCard
          key={product.id}
          product={product}
          quantity={String(product.orderQty)}
          size={product.orderSize}
          onProductDelete={() => {}}
        />
      ))}
    </div>
  );
};

export default ProductReview;
