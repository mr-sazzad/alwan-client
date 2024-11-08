"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import {
  clearFavorites,
  removeProductFromFavorite,
  setFavorites,
} from "@/redux/api/favorite/favoriteSlice";
import { RootState } from "@/redux/store";
import { IProduct } from "@/types";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IFavorite {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Favorite: React.FC<IFavorite> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector(
    (state: RootState) => state.favorite.products
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const { toast } = useToast();

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
    toast({
      title: "Item Removed",
      description: `${product.name} has been removed from your favorites.`,
    });
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
    setAlertOpen(false);
    toast({
      title: "Favorites Cleared",
      description: "All items have been removed from your favorites.",
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Heart size={20} />
          {wishlistProducts.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              {wishlistProducts.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="font-medium">Favorite Items</SheetTitle>
          <SheetDescription>
            {wishlistProducts.length === 0
              ? "Your favorites list is empty."
              : `You have ${wishlistProducts.length} item${
                  wishlistProducts.length > 1 ? "s" : ""
                } in your favorites.`}
          </SheetDescription>
        </SheetHeader>
        {wishlistProducts.length > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-6 my-4">
              {wishlistProducts.map((product: IProduct, index) => (
                <div key={product.id}>
                  <div className="flex py-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform hover:scale-110"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between">
                      <div className="flex-1">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-base font-medium hover:underline">
                            {product.name}
                          </h3>
                        </Link>
                        {product.sizeVariants && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {`${product.sizeVariants[0].size.name} | ${product.sizeVariants[0].color.name}`}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {product.sizeVariants &&
                            `TK ${product.sizeVariants[0].price.toFixed(2)}`}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-destructive hover:text-destructive/90"
                          onClick={() => handleProductDelete(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    {index < wishlistProducts.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <SheetFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setAlertOpen(true)}
              >
                Clear All Favorites
              </Button>
              <SheetClose asChild>
                <Button className="w-full sm:w-auto" asChild>
                  Continue Shopping
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <Heart className="h-16 w-16 text-muted-foreground" />
            <div className="text-xl font-medium text-muted-foreground">
              Your favorites list is empty
            </div>
            <SheetClose asChild>
              <Button variant="link" size="lg" className="mt-4">
                Start Shopping
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Favorites</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove all items from your favorites?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearFavorites}>
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  );
};

export default Favorite;
