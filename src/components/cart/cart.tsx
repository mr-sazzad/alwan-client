"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import {
  clearCart,
  decreaseProductQty,
  deleteProduct,
  increaseProductQty,
} from "@/redux/api/cart/cartSlice";
import { RootState } from "@/redux/store";
import { IProduct } from "@/types";
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertDialogComp from "../alert-dialog/alert-dialog";

const ClientOnly = dynamic<{ children: React.ReactNode }>(
  () => Promise.resolve((props) => <>{props.children}</>),
  { ssr: false }
);

interface ICart {
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
}

const Cart: React.FC<ICart> = ({ cartOpen, setCartOpen }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleCartClear = () => {
    dispatch(clearCart());
    setAlertOpen(false);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const calculateTotalPrice = () => {
    return cartProducts
      .reduce((total: number, product: IProduct) => {
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
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="relative rounded-full">
          <ShoppingBag className="h-5 w-5" />
          <ClientOnly>
            {cartProducts.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {cartProducts.length}
              </span>
            )}
          </ClientOnly>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="font-medium">Cart</SheetTitle>
          <SheetDescription>
            {cartProducts.length === 0
              ? "Your cart is empty."
              : `You have ${cartProducts.length} item${
                  cartProducts.length > 1 ? "s" : ""
                } in your cart.`}
          </SheetDescription>
        </SheetHeader>
        {cartProducts.length > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-6">
              {cartProducts.map((product, index) => (
                <div
                  key={`${product.id}-${product.orderSize}-${product.orderColor}`}
                >
                  <div className="flex py-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-medium">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {product.orderSize} | {product.orderColor}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              dispatch(
                                decreaseProductQty({
                                  id: product.id,
                                  size: product.orderSize,
                                  color: product.orderColor,
                                })
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {product.orderQty}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              dispatch(
                                increaseProductQty({
                                  id: product.id,
                                  size: product.orderSize,
                                  color: product.orderColor,
                                })
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => {
                            dispatch(
                              deleteProduct({
                                id: product.id,
                                size: product.orderSize,
                                color: product.orderColor,
                              })
                            );
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < cartProducts.length - 1 && <Separator />}
                </div>
              ))}
            </ScrollArea>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span className="font-medium">TK. {totalPrice}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Button className="w-full" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetTrigger>
              </SheetFooter>
              <div className="text-center">
                <Button
                  variant="outline"
                  className="text-sm w-full"
                  onClick={() => setAlertOpen(true)}
                >
                  Remove all items
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
            <SheetTrigger asChild>
              <Button variant="link" size="sm" className="text-sm">
                Add items to your cart to checkout
              </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>

      <AlertDialogComp
        open={alertOpen}
        setOpen={setAlertOpen}
        buttonText="Clear Cart"
        description="Are you sure you want to remove all items from your shopping cart? This action cannot be undone."
        title="Clear Shopping Cart"
        handler={handleCartClear}
      />
    </Sheet>
  );
};

export default Cart;
