"use client";

import DetailsPageImageSlider from "@/components/cards/details-page-slider";
import MaxWidth from "@/components/max-width";
import NotificationDialog from "@/components/modals/notify-dialog";
import ProductFeatures from "@/components/modals/product-features";
import ProductDetailsPageSkeleton from "@/components/skeletons/product-details-skeleton";
import ReviewAndInfoTab from "@/components/tabs/review-and-info-tab";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { addProductToCart } from "@/redux/api/cart/cartSlice";
import { addProductToFavorite } from "@/redux/api/favorite/favoriteSlice";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { AppDispatch, RootState } from "@/redux/store";
import { IReadSizeVariant } from "@/types";
import { Bell, Heart, Loader2, ShoppingCart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailsClient: React.FC = () => {
  const router = useRouter();
  const { product_id } = useParams() as { product_id: string };
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorite.products);

  const { data: product, isLoading } = useGetSingleProductQuery(product_id);

  const [selectedSizeVariant, setSelectedSizeVariant] =
    useState<IReadSizeVariant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(0);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState<boolean>(false);
  const [featuresOpen, setFeaturesOpen] = useState<boolean>(false);

  const availableQuantities = useRef<number>(0);

  useEffect(() => {
    if (product?.data.sizeVariants && product.data.sizeVariants.length > 0) {
      const initialSizeVariant = product.data.sizeVariants[0];
      setSelectedSizeVariant(initialSizeVariant);
      availableQuantities.current = initialSizeVariant.stock;
      setQty(initialSizeVariant.stock > 0 ? 1 : 0);
    }
  }, [product]);

  useEffect(() => {
    if (selectedSizeVariant) {
      availableQuantities.current = selectedSizeVariant.stock;
      setQty(selectedSizeVariant.stock > 0 ? 1 : 0);
    }
  }, [selectedSizeVariant]);

  const isProductInFavorites = useMemo(() => {
    return favorites.some((fav) => fav.id === product?.data.id);
  }, [favorites, product]);

  if (isLoading) {
    return <ProductDetailsPageSkeleton />;
  }

  const handleQtyChange = (increment: boolean): void => {
    setQty((prev) => {
      const newQty = increment ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(newQty, availableQuantities.current));
    });
  };

  const handleSelectSizeVariant = (sizeVariant: IReadSizeVariant): void => {
    setSelectedSizeVariant(sizeVariant);
  };

  const handleAddToCart = (): void => {
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
    const queryString = `?productId=${product.data.id}&quantity=${qty}&sizeId=${selectedSizeVariant.size.id}&colorId=${selectedSizeVariant.colorId}`;
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

  const isComingSoon = product?.data.statusTag === "coming soon";

  return (
    <MaxWidth className="flex flex-col items-center w-full">
      <div className="mt-[100px] md:max-w-5xl w-full flex flex-col lg:gap-20 md:gap-16 gap-10">
        <div className="flex flex-col md:flex-row gap-5 relative w-full h-fit">
          <div className="md:hidden my-4 ml-5">
            {isComingSoon && (
              <p className="text-xs font-medium text-[#9E3500]">Coming Soon</p>
            )}
            <h2 className="text-lg font-medium capitalize">
              {product?.data.name}
            </h2>
            <p className="text-sm font-medium capitalize">
              {product?.data.category.name}
            </p>
            <p className="mt-5 font-semibold capitalize">
              TK. {selectedSizeVariant?.price}
            </p>
          </div>
          {/* Image Slider */}
          <div className="flex justify-center items-center lg:h-[450px] lg:w-[450px] md:w-[320px] md:h-[320px] w-full relative flex-1 h-fit">
            {product?.data.imageUrls && (
              <DetailsPageImageSlider urls={product.data.imageUrls} />
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 w-full h-full">
            <div className="hidden md:block">
              {isComingSoon && (
                <p className="text-xs font-medium text-[#9E3500]">
                  Coming Soon
                </p>
              )}
              <h2 className="text-lg font-medium capitalize">
                {product?.data.name}
              </h2>
              <p className="text-sm font-medium capitalize">
                {product?.data.category.name}
              </p>
              <p className="md:mt-5 text-xl font-semibold">
                TK. {selectedSizeVariant?.price}
              </p>
            </div>

            <div className="mt-3">
              <p className="font-medium">Select Size:</p>
              <div className="flex justify-between items-center gap-1 mt-2 w-full">
                {product?.data.sizeVariants &&
                  product.data.sizeVariants.map(
                    (sizeVariant: IReadSizeVariant) => (
                      <Button
                        key={sizeVariant.id}
                        className="uppercase mr-1 px-6 w-full"
                        variant={
                          selectedSizeVariant?.id === sizeVariant.id
                            ? "default"
                            : "secondary"
                        }
                        onClick={() => handleSelectSizeVariant(sizeVariant)}
                      >
                        {sizeVariant.size.name}
                      </Button>
                    )
                  )}
              </div>
            </div>
            <div className="py-2 flex gap-1 items-center ml-2">
              <IoCheckmarkCircleOutline size={12} />
              <p className="text-xs font-medium text-muted-foreground">
                {`${availableQuantities.current} ${
                  availableQuantities.current > 1 ? "are" : "is"
                } available`}
              </p>
            </div>

            {/* quantity */}
            <div className="flex flex-col gap-2 mt-3">
              {!isComingSoon && (
                <div className="flex gap-2 justify-between items-center border border-gray-200 overflow-hidden h-10 w-full py-0.5">
                  <Button
                    className="cursor-pointer p-1 flex-1 text-xl"
                    onClick={() => handleQtyChange(false)}
                    variant="secondary"
                  >
                    -
                  </Button>
                  <p className="flex-1 flex justify-center">{qty}</p>
                  <Button
                    className="cursor-pointer p-1 flex-1 text-xl"
                    onClick={() => handleQtyChange(true)}
                    variant="secondary"
                  >
                    +
                  </Button>
                </div>
              )}

              {isComingSoon ? (
                <>
                  <Button
                    className="px-6 flex items-center font-medium text-lg"
                    onClick={() => setIsNotificationDialogOpen(true)}
                    size="lg"
                  >
                    <Bell className="mr-2 h-4 w-4" /> <p>Notify Me</p>
                  </Button>
                  <Button
                    className="px-6 flex items-center font-medium"
                    variant="outline"
                    onClick={handleFavorite}
                    size="lg"
                  >
                    <div className="flex justify-center items-center text-lg">
                      <Heart
                        className="mr-2 h-4 w-4"
                        fill={isProductInFavorites ? "currentColor" : "none"}
                        stroke={isProductInFavorites ? "none" : "currentColor"}
                      />
                      <p>{isProductInFavorites ? "Remove" : "Favorite"}</p>
                    </div>
                  </Button>
                </>
              ) : (
                <>
                  {/* add to cart button */}
                  <div className="flex w-full gap-2">
                    <Button
                      className="px-6 flex items-center font-medium text-lg w-full"
                      variant="outline"
                      onClick={handleAddToCart}
                      disabled={!qty}
                      size="lg"
                    >
                      <ShoppingCart className="mr-2 w-4 h-4" />{" "}
                      <p>Add To Bag</p>
                    </Button>
                    <Button
                      className="px-6 flex items-center font-medium w-full"
                      variant="outline"
                      onClick={handleFavorite}
                      size="lg"
                    >
                      <div className="flex justify-center items-center text-lg">
                        <Heart
                          className="mr-2 h-4 w-4"
                          fill={isProductInFavorites ? "currentColor" : "none"}
                          stroke={
                            isProductInFavorites ? "none" : "currentColor"
                          }
                        />
                        <p>{isProductInFavorites ? "Remove" : "Favorite"}</p>
                      </div>
                    </Button>
                  </div>

                  {/* buy now button */}
                  <Button
                    className="px-6 flex gap-2 items-center font-medium text-lg"
                    onClick={handleBuyNow}
                    disabled={!qty}
                    size="lg"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Buy It Now"
                    )}
                  </Button>
                </>
              )}
            </div>

            {/* description */}
            <div className="mt-5">
              {product?.data.description &&
                product.data.description.map((desc: string, i: number) => (
                  <ul key={i} className="mt-1 flex flex-col gap-2">
                    <li>
                      <p className="sm:text-base text-sm text-muted-foreground">
                        {desc}
                      </p>
                    </li>
                  </ul>
                ))}
            </div>

            {/* features */}
            <div>
              <Button
                variant="link"
                className="px-0 text-lg"
                onClick={() => setFeaturesOpen(true)}
              >
                View Product Features
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full">
          <ReviewAndInfoTab />
        </div>
      </div>

      <NotificationDialog
        open={isNotificationDialogOpen}
        setOpen={setIsNotificationDialogOpen}
        productId={product?.data.id}
        productName={product?.data.name}
      />
      <ProductFeatures
        open={featuresOpen}
        setOpen={setFeaturesOpen}
        product={product.data}
      />
    </MaxWidth>
  );
};

export default ProductDetailsClient;
