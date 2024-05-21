"use client";

import DetailsPageImageSlider from "@/components/cards/details-page-slider";
import { Button } from "@/components/ui/button";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/helpers/local-storage";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// react icons
import Loading from "@/app/loading";
import MaxWidth from "@/components/max-width";
import { toast } from "@/components/ui/use-toast";
import Money from "@/components/utils/money";
import { ITShirt } from "@/types";
import { PiDotDuotone } from "react-icons/pi";

const ProductDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProductQuery(id);
  const [selectedSize, setSelectedSize] = useState("");
  const [cartProducts, setCartProducts] = useState<ITShirt[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const storedCartItems = getFromLocalStorage("cartItems");
    if (storedCartItems) {
      const parsedItems = JSON.parse(storedCartItems);
      if (Array.isArray(parsedItems)) {
        setCartProducts(parsedItems);
      } else {
        setCartProducts([]);
      }
    } else {
      setCartProducts([]);
    }

    setQty(product?.totalStocks > 0 ? 1 : 0);
  }, [product]);

  const handleQtyIncrease = () => {
    setQty((prev) => {
      const maxQty = product.totalStocks;
      return prev < maxQty ? prev + 1 : prev;
    });
  };

  const handleQtyDecrease = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : prev));
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = (tShirt: ITShirt) => {
    if (!selectedSize) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a size first",
      });
      return;
    }

    // Check if the cart already contains the product with the selected size
    const productIndex = cartProducts.findIndex(
      (cartProduct) =>
        cartProduct.id === tShirt.id && cartProduct.orderSize === selectedSize
    );

    if (productIndex !== -1) {
      const updatedCart = [...cartProducts];
      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        orderQty: updatedCart[productIndex].orderQty + qty,
      };
      setCartProducts(updatedCart);
      setToLocalStorage("cartItems", JSON.stringify(updatedCart));
      toast({
        title: "Success",
        description: "The product quantity has been updated in your cart.",
      });
    } else {
      const newProduct = {
        ...tShirt,
        orderSize: selectedSize,
        orderQty: qty,
      };
      const updatedCart = [...cartProducts, newProduct];
      setCartProducts(updatedCart);
      setToLocalStorage("cartItems", JSON.stringify(updatedCart));
      toast({
        title: "Success",
        description: "The product was added to your cart.",
      });
    }
  };

  const handleBuyNow = (product: ITShirt) => {
    if (!selectedSize) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a size first",
      });
      return;
    }

    const queryString = `?productId=${product.id}&quantity=${qty}&size=${selectedSize}`;
    router.push(`/checkout${queryString}`);
  };

  return (
    <MaxWidth>
      <div className="flex md:flex-row flex-col gap-5 relative mt-[90px]">
        <div className="relative lg:h-[450px] lg:w-[450px] md:w-[350px] flex-2 flex justify-center">
          {product.images && <DetailsPageImageSlider urls={product.images} />}
        </div>

        <div className="flex-1">
          <h2 className="md:text-3xl text-2xl font-semibold ">
            {product.name}
          </h2>
          {product && (
            <Money prices={product.prices} className="md:mt-6 mt-3" />
          )}

          <div className="mt-3">
            <p className="font-semibold">Select Your Size:</p>
            <div className="flex mt-3">
              {product.sizes &&
                product.sizes.map((size: string, i: number) => (
                  <Button
                    key={i}
                    className="uppercase mr-1 px-6"
                    variant={selectedSize === size ? "default" : "secondary"}
                    onClick={() => handleSelectSize(product.id, size)}
                  >
                    {size}
                  </Button>
                ))}
            </div>
          </div>
          {/* quantity */}
          <div className="flex gap-2 mt-4">
            <div className="flex gap-2 justify-around items-center border border-gray-200 w-[120px] rounded h-10">
              <button
                className="cursor-pointer p-1"
                onClick={handleQtyDecrease}
              >
                -
              </button>
              <p>{qty}</p>
              <button
                className="cursor-pointer p-1"
                onClick={handleQtyIncrease}
              >
                +
              </button>
            </div>
            {/* buy now button */}
            <Button
              className="px-6 flex gap-2 items-center"
              variant="default"
              onClick={() => handleBuyNow(product)}
            >
              <p>Buy Now</p>
            </Button>
            {/* add to cart button */}
            <Button
              className="px-6 flex gap-2 items-center"
              variant="default"
              onClick={() => handleAddToCart(product)}
            >
              <p>Add To Cart</p>
            </Button>
          </div>
          {/* description */}
          <div className="mt-5">
            {product.desc &&
              product.desc.map((desc: string, i: number) => (
                <ul key={i} className="mt-3 flex flex-col gap-2">
                  <li>{desc}</li>
                </ul>
              ))}
          </div>

          {/* features */}
          <div>
            <p className="text-lg font-semibold mt-3">
              Detailed Specification:
            </p>
            {product.features &&
              product.features.map((info: string, i: number) => (
                <ul key={i} className="flex flex-col gap-3">
                  <li className="flex items-center">
                    <PiDotDuotone size={24} />
                    {info}
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default ProductDetailsPage;
