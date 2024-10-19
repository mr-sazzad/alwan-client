"use client";

import {
  clearCart,
  decreaseProductQty,
  deleteProduct,
  increaseProductQty,
} from "@/redux/api/cart/cartSlice";
import { RootState } from "@/redux/store";
import { IUserCartProduct } from "@/types";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { TbShoppingBagX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import AlertDialogComp from "../alert-dialog/alert-dialog";
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
          <Button size="icon" className="rounded-full" variant="ghost">
            <ShoppingBag size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <SheetHeader>
            <SheetTitle className="text-lg font-medium">Cart</SheetTitle>
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
                            className="font-medium text-muted-foreground"
                          />
                          <div className="flex gap-[30%] items-center">
                            <p className="font-medium">{`${product.orderSize}`}</p>
                            <div
                              className={`w-3 h-3 rounded ring ring-green-200`}
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
                    <p className="text-muted-foreground text-lg font-medium">
                      Empty Cart
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
          <div className="flex flex-col gap-2 w-full">
            <Button
              className="w-full text-lg font-light"
              variant="outline"
              disabled={cartProducts.length < 1}
              onClick={() => setEraseModalOpen(true)}
            >
              Erase all
            </Button>

            <Button className="w-full" disabled={cartProducts.length < 1}>
              <Link href="/checkout" className="text-lg font-light">
                Checkout
              </Link>
            </Button>

            <AlertDialogComp
              open={eraseModalOpen}
              setOpen={setEraseModalOpen}
              title="Clear Shopping Cart"
              description="Are you sure you want to remove all items from your shopping cart? This action cannot be undone."
              handler={handleCartClear}
              buttonText="Yes, Clear Cart"
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
