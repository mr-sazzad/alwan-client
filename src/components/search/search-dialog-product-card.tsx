import { ITShirt } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";

interface ISearchDialogProductCardProps {
  product: ITShirt;
  handleGoToDetailsPage: (id: string) => void;
}

const SearchDialogProductCard: React.FC<ISearchDialogProductCardProps> = ({
  product,
  handleGoToDetailsPage,
}) => {
  return (
    <div
      onClick={() => handleGoToDetailsPage(product.id)}
      className="flex flex-row gap-2 cursor-pointer"
    >
      <Image
        src={product.images[0]}
        alt="product-image"
        height={60}
        width={60}
        className="rounded"
      />
      <div>
        <Button variant="link" className="font-semibold p-0 h-4">
          {product.name}
        </Button>
        <div>
          {product.prices.length > 1 ? (
            <div className="flex gap-1 items-center">
              <p className="font-semibold">TK.{product.prices[1]}</p>
              <p className="text-xs line-through">TK.{product.prices[0]}</p>
            </div>
          ) : (
            <p className="font-semibold">TK. {product.prices[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDialogProductCard;
