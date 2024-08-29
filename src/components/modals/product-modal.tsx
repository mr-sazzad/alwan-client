"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ImageSlider from "../cards/image-slider";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "../ui/use-toast";

import { addProduct } from "@/redux/api/wishlist/wishlistSlice";
import { RootState } from "@/redux/store";
import { IProduct, IReadSizeVariant } from "@/types";
import { useDispatch, useSelector } from "react-redux";

// icons
import { addProductToCart } from "@/redux/api/cart/cartSlice";
import { BsCartCheck, BsCheck2Circle } from "react-icons/bs";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { IoMdAlarm } from "react-icons/io";
import { PiSpinnerBold } from "react-icons/pi";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";

interface ProductModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
  actionType: "buy" | "cart";
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  setOpen,
  product,
  actionType,
}) => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buttonLoading, SetButtonLoading] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);
  const [isMinusHovered, setIsMinusHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedVariant, setSelectedVariant] =
    useState<IReadSizeVariant | null>(null);

  const handleSizeClick = (variant: IReadSizeVariant) => {
    setSelectedVariant(variant);
    setQuantity(variant.stock > 0 ? 1 : 0);
  };

  const dispatch = useDispatch();

  const wishlistProducts = useSelector(
    (state: RootState) => state.wishlist.products
  );

  useEffect(() => {
    if (product.sizeVariants.length > 0 && !selectedVariant) {
      const initialVariant = product.sizeVariants.find(
        (variant) => variant.stock > 0
      );

      if (initialVariant) {
        setSelectedVariant(initialVariant);
        setSelectedSize(initialVariant.size.name);
        setQuantity(1);
      } else {
        setSelectedVariant(null);
        setQuantity(0);
        setSelectedSize("");
      }
    }
  }, [product.sizeVariants, selectedVariant]);

  useEffect(() => {
    setIsInWishlist(
      wishlistProducts.some((item: IProduct) => item.id === product.id)
    );
  }, [wishlistProducts, product.id]);

  const handleAddToWishlist = (product: IProduct) => {
    dispatch(addProduct(product));
  };

  const handlePlusMouseEnter = () => {
    setIsPlusHovered(true);
  };

  const handlePlusMouseLeave = () => {
    setIsPlusHovered(false);
  };

  // Minus Button Events
  const handleMinusMouseEnter = () => {
    setIsMinusHovered(true);
  };

  const handleMinusMouseLeave = () => {
    setIsMinusHovered(false);
  };

  const handleIncrementQuantity = () => {
    if (selectedVariant) {
      setQuantity((prev) => {
        const maxQty = selectedVariant.stock;
        return prev < maxQty ? prev + 1 : prev;
      });
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handlePlaceOrder = () => {
    SetButtonLoading(true);

    if (!selectedVariant || selectedVariant.stock === 0) {
      toast({
        variant: "destructive",
        title: "Error.",
        description: "Please select a size with available stock",
      });

      SetButtonLoading(false);
      return;
    }

    if (actionType === "buy") {
      const queryString = `?productId=${
        product.id
      }&quantity=${quantity}&size=${selectedSize.toLowerCase()}`;
      router.push(`/checkout${queryString}`);
    } else if (actionType === "cart") {
      // Add to Cart action
      dispatch(
        addProductToCart({
          ...product,
          orderSize: selectedSize,
          orderQty: quantity,
          orderColor: selectedVariant?.color.name,
          orderHexCode: selectedVariant.color.hexCode,
        })
      );
      setOpen(false);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    }

    SetButtonLoading(false);
  };

  console.log(actionType);

  return (
    <div className="flex justify-center items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-[750px] w-11/12 rounded">
          <DialogHeader>
            <DialogTitle>
              {actionType === "buy" ? "Order This Item" : "Add To Bag"}
            </DialogTitle>
            <DialogDescription>
              Please select your size and quantity
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-2 md:justify-start w-full">
            <div className="flex justify-center w-full flex-1">
              <div className="md:max-w-[300px] sm:max-w-[465px] w-[300px] overflow-hidden rounded">
                <ImageSlider urls={product.imageUrls} />
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <div className="h-5">
                {selectedVariant && selectedVariant.stock < 20 && (
                  <div className="flex gap-3 items-center">
                    <IoMdAlarm size={20} className="text-destructive" />
                    <p className="text-destructive font-semibold">
                      Just a few left. Order soon.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="md:text-xl font-semibold text-lg text-start capitalize">
                  {product.name}
                </h2>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    {selectedVariant && (
                      <p className="text-lg font-medium text-muted-foreground">
                        ${selectedVariant.price}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2 flex-1">
                    {selectedVariant && (
                      <div className="mt-2 flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{
                            backgroundColor: selectedVariant.color.hexCode,
                          }}
                        />
                        <p className="font-medium text-muted-foreground">
                          {selectedVariant.color.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 mt-5 w-full">
                  {product.sizeVariants.map((variant) => (
                    <Button
                      key={variant.size.id}
                      variant={
                        selectedVariant?.size.id === variant.size.id
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handleSizeClick(variant)}
                      className="flex-1"
                    >
                      {variant.size.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 w-full">
                  <Button
                    size="sm"
                    variant={isMinusHovered ? "default" : "outline"}
                    className="font-bold text-lg px-[14px] cursor-pointer"
                    onClick={handleDecrementQuantity}
                    onMouseEnter={handleMinusMouseEnter}
                    onMouseLeave={handleMinusMouseLeave}
                    disabled={quantity <= 1}
                  >
                    <HiMinusSm />
                  </Button>

                  <div className="min-w-[50px] h-9 flex justify-center items-center border border-gray-200 rounded flex-1">
                    {quantity && quantity <= 9 ? `0${quantity}` : quantity}
                  </div>

                  <Button
                    size="sm"
                    variant={isPlusHovered ? "default" : "outline"}
                    className="font-bold text-lg"
                    onClick={handleIncrementQuantity}
                    onMouseEnter={handlePlusMouseEnter}
                    onMouseLeave={handlePlusMouseLeave}
                    disabled={
                      quantity >= (selectedVariant ? selectedVariant.stock : 0)
                    }
                  >
                    <HiPlusSm />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full mt-auto">
                <Button
                  className="flex-1"
                  onClick={handlePlaceOrder}
                  disabled={!selectedVariant || selectedVariant.stock === 0}
                >
                  {buttonLoading ? (
                    <PiSpinnerBold className="animate-spin" />
                  ) : (
                    <div className="flex-1 flex gap-2 items-center justify-center">
                      {actionType === "buy" ? (
                        <BsCheck2Circle />
                      ) : (
                        <BsCartCheck />
                      )}
                      <p>
                        {actionType === "buy" ? "Place Order" : "Add To Cart"}
                      </p>
                    </div>
                  )}
                </Button>
                <Button
                  onClick={() => handleAddToWishlist(product)}
                  className="flex-1 flex gap-2 items-center justify-center"
                  disabled={isInWishlist}
                  variant="outline"
                >
                  <div>
                    {isInWishlist ? (
                      <div className="flex items-center gap-2">
                        <RiHeart2Fill className="text-rose-500" />
                        <p>Added</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <RiHeart2Line /> <p>Add To Favorite</p>
                      </div>
                    )}
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductModal;
