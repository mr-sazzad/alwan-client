"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IProduct, ISizeVariant } from "../../types";

// icons
import { Heart, ShoppingCart } from "lucide-react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { IoMdAlarm } from "react-icons/io";
import { PiSpinnerBold } from "react-icons/pi";
import { addProductToCart } from "../../redux/api/cart/cartSlice";
import { addProductToFavorite } from "../../redux/api/favorite/favoriteSlice";

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
  const [quantity, setQuantity] = useState(1);
  const [buttonLoading, SetButtonLoading] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);
  const [isMinusHovered, setIsMinusHovered] = useState(false);
  const [isInFavorite, setIsInFavorite] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ISizeVariant | null>(
    null
  );
  const favorites = useSelector((state: RootState) => state.favorite.products);

  const handleSizeClick = (variant: ISizeVariant) => {
    setSelectedVariant(variant);
    setQuantity(variant.stock > 0 ? 1 : 0);
  };

  const dispatch = useDispatch();

  const favoriteProducts = useSelector(
    (state: RootState) => state.favorite.products
  );

  useEffect(() => {
    if (product.sizeVariants.length > 0 && !selectedVariant) {
      const initialVariant = product.sizeVariants.find(
        (variant) => variant.stock > 0
      );

      if (initialVariant) {
        setSelectedVariant(initialVariant);
        setQuantity(1);
      } else {
        setSelectedVariant(null);
        setQuantity(0);
      }
    }
  }, [product.sizeVariants, selectedVariant]);

  useEffect(() => {
    setIsInFavorite(
      favoriteProducts.some((item: IProduct) => item.id === product.id)
    );
  }, [favoriteProducts, product.id]);

  const handleAddToWishlist = (product: IProduct) => {
    if (product) {
      dispatch(addProductToFavorite(product));

      const isProductInFavorites = favorites.some(
        (fav) => fav.id === product.id
      );

      toast({
        title: isProductInFavorites
          ? "Removed from Favorites"
          : "Added to Favorites",
        description: isProductInFavorites
          ? "This product has been removed from your favorites."
          : "This product has been added to your favorites.",
      });
    }
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
    dispatch(
      addProductToCart({
        ...product,
        orderSize: selectedVariant.size.name,
        orderSizeId: selectedVariant.size.id,
        orderQty: quantity,
        orderColor: selectedVariant?.color.name,
        orderColorId: selectedVariant?.color.id,
        // orderHexCode: selectedVariant.color.hexCode,
      })
    );
    setOpen(false);
    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your Bag.`,
    });

    SetButtonLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-[750px] w-11/12 rounded">
          <DialogHeader>
            <DialogTitle className="font-medium">
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
                    <p className="text-destructive font-medium">
                      Just a few left. Order soon.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="md:text-xl font-medium text-lg text-start capitalize">
                  {product.name}
                </h2>
                <div className="flex items-center mt-2">
                  <div className="flex-1">
                    {selectedVariant && (
                      <p className="text-lg font-medium text-muted-foreground">
                        TK.{selectedVariant.price}.00
                      </p>
                    )}
                  </div>

                  <div className="flex flex-1">
                    {selectedVariant && (
                      <div className="flex items-center gap-1">
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
                    <div className="flex-1 flex items-center justify-center">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <p className="text-lg font-medium">
                        {actionType === "buy" ? "Place Order" : "Add To Bag"}
                      </p>
                    </div>
                  )}
                </Button>
                <Button
                  onClick={() => handleAddToWishlist(product)}
                  className="flex-1 flex gap-2 items-center justify-center"
                  variant="outline"
                >
                  <div className="flex justify-center items-center text-lg">
                    <Heart
                      className="mr-2 h-4 w-4"
                      fill={isInFavorite ? "currentColor" : "none"}
                      stroke={isInFavorite ? "none" : "currentColor"}
                    />
                    <p>{isInFavorite ? "Remove" : "Favorite"}</p>
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
