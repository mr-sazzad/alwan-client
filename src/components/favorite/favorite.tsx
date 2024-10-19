"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

import { PiTrashLight } from "react-icons/pi";
import { TbHeartX } from "react-icons/tb";
import AlertDialogComp from "../alert-dialog/alert-dialog";

import {
  clearFavorites,
  removeProductFromFavorite,
  setFavorites,
} from "@/redux/api/favorite/favoriteSlice";
import { RootState } from "@/redux/store";
import { IProduct } from "@/types";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ImageSlider from "../cards/image-slider";
import CartMoney from "../utils/cart-money";

interface IWishlist {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Favorite: React.FC<IWishlist> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector(
    (state: RootState) => state.favorite.products
  );
  const [eraseModalOpen, setEraseModalOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "alwan_user_favorite_items") {
        const favoriteItems = event.newValue ? JSON.parse(event.newValue) : [];
        dispatch(setFavorites(favoriteItems));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const wishlistItems = localStorage.getItem("alwan_user_favorite_items");
    dispatch(setFavorites(wishlistItems ? JSON.parse(wishlistItems) : []));

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  const handleProductDelete = (product: IProduct) => {
    dispatch(removeProductFromFavorite(product.id));
  };

  const handleCartClear = () => {
    dispatch(clearFavorites());
    toast({
      title: "Success Alert",
      description: "Wishlist products cleared successfully",
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full flex justify-center items-center mr-1"
          >
            <Heart size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <SheetHeader>
            <SheetTitle className="text-lg font-medium">Favorite</SheetTitle>
            <SheetDescription>Here&apos;s your favorite items</SheetDescription>
          </SheetHeader>
          <div className="h-full">
            {wishlistProducts.length ? (
              <div className="flex flex-col justify-between h-full">
                <div className="overflow-y-auto">
                  {wishlistProducts?.map((product: IProduct) => (
                    <div
                      key={product.id}
                      className="flex flex-row gap-2 mt-5 w-full items-center"
                    >
                      <div className="flex flex-row gap-4 flex-1">
                        <div className="relative w-[100px] h-[100px]">
                          <ImageSlider urls={product?.imageUrls} />
                        </div>
                        <div>
                          <Button
                            variant="link"
                            size="sm"
                            className="px-0 py-0"
                          >
                            <Link href={`/t-shirts/${product.id}`}>
                              <p className="text-lg text-wrap text-start">
                                {product.name}
                              </p>
                            </Link>
                          </Button>
                          <div className="flex gap-1 items-center text-sm text-gray-400 mt-5">
                            {product.sizeVariants && (
                              <CartMoney sizeVariants={product.sizeVariants} />
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full flex justify-center items-center py-0 px-[10px]"
                        onClick={() => handleProductDelete(product)}
                      >
                        <PiTrashLight size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 items-center justify-between mt-5 h-full">
                <div className="flex flex-col gap-1 items-center h-full justify-center">
                  <TbHeartX className="text-muted-foreground text-[30px]" />
                  <p className="text-muted-foreground text-lg font-medium">
                    Empty Favorite
                  </p>
                </div>
              </div>
            )}
          </div>

          <SheetFooter>
            <div className="w-full flex flex-col gap-1">
              <Button
                onClick={() => setEraseModalOpen(true)}
                disabled={wishlistProducts.length < 1}
                className="text-lg font-normal"
              >
                Clear Favorite
              </Button>
            </div>
            <AlertDialogComp
              open={eraseModalOpen}
              setOpen={setEraseModalOpen}
              title="Do you want to remove your Favorite?"
              description="This action cannot be undone. Are you sure you want to clear your favorite?"
              handler={handleCartClear}
              buttonText="Yes, clear"
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Favorite;
