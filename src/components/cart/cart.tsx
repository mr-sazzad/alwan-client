"use client";

import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/helpers/local-storage";
import { ITShirt } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageSlider from "../cards/image-slider";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { toast } from "../ui/use-toast";
import CartMoney from "../utils/cart-money";
import SmallName from "../utils/product-name";

import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { PiTrashLight } from "react-icons/pi";
import { TiWarningOutline } from "react-icons/ti";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<ITShirt[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // state for closing dialog
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "cartItems") {
        const cartItems = event.newValue ? JSON.parse(event.newValue) : [];

        setCartProducts(cartItems);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Immediately update cart from localStorage on component mount
    const cartItems = localStorage.getItem("cartItems");
    setCartProducts(cartItems ? JSON.parse(cartItems) : []);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const totalPrice = cartProducts.reduce((total, product) => {
      return (
        total +
        (product.prices.length > 1 ? product.prices[1] : product.prices[0]) *
          product.orderQty
      );
    }, 0);
    setTotalPrice(totalPrice);
  }, [cartProducts]);

  // Handler to decrease quantity of a product in the cart
  const handleQtyDecrease = (productId: string, size: string) => {
    const updatedCart = cartProducts.map((product) => {
      if (
        product.id === productId &&
        product.orderSize === size &&
        product.orderQty > 1
      ) {
        return { ...product, orderQty: product.orderQty - 1 };
      }
      return product;
    });
    setToLocalStorage("cartItems", JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  };

  // Handler to increase quantity of a product in the cart
  const handleQtyIncrease = (productId: string, size: string) => {
    const updatedCart = cartProducts.map((product) => {
      if (
        product.id === productId &&
        product.orderSize === size &&
        product.totalStocks > product.orderQty
      ) {
        return { ...product, orderQty: product.orderQty + 1 };
      }
      return product;
    });
    setToLocalStorage("cartItems", JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  };

  const handleProductDelete = (productId: string, size: string) => {
    const remainingProducts = cartProducts.filter(
      (product) => !(product.id === productId && product.orderSize === size)
    );
    setToLocalStorage("cartItems", JSON.stringify(remainingProducts));
    setCartProducts(remainingProducts);
  };

  const handleCartClear = () => {
    removeFromLocalStorage("cartItems");
    toast({
      title: "Success Alert",
      description: "Cart cleared successfully",
    });
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <IoBagHandleOutline />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            <SheetDescription>Here&lsquo;s your cart items</SheetDescription>
          </SheetHeader>
          {cartProducts.map((product: ITShirt) => (
            <div
              key={product.id}
              className="flex flex-row gap-2 mt-5 w-full items-center"
            >
              <div className="flex flex-row gap-4 flex-1">
                <div className="relative w-[80px] h-[80px]">
                  <ImageSlider urls={product.images} />
                </div>
                <div>
                  <SmallName
                    name={product.name}
                    className="text-sm font-medium text-gray-500"
                  />
                  <div className="flex gap-1 items-center text-sm text-gray-400">
                    {product.prices && <CartMoney prices={product.prices} />}
                  </div>
                  <div className="flex flex-row items-center">
                    <HiMinusSm
                      className="cursor-pointer border rounded"
                      onClick={() =>
                        handleQtyDecrease(product.id, product.orderSize)
                      }
                    />
                    <div className="px-2">{product.orderQty}</div>
                    <HiPlusSm
                      className="cursor-pointer border rounded"
                      onClick={() =>
                        handleQtyIncrease(product.id, product.orderSize)
                      }
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Size: {product.orderSize}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex justify-center items-center py-0 px-[13px]"
                onClick={() =>
                  handleProductDelete(product.id, product.orderSize)
                }
              >
                <PiTrashLight size={16} />
              </Button>
            </div>
          ))}
          <div className="mt-5 text-end text-base font-medium flex gap-2">
            <p>Total:</p>
            <p className="flex items-center">{totalPrice}</p>
          </div>
          <Button className="mt-5 w-full" asChild>
            <Link href="/checkout">Checkout</Link>
          </Button>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className="mt-5 w-full"
                variant="destructive"
                disabled={cartProducts.length < 1}
              >
                Erase All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-1">
                  <TiWarningOutline size={20} />
                  Warning
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Do you wanna clear your cart now?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Never</AlertDialogCancel>
                <AlertDialogAction onClick={handleCartClear}>
                  Yes, I want
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
