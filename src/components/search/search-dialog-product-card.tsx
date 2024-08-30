import { IProduct } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";

interface ISearchDialogProductCardProps {
  product: IProduct;
  handleGoToDetailsPage: (id: string) => void;
}

const SearchDialogProductCard: React.FC<ISearchDialogProductCardProps> = ({
  product,
  handleGoToDetailsPage,
}) => {
  const imageUrl = product.imageUrls[0];

  const priceDisplay =
    product.sizeVariants && product.sizeVariants.length > 0
      ? product.sizeVariants[0].price
      : "Price Not Available";

  return (
    <div
      onClick={() => handleGoToDetailsPage(product.id)}
      className="flex flex-row gap-2 cursor-pointer"
    >
      <Image
        src={imageUrl}
        alt="product-image"
        height={80}
        width={80}
        className="rounded"
      />
      <div className="mt-1">
        <Button variant="link" className="font-medium p-0 h-4 text-lg">
          {product.name}
        </Button>
        <div>
          <p className="font-medium text-muted-foreground">
            TK. {priceDisplay}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchDialogProductCard;
