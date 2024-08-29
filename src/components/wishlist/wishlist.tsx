"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

import { IoBagHandleOutline } from "react-icons/io5";
import { PiTrashLight } from "react-icons/pi";
import { TbHeartX } from "react-icons/tb";
import AlertDialogComp from "../alert-dialog/alert-dialog";

import {
  clearWishlist,
  deleteProduct,
  setWishlist,
} from "@/redux/api/wishlist/wishlistSlice";
import { RootState } from "@/redux/store";
import { IProduct } from "@/types";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

interface IWishlist {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Wishlist: React.FC<IWishlist> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector(
    (state: RootState) => state.wishlist.products
  );
  const [eraseModalOpen, setEraseModalOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "alwan_user_wishlist_items") {
        const wishlistItems = event.newValue ? JSON.parse(event.newValue) : [];
        dispatch(setWishlist(wishlistItems));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const wishlistItems = localStorage.getItem("alwan_user_wishlist_items");
    dispatch(setWishlist(wishlistItems ? JSON.parse(wishlistItems) : []));

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  const handleProductDelete = (productId: string) => {
    dispatch(deleteProduct({ id: productId }));
  };

  const handleCartClear = () => {
    dispatch(clearWishlist());
    toast({
      title: "Success Alert",
      description: "Wishlist products cleared successfully",
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <IoBagHandleOutline />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <SheetHeader>
            <SheetTitle>Wishlist</SheetTitle>
            <SheetDescription>
              Here&lsquo;s your wishlist items
            </SheetDescription>
          </SheetHeader>
          <div className="h-full">
            {wishlistProducts.length ? (
              <div className="flex flex-col justify-between h-full">
                <div className="overflow-y-auto">
                  {wishlistProducts.map((product: IProduct) => (
                    <div
                      key={product.id}
                      className="flex flex-row gap-2 mt-5 w-full items-center"
                    >
                      <div className="flex flex-row gap-4 flex-1">
                        <div className="relative w-[80px] h-[80px]">
                          <ImageSlider urls={product.imageUrls} />
                        </div>
                        <div>
                          <Button
                            variant="link"
                            size="sm"
                            className="px-0 py-0"
                          >
                            <Link href={`/t-shirts/${product.id}`}>
                              <SmallName
                                name={product.name}
                                className="font-medium"
                              />
                            </Link>
                          </Button>
                          {/* <div className="flex gap-1 items-center text-sm text-gray-400">
                            {product.prices && (
                              <CartMoney prices={product.prices} />
                            )}
                          </div> */}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full flex justify-center items-center py-0 px-[10px]"
                        onClick={() => handleProductDelete(product.id)}
                      >
                        <PiTrashLight size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="w-full flex flex-col gap-1">
                  <Button
                    variant="destructive"
                    onClick={() => setEraseModalOpen(true)}
                    disabled={wishlistProducts.length < 1}
                  >
                    Clear Wishlist
                  </Button>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 items-center justify-between mt-5 h-full">
                <div className="flex flex-col gap-1 items-center h-full justify-center">
                  <TbHeartX className="text-muted-foreground text-[30px]" />
                  <p className="text-muted-foreground text-lg font-semibold">
                    Your Wishlist Is Empty
                  </p>
                </div>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            )}
          </div>

          <SheetFooter>
            <AlertDialogComp
              open={eraseModalOpen}
              setOpen={setEraseModalOpen}
              title="Do you want to remove your wishlist"
              description="hello"
              handler={handleCartClear}
              buttonText="Yes, I Want"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Wishlist;
