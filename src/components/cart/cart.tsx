"use client";

import { ITShirt } from "@/types";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import ImageSlider from "../cards/image-slider";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartMoney from "../utils/cart-money";
import SmallName from "../utils/product-name";

import {
  clearCart,
  decreaseProductQty,
  deleteProduct,
  increaseProductQty,
} from "@/redux/api/cart/cartSlice";
import { RootState } from "@/redux/store";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { PiTrashLight } from "react-icons/pi";
import { TbShoppingBagX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import AlertDialogComp from "../alert-dialog/alert-dialog";
import { toast } from "../ui/use-toast";

interface ICartProps {
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
}

const Cart: React.FC<ICartProps> = ({ cartOpen, setCartOpen }) => {
  // state of erase cart products modal
  const [eraseModalOpen, setEraseModalOpen] = useState(false);

  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();

  const handleCartClear = () => {
    dispatch(clearCart()),
      toast({
        title: "Success Alert",
        description: "Cart cleared successfully",
      });
  };

  const calculateTotalPrice = () => {
    return cartProducts
      .reduce((total, product) => {
        const productPrice =
          product.prices.length > 1 ? product.prices[1] : product.prices[0];
        return total + productPrice * product.orderQty;
      }, 0)
      .toFixed(2);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetTrigger asChild>
          <Button variant="link">
            <IoBagHandleOutline size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            <SheetDescription>Here&lsquo;s your cart items</SheetDescription>
          </SheetHeader>
          <>
            {cartProducts.length ? (
              <div className="h-[72vh] flex flex-col justify-between">
                <div className="flex flex-col overflow-y-auto h-full">
                  {cartProducts.map((product: ITShirt) => (
                    <div
                      key={product.id}
                      className="flex flex-row gap-2 w-full items-center"
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
                            {product.prices && (
                              <CartMoney prices={product.prices} />
                            )}
                          </div>
                          <div className="flex flex-row items-center border rounded-md w-full gap-2">
                            <HiMinusSm
                              className="cursor-pointer flex-1"
                              onClick={() =>
                                dispatch(
                                  decreaseProductQty({
                                    id: product.id,
                                    size: product.orderSize,
                                  })
                                )
                              }
                            />
                            <div className="px-2 flex-1 flex justify-center">
                              {product.orderQty}
                            </div>
                            <HiPlusSm
                              className="cursor-pointer flex-1"
                              onClick={() =>
                                dispatch(
                                  increaseProductQty({
                                    id: product.id,
                                    size: product.orderSize,
                                  })
                                )
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
                        className="rounded-full flex justify-center items-center py-0 px-[10px]"
                        onClick={() =>
                          dispatch(
                            deleteProduct({
                              id: product.id,
                              size: product.orderSize,
                            })
                          )
                        }
                      >
                        <PiTrashLight size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex justify-end items-end">
                  <div className="flex gap-2 items-center">
                    <p>Total:</p>
                    <p className="flex items-center">{totalPrice}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[72vh] flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <div className="flex flex-col gap-3 items-center justify-center mt-5">
                    <TbShoppingBagX className="text-muted-foreground text-[30px]" />
                    <p className="text-muted-foreground text-lg font-semibold">
                      Your Cart Is Empty
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
          <SheetFooter>
            <Button
              variant="outline"
              className="mt-1 w-full"
              disabled={cartProducts.length < 1}
            >
              <Link href="/checkout">Checkout</Link>
            </Button>

            <Button
              className="mt-1 w-full"
              variant="destructive"
              disabled={cartProducts.length < 1}
              onClick={() => setEraseModalOpen(true)}
            >
              Erase all
            </Button>
            <AlertDialogComp
              open={eraseModalOpen}
              setOpen={setEraseModalOpen}
              title="Remove Cart"
              description="Do you want to remove all products from your cart?"
              handler={handleCartClear}
              buttonText="Yes, Clear"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
