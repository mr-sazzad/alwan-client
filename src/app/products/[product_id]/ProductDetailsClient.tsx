"use client";

import { Bell, CircleDot, Heart, Loader2, ShoppingCart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

import DetailsPageImageSlider from "@/components/cards/details-page-slider";
import MaxWidth from "@/components/max-width";
import NotificationDialog from "@/components/modals/notify-dialog";
import ProductFeatures from "@/components/modals/product-features";
import ReviewAndInfoTab from "@/components/tabs/review-and-info-tab";

import { addProductToCart } from "@/redux/api/cart/cartSlice";
import { addProductToFavorite } from "@/redux/api/favorite/favoriteSlice";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { AppDispatch, RootState } from "@/redux/store";
import { ISizeVariant } from "@/types";

export default function Component() {
  const router = useRouter();
  const { product_id } = useParams() as { product_id: string };
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorite.products);

  const { data: product, isLoading } = useGetSingleProductQuery(product_id);

  const [selectedSizeVariant, setSelectedSizeVariant] =
    useState<ISizeVariant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(0);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState<boolean>(false);
  const [featuresOpen, setFeaturesOpen] = useState<boolean>(false);

  useEffect(() => {
    if (product?.data.sizeVariants && product.data.sizeVariants.length > 0) {
      const initialSizeVariant = product.data.sizeVariants[0];
      setSelectedSizeVariant(initialSizeVariant);
      setQty(initialSizeVariant.stock > 0 ? 1 : 0);
    }
  }, [product]);

  const isProductInFavorites = useMemo(() => {
    return favorites.some((fav) => fav.id === product?.data.id);
  }, [favorites, product]);

  const handleQtyChange = (increment: boolean): void => {
    setQty((prev) => {
      const newQty = increment ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(newQty, selectedSizeVariant?.stock || 0));
    });
  };

  const handleSelectSizeVariant = (sizeVariant: ISizeVariant): void => {
    setSelectedSizeVariant(sizeVariant);
    setQty(sizeVariant.stock > 0 ? 1 : 0);
  };

  const handleAddToBag = (): void => {
    if (!selectedSizeVariant || !product) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a size first",
      });
      return;
    }

    dispatch(
      addProductToCart({
        ...product.data,
        orderSize: selectedSizeVariant.size.name,
        orderSizeId: selectedSizeVariant.size.id,
        orderQty: qty,
        orderColor: selectedSizeVariant.color.name,
        orderColorId: selectedSizeVariant.color.id,
        orderHexCode: selectedSizeVariant.color.hexCode,
      })
    );
    toast({
      title: "Success",
      description: "The product was added to your cart.",
    });
  };

  const handleBuyNow = (): void => {
    if (!selectedSizeVariant || !product) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a size first",
      });
      return;
    }

    setLoading(true);
    const queryString = `?productId=${product?.data?.id}&quantity=${qty}&sizeId=${selectedSizeVariant.size.id}&colorId=${selectedSizeVariant.colorId}`;
    router.push(`/checkout${queryString}`);
    setLoading(false);
  };

  const handleFavorite = (): void => {
    if (product) {
      dispatch(addProductToFavorite(product.data));

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

  const isComingSoon = product?.data?.stockStatus === "COMING_SOON";

  if (isLoading) {
    return (
      <MaxWidth className="flex flex-col items-center w-full mt-24">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-full md:w-1/2 aspect-square rounded-lg" />

            <div className="w-full md:w-1/2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </MaxWidth>
    );
  }

  return (
    <MaxWidth className="flex flex-col items-center w-full">
      <div className="mt-[100px] w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            {product?.data?.imageUrls && (
              <DetailsPageImageSlider urls={product.data.imageUrls} />
            )}
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <span className="inline-block px-2 py-1 text-sm font-medium text-[#D33918] mb-2">
                {product?.data?.stockStatus === "COMING_SOON"
                  ? "Coming Soon"
                  : product?.data?.availabilityTag}
              </span>

              <h1 className="text-xl font-medium capitalize">
                {product?.data?.name}
              </h1>
              <p className="text-lg text-muted-foreground capitalize">
                {product?.data?.category?.name}
              </p>
              <p className="text-xl font-medium mt-2">
                TK. {selectedSizeVariant?.price}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Select Your Size
                </label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {product?.data?.sizeVariants &&
                    product.data?.sizeVariants.map(
                      (sizeVariant: ISizeVariant) => (
                        <Button
                          key={sizeVariant.id}
                          className="w-full"
                          variant={
                            selectedSizeVariant?.id === sizeVariant.id
                              ? "default"
                              : "outline"
                          }
                          onClick={() => handleSelectSizeVariant(sizeVariant)}
                        >
                          {sizeVariant.size.name}
                        </Button>
                      )
                    )}
                </div>
              </div>

              {selectedSizeVariant && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <CircleDot className="mr-1 w-3 h-3" />
                  <span>
                    {selectedSizeVariant.stock}{" "}
                    {selectedSizeVariant.stock > 1 ? "are" : "is"} available
                  </span>
                </div>
              )}

              {!isComingSoon && (
                <div className="flex items-center gap-2">
                  <Button
                    className="px-4 py-2 text-xl"
                    onClick={() => handleQtyChange(false)}
                    variant="outline"
                  >
                    -
                  </Button>
                  <span className="flex-1 text-center w-full border py-[7px] rounded-md">
                    {qty}
                  </span>
                  <Button
                    className="px-4 py-2 text-xl"
                    onClick={() => handleQtyChange(true)}
                    variant="outline"
                  >
                    +
                  </Button>
                </div>
              )}

              {isComingSoon ? (
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => setIsNotificationDialogOpen(true)}
                    size="lg"
                  >
                    <Bell className="mr-2 h-4 w-4" /> Notify Me
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleFavorite}
                    size="lg"
                  >
                    <Heart
                      className="mr-2 h-4 w-4"
                      fill={isProductInFavorites ? "currentColor" : "none"}
                      stroke={isProductInFavorites ? "none" : "currentColor"}
                    />
                    {isProductInFavorites
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleAddToBag}
                      disabled={!qty}
                      size="lg"
                    >
                      <ShoppingCart className="mr-2 w-4 h-4" /> Add To Bag
                    </Button>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleFavorite}
                      size="lg"
                    >
                      <Heart
                        className="mr-2 h-4 w-4"
                        fill={isProductInFavorites ? "currentColor" : "none"}
                        stroke={isProductInFavorites ? "none" : "currentColor"}
                      />
                      {isProductInFavorites ? "Remove" : "Favorite"}
                    </Button>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleBuyNow}
                    disabled={!qty}
                    size="lg"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin mr-2" />
                    ) : null}
                    Buy Now
                  </Button>
                </div>
              )}
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm  text-muted-foreground">
                    {product?.data?.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="features">
                <AccordionTrigger>Product Features</AccordionTrigger>
                <AccordionContent>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm"
                    onClick={() => setFeaturesOpen(true)}
                  >
                    View detailed product features
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div>
          <ReviewAndInfoTab />
        </div>
      </div>

      <NotificationDialog
        open={isNotificationDialogOpen}
        setOpen={setIsNotificationDialogOpen}
        productId={product?.data?.id}
        productName={product?.data?.name}
      />
      <ProductFeatures
        open={featuresOpen}
        setOpen={setFeaturesOpen}
        product={product?.data}
      />
    </MaxWidth>
  );
}
