"use client";

import { ITShirt } from "@/types";
import { useEffect, useRef, useState } from "react";
import ImageSlider from "../cards/image-slider";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { getFromLocalStorage } from "@/helpers/local-storage";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "../ui/use-toast";

// icons
import { addProduct } from "@/redux/api/wishlist/wishlistSlice";
import { RootState } from "@/redux/store";
import { BsCheck2Circle } from "react-icons/bs";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiSpinnerBold } from "react-icons/pi";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const BuyProductModal = ({ product }: { product: ITShirt }) => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buttonLoading, SetButtonLoading] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);
  const [isMinusHovered, setIsMinusHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const dispatch = useDispatch();
  const wishlistProducts = useSelector(
    (state: RootState) => state.wishlist.products
  );

  const availableQuantities = useRef(0);

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      const initialSize = product.sizes[0];
      setSelectedSize(initialSize);
      const sizeKey =
        `${initialSize.toLocaleLowerCase()}SizeStock` as keyof ITShirt;
      const initialSizeQuantities = product[sizeKey] as number | undefined;
      availableQuantities.current = initialSizeQuantities || 0;
      setQuantity(initialSizeQuantities && initialSizeQuantities > 0 ? 1 : 0);
    }

    const wishlistItems = getFromLocalStorage(
      "alwan_user_wishlist_items"
    ) as string;
    if (wishlistItems) {
      try {
        const parsedItems: ITShirt[] = JSON.parse(wishlistItems);
        const productExists = parsedItems.some(
          (item) => item.id === product.id
        );
        setIsInWishlist(productExists);
      } catch (error) {
        console.error("Error parsing wishlist items from local storage", error);
      }
    }
  }, [product]);

  useEffect(() => {
    setIsInWishlist(
      wishlistProducts.some((item: ITShirt) => item.id === product.id)
    );
  }, [wishlistProducts, product.id]);

  const handleAddToWishlist = (product: ITShirt) => {
    dispatch(addProduct(product));
  };

  const handlePlusMouseEnter = () => {
    setIsPlusHovered(true);
  };

  const handlePlusMouseLeave = () => {
    setIsPlusHovered(false);
  };

  const handleMinusMouseEnter = () => {
    setIsMinusHovered(true);
  };

  const handleMinusMouseLeave = () => {
    setIsMinusHovered(false);
  };

  const handleIncrementQuantity = () => {
    setQuantity((prev) => {
      const maxQty = availableQuantities.current;
      return prev < maxQty ? prev + 1 : prev;
    });
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    const sizeKey = `${size.toLocaleLowerCase()}SizeStock` as keyof ITShirt;
    const sizeQuantities = product[sizeKey] as number | undefined;
    availableQuantities.current = sizeQuantities || 0;
    setQuantity(sizeQuantities && sizeQuantities > 0 ? 1 : 0);
  };

  const handlePlaceOrder = () => {
    SetButtonLoading(true);
    if (!selectedSize) {
      toast({
        variant: "destructive",
        title: "Error.",
        description: "Please select a size first",
      });

      SetButtonLoading(false);
      return;
    }
    const queryString = `?productId=${
      product.id
    }&quantity=${quantity}&size=${selectedSize.toLowerCase()}`;
    router.push(`/checkout${queryString}`);
  };

  return (
    <div className="flex justify-center items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Buy Now</Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[750px] w-11/12 rounded">
          <DialogHeader>
            <DialogTitle>Order This Item</DialogTitle>
            <DialogDescription>
              Please select your size and quantity
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-5 md:justify-start w-full">
            <div className="flex justify-center w-full">
              <div className="md:max-w-[300px] sm:max-w-[465px] w-[300px] overflow-hidden rounded">
                <ImageSlider urls={product.images} />
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <div>
                <h2 className="md:text-xl md:font-semibold text-lg font-medium text-start">
                  {product.name}
                </h2>
                <h2 className="md:text-xl md:font-semibold text-lg font-medium">
                  {product.prices && product.prices.length > 1 ? (
                    <div className="flex flex-row gap-1">
                      <p className="text-2xl font-semibold flex items-center">
                        <FaBangladeshiTakaSign size={20} />
                        {product.prices[1]}
                      </p>
                      <p className="text-sm font-semibold line-through flex items-center">
                        <FaBangladeshiTakaSign size="14" />
                        {product.prices[0]}
                      </p>
                    </div>
                  ) : (
                    <p className="text-2xl font-semibold flex items-center gap-1">
                      <FaBangladeshiTakaSign />
                      {product.prices && product.prices[0]}
                    </p>
                  )}
                </h2>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Update Quantity</p>
                <div className="flex items-center gap-2 w-full">
                  <Button
                    size="sm"
                    variant={isMinusHovered ? "default" : "outline"}
                    className="font-bold text-lg px-[14px]"
                    onClick={handleDecrementQuantity}
                    onMouseEnter={handleMinusMouseEnter}
                    onMouseLeave={handleMinusMouseLeave}
                  >
                    -
                  </Button>

                  <div className="min-w-[50px] h-9 flex justify-center items-center border border-gray-200 rounded">
                    {quantity && quantity <= 9 ? `0${quantity}` : quantity}
                  </div>

                  <Button
                    size="sm"
                    variant={isPlusHovered ? "default" : "outline"}
                    className="font-bold text-lg"
                    onClick={handleIncrementQuantity}
                    onMouseEnter={handlePlusMouseEnter}
                    onMouseLeave={handlePlusMouseLeave}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="mt-3">
                <p className="font-medium text-sm">Select Your Size:</p>
                <div className="flex mt-1">
                  {product.sizes &&
                    product.sizes.map((size: string, i: number) => (
                      <Button
                        key={i}
                        className="uppercase mr-1 px-6"
                        variant={
                          selectedSize === size ? "default" : "secondary"
                        }
                        onClick={() => handleSelectSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                </div>
              </div>

              <div className="ml-3 flex gap-[1px]">
                <p className="text-xs flex items-center">
                  Only{" "}
                  {availableQuantities.current > 1
                    ? `${availableQuantities.current} pieces are `
                    : `${availableQuantities.current} piece is`}
                  available
                </p>
              </div>

              <div className="flex gap-2 w-full mt-3">
                <Button
                  className="flex-1"
                  onClick={handlePlaceOrder}
                  disabled={!availableQuantities.current}
                >
                  {buttonLoading ? (
                    <PiSpinnerBold className="animate-spin" />
                  ) : (
                    <div className="flex-1 flex gap-2 items-center justify-center">
                      <BsCheck2Circle /> <p>Place Order</p>
                    </div>
                  )}
                </Button>
                <Button
                  onClick={() => handleAddToWishlist(product)}
                  className="flex-1 flex gap-2 items-center justify-center"
                  disabled={isInWishlist}
                >
                  <div>
                    {isInWishlist ? (
                      <div className="flex items-center gap-2">
                        <RiHeart2Fill className="text-rose-500" />
                        <p>In Wishlist</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <RiHeart2Line /> <p>Add To Wishilist</p>
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

export default BuyProductModal;
