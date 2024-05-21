"use client";

import { ITShirt } from "@/types";
import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
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

import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "../ui/use-toast";

// icons
import { BsCheck2Circle } from "react-icons/bs";
import { PiSpinnerBold } from "react-icons/pi";
import { RiHeart2Line } from "react-icons/ri";

const BuyProductModal = ({ product }: { product: ITShirt }) => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buttonLoading, SetButtonLoading] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);
  const [isMinusHovered, setIsMinusHovered] = useState(false);

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
    if (quantity < product.totalStocks) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
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

  const handleAddToWishlist = () => {
    // add to wishlist work goes here
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
              Please see details for confirmation
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-5 md:justify-start w-full">
            <div className="flex justify-center">
              <div className="md:max-w-[300px] sm:max-w-[465px] w-[300px] overflow-hidden rounded">
                <ImageSlider urls={product.images} />
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
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

              <div className="capitalize flex gap-[1px]">
                {product.totalStocks < 3 && (
                  <p className="text-xs flex items-center">
                    Only {product.totalStocks > 1 ? "pics are" : "Pic"}{" "}
                    available
                  </p>
                )}
              </div>

              <div className="">
                <p className="font-medium text-sm">Select Your Size:</p>
                <div className="flex mt-3">
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

              <div className="flex gap-2 w-full mt-3">
                <Button className="flex-1" onClick={handlePlaceOrder}>
                  {buttonLoading ? (
                    <PiSpinnerBold className="animate-spin" />
                  ) : (
                    <div className="flex-1 flex gap-2 items-center justify-center">
                      <BsCheck2Circle /> <p>Place Order</p>
                    </div>
                  )}
                </Button>
                <Button
                  onClick={handleAddToWishlist}
                  className="flex-1 flex gap-2 items-center justify-center"
                >
                  <RiHeart2Line /> <p>Add To Wishlist</p>
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
