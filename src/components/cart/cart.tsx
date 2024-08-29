"use client";

import {
  clearCart,
  decreaseProductQty,
  deleteProduct,
  increaseProductQty,
} from "@/redux/api/cart/cartSlice";
import { RootState } from "@/redux/store";
import { IUserCartProduct } from "@/types";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbShoppingBagX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import AlertDialogComp from "../alert-dialog/alert-dialog";
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
import { toast } from "../ui/use-toast";
import SmallName from "../utils/product-name";

interface ICartProps {
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
}

const Cart: React.FC<ICartProps> = ({ cartOpen, setCartOpen }) => {
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

  console.log("CART PRODUCTS =>", cartProducts);

  const calculateTotalPrice = () => {
    return cartProducts
      .reduce((total: number, product: IUserCartProduct) => {
        const sizeVariant = product.sizeVariants.find(
          (variant) =>
            variant.size.name === product.orderSize &&
            variant.color.name === product.orderColor
        );
        const productPrice = sizeVariant?.price || 0;
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
                <div className="flex flex-col gap-1 overflow-y-auto h-full">
                  {cartProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-row gap-2 w-full items-center"
                    >
                      <div className="flex flex-row gap-4 flex-1">
                        <div className="relative w-[90px] h-[90px]">
                          <ImageSlider urls={product.imageUrls} />
                        </div>
                        <div className="w-[60%] flex flex-col gap-2">
                          <SmallName
                            name={product.name}
                            className="text-sm font-medium text-muted-foreground"
                          />
                          <div className="flex gap-[30%] items-center">
                            <p className="font-semibold">{`${product.orderSize}`}</p>
                            <div
                              className={`w-4 h-4 rounded-full`}
                              style={{ backgroundColor: product.orderHexCode }}
                            />
                          </div>
                          <div className="flex items-center border rounded-full w-full gap-2 overflow-hidden">
                            <HiMinusSm
                              className="cursor-pointer flex-1"
                              onClick={() =>
                                dispatch(
                                  decreaseProductQty({
                                    id: product.id,
                                    size: product.orderSize,
                                    color: product.orderColor,
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
                                    color: product.orderColor,
                                  })
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-full flex justify-center items-center py-0 px-[10px]"
                        onClick={() => {
                          dispatch(
                            deleteProduct({
                              id: product.id,
                              size: product.orderSize,
                            })
                          );
                        }}
                      >
                        <FiTrash2 size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex justify-end items-end">
                  <div className="flex gap-2 items-center">
                    <p className="flex items-center text-xl font-medium">
                      {totalPrice}
                    </p>
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
            <Button className="mt-1 w-full" disabled={cartProducts.length < 1}>
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
