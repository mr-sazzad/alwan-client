"use client";

import Loading from "@/app/loading";
import DetailsPageImageSlider from "@/components/cards/details-page-slider";
import MaxWidth from "@/components/max-width";
import ReviewAndInfoTab from "@/components/tabs/review-and-info-tab";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { addProductToCart } from "@/redux/api/cart/cartSlice";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { TbLoader } from "react-icons/tb";
import { useDispatch } from "react-redux";

const ProductDetailsPage = () => {
  const router = useRouter();
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading } = useGetSingleProductQuery(product_id);

  const [selectedSizeVariant, setSelectedSizeVariant] = useState<any | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [qty, setQty] = useState(0);

  const availableQuantities = useRef(0);

  useEffect(() => {
    if (
      product &&
      product.data.sizeVariants &&
      product.data.sizeVariants.length > 0
    ) {
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

  if (isLoading) {
    return <Loading className="h-[93vh]" />;
  }

  const handleQtyIncrease = () => {
    setQty((prev) => {
      const maxQty = availableQuantities.current;
      return prev < maxQty ? prev + 1 : prev;
    });
  };

  const handleQtyDecrease = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleSelectSizeVariant = (sizeVariant: any) => {
    setSelectedSizeVariant(sizeVariant);
    if (sizeVariant) {
      availableQuantities.current = sizeVariant.stock;
      setQty(sizeVariant.stock > 0 ? 1 : 0);
    }
  };

  const handleAddToCart = (product: any) => {
    if (!selectedSizeVariant) {
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
        orderQty: qty,
      })
    );
    toast({
      title: "Success",
      description: "The product was added to your cart.",
    });
  };

  const handleBuyNow = (product: any) => {
    if (!selectedSizeVariant) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a size first",
      });
      return;
    }

    setLoading(true);
    const queryString = `?productId=${product.data.id}&quantity=${qty}&size=${selectedSizeVariant.size.name}`;
    router.push(`/checkout${queryString}`);
    setLoading(false);
  };

  return (
    <MaxWidth className="flex justify-center w-full">
      <div className="mt-[90px] md:max-w-5xl w-full">
        <div className="flex flex-col md:flex-row gap-5 relative w-full h-fit">
          <div className="md:hidden my-4 ml-5">
            <h2 className="text-lg font-medium capitalize">
              {product?.data.name}
            </h2>
            <p className="text-sm font-medium capitalize">
              {product?.data.category.name}
            </p>
            <p className="mt-5 text-sm font-medium capitalize">
              ${product?.data.price}
            </p>
          </div>
          {/* Image Slider */}
          <div className="flex justify-center items-center lg:h-[450px] lg:w-[450px] md:w-[320px] md:h-[320px] w-full relative flex-1 h-fit bg-blue-700">
            {product?.data.imageUrls && (
              <DetailsPageImageSlider urls={product?.data.imageUrls} />
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 w-full h-full">
            <div className="hidden md:block">
              <h2 className="text-lg font-medium capitalize">
                {product?.data.name}
              </h2>
              <p className="text-sm font-medium capitalize">
                {product?.data.category.name}
              </p>
              <p className="md:mt-5 text-xl font-semibold">
                Price: ${product?.data.price}
              </p>
            </div>

            <div className="mt-3">
              <p className="font-semibold">Select Size:</p>
              <div className="flex justify-between items-center gap-1 mt-2 w-full">
                {product?.data.sizeVariants &&
                  product.data.sizeVariants.map(
                    (sizeVariant: any, i: number) => (
                      <Button
                        key={i}
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
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex gap-2 justify-between items-center border border-gray-200 rounded-full overflow-hidden h-10 w-full py-0.5">
                <Button
                  className="cursor-pointer p-1 flex-1 text-xl"
                  onClick={handleQtyDecrease}
                  variant="secondary"
                >
                  -
                </Button>
                <p className="flex-1 flex justify-center">{qty}</p>
                <Button
                  className="cursor-pointer p-1 flex-1 text-xl"
                  onClick={handleQtyIncrease}
                  variant="secondary"
                >
                  +
                </Button>
              </div>

              {/* buy now button */}
              <Button
                className="px-6 flex gap-2 items-center rounded-full font-medium"
                onClick={() => handleBuyNow(product)}
                disabled={!qty}
                size="lg"
              >
                {loading ? (
                  <TbLoader size={16} className="animate-spin" />
                ) : (
                  "Buy Now"
                )}
              </Button>

              {/* add to cart button */}
              <Button
                className="px-6 flex gap-2 items-center rounded-full font-medium"
                variant="outline"
                onClick={() => handleAddToCart(product)}
                disabled={!qty}
                size="lg"
              >
                Add To Bag
              </Button>
            </div>

            {/* description */}
            <div className="mt-5">
              {product.data.description &&
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
              <p className="text-lg font-semibold mt-3">Specifications:</p>
              {product.data.features &&
                product.data.features.map((info: string, i: number) => (
                  <ul key={i} className="flex flex-col gap-3">
                    <li className="flex items-center gap-1">
                      <IoIosCheckmarkCircleOutline
                        size={14}
                        className="text-green-500"
                      />
                      <p className="sm:text-base text-sm text-muted-foreground">
                        {info}
                      </p>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 md:mt-10 w-full">
          <ReviewAndInfoTab />
        </div>
      </div>
    </MaxWidth>
  );
};

export default ProductDetailsPage;
