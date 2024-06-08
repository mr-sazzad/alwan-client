"use client";

import Loading from "@/app/loading";
import SingleProductPageBreadcrumb from "@/components/breadcrumbs/single-product-page-breadcrumb";
import DetailsPageImageSlider from "@/components/cards/details-page-slider";
import MaxWidth from "@/components/max-width";
import ReviewAndInfoTab from "@/components/tabs/review-and-info-tab";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Money from "@/components/utils/money";
import { addProductToCart } from "@/redux/api/cart/cartSlice";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { ITShirt } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// react-icons
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { TbLoader } from "react-icons/tb";

const ProductDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading } = useGetSingleProductQuery(id);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [qty, setQty] = useState(0);

  // Use useRef to store available quantities
  const availableQuantities = useRef(0);

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      const initialSize = product.sizes[0];
      setSelectedSize(initialSize);
      const initialSizeQuantities =
        product[`${initialSize.toLowerCase()}SizeStock`];
      availableQuantities.current = initialSizeQuantities;
      setQty(initialSizeQuantities > 0 ? 1 : 0);
    }
  }, [product]);

  useEffect(() => {
    if (product && selectedSize) {
      const selectedSizeQuantities =
        product[`${selectedSize.toLowerCase()}SizeStock`];
      availableQuantities.current = selectedSizeQuantities;
      setQty(selectedSizeQuantities > 0 ? 1 : 0);
    }
  }, [product, selectedSize]);

  const handleQtyIncrease = () => {
    setQty((prev) => {
      const maxQty = availableQuantities.current;
      return prev < maxQty ? prev + 1 : prev;
    });
  };

  const handleQtyDecrease = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : prev));
  };

  if (isLoading) {
    return <Loading className="h-[93vh]" />;
  }

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    if (product) {
      const sizeQuantities = product[`${size.toLowerCase()}SizeStock`];
      availableQuantities.current = sizeQuantities;
      setQty(sizeQuantities > 0 ? 1 : 0);
    }
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

    dispatch(
      addProductToCart({
        ...tShirt,
        orderSize: selectedSize,
        orderQty: qty,
      })
    );
    toast({
      title: "Success",
      description: "The product was added to your cart.",
    });
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

    setLoading(true);
    const queryString = `?productId=${product.id}&quantity=${qty}&size=${selectedSize}`;
    router.push(`/checkout${queryString}`);
    setLoading(false);
  };
  return (
    <MaxWidth>
      <div className="mt-[90px]">
        <div>
          <SingleProductPageBreadcrumb name={product?.name} />
          <div className="flex md:flex-row flex-col gap-5 relative">
            <div className="relative lg:h-[450px] lg:w-[450px] md:w-[350px] flex-2 flex justify-center">
              {product.images && (
                <DetailsPageImageSlider urls={product.images} />
              )}
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
                <div className="flex gap-1 mt-3">
                  {product.sizes &&
                    product.sizes.map((size: string, i: number) => (
                      <Button
                        key={i}
                        className="uppercase mr-1 px-6"
                        variant={
                          selectedSize === size ? "default" : "secondary"
                        }
                        onClick={() => handleSelectSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                </div>
              </div>
              <div className="py-2 flex gap-1 items-center ml-2">
                <IoCheckmarkCircleOutline />
                <p className="text-sm font-medium">
                  {`${availableQuantities.current} ${
                    availableQuantities.current > 1 ? "are" : "is"
                  } available`}
                </p>
              </div>
              {/* quantity */}
              <div className="flex sm:flex-row flex-col gap-2 mt-2">
                <div className="flex gap-2 justify-between items-center border border-gray-200 rounded-lg h-10 sm:w-[120px] w-full px-1 py-0.5">
                  <button
                    className="cursor-pointer p-1 flex-1"
                    onClick={handleQtyDecrease}
                  >
                    -
                  </button>
                  <p className="flex-1 flex justify-center">{qty}</p>
                  <button
                    className="cursor-pointer p-1 flex-1"
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
                  disabled={!qty}
                >
                  {loading ? (
                    <TbLoader size={16} className="animate-spin" />
                  ) : (
                    "Buy Now"
                  )}
                </Button>
                {/* add to cart button */}
                <Button
                  className="px-6 flex gap-2 items-center"
                  variant="outline"
                  onClick={() => handleAddToCart(product)}
                  disabled={!qty}
                >
                  <p>Add To Cart</p>
                </Button>
              </div>
              {/* description */}
              <div className="mt-5">
                {product.desc &&
                  product.desc.map((desc: string, i: number) => (
                    <ul key={i} className="mt-3 flex flex-col gap-2">
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
                <p className="text-lg font-semibold mt-3">
                  Detailed Specification:
                </p>
                {product.features &&
                  product.features.map((info: string, i: number) => (
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
        </div>
        <Separator
          orientation="horizontal"
          className="border-[0.5px] border-gray-200 my-10"
        />
        <div className="flex justify-center">
          <ReviewAndInfoTab />
        </div>
      </div>
    </MaxWidth>
  );
};

export default ProductDetailsPage;

// "use client";

// import Loading from "@/app/loading";
// import SingleProductPageBreadcrumb from "@/components/breadcrumbs/single-product-page-breadcrumb";
// import DetailsPageImageSlider from "@/components/cards/details-page-slider";
// import MaxWidth from "@/components/max-width";
// import ReviewAndInfoTab from "@/components/tabs/review-and-info-tab";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/use-toast";
// import Money from "@/components/utils/money";
// import { addProductToCart } from "@/redux/api/cart/cartSlice";
// import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
// import { ITShirt } from "@/types";
// import { Separator } from "@radix-ui/react-separator";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";

// // react-icons
// import { IoCheckmarkCircleOutline } from "react-icons/io5";
// import { PiDotDuotone } from "react-icons/pi";
// import { TbLoader } from "react-icons/tb";

// const ProductDetailsPage = () => {
//   const router = useRouter();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { data: product, isLoading } = useGetSingleProductQuery(id);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [qty, setQty] = useState(0);

//   // Use useRef to store available quantities
//   const availableQuantities = useRef(0);

//   useEffect(() => {
//     if (product && product.sizes && product.sizes.length > 0) {
//       const initialSize = product.sizes[0];
//       setSelectedSize(initialSize);
//       const initialSizeQuantities =
//         product[`${initialSize.toLowerCase()}SizeStock`];
//       availableQuantities.current = initialSizeQuantities;
//       setQty(initialSizeQuantities > 0 ? 1 : 0);
//     }
//   }, [product]);

//   useEffect(() => {
//     if (product && selectedSize) {
//       const selectedSizeQuantities =
//         product[`${selectedSize.toLowerCase()}SizeStock`];
//       availableQuantities.current = selectedSizeQuantities;
//       setQty(selectedSizeQuantities > 0 ? 1 : 0);
//     }
//   }, [product, selectedSize]);

//   const handleQtyIncrease = () => {
//     setQty((prev) => {
//       const maxQty = availableQuantities.current;
//       return prev < maxQty ? prev + 1 : prev;
//     });
//   };

//   const handleQtyDecrease = () => {
//     setQty((prev) => (prev > 1 ? prev - 1 : prev));
//   };

//   if (isLoading) {
//     return <Loading className="h-[93vh]" />;
//   }

//   const handleSelectSize = (size: string) => {
//     setSelectedSize(size);
//     if (product) {
//       const sizeQuantities = product[`${size.toLowerCase()}SizeStock`];
//       availableQuantities.current = sizeQuantities;
//       setQty(sizeQuantities > 0 ? 1 : 0);
//     }
//   };

//   const handleAddToCart = (tShirt: ITShirt) => {
//     if (!selectedSize) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Please select a size first",
//       });
//       return;
//     }

//     dispatch(
//       addProductToCart({
//         ...tShirt,
//         orderSize: selectedSize,
//         orderQty: qty,
//       })
//     );
//     toast({
//       title: "Success",
//       description: "The product was added to your cart.",
//     });
//   };

//   const handleBuyNow = (product: ITShirt) => {
//     if (!selectedSize) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Please select a size first",
//       });
//       return;
//     }

//     setLoading(true);
//     const queryString = `?productId=${product.id}&quantity=${qty}&size=${selectedSize}`;
//     router.push(`/checkout${queryString}`);
//     setLoading(false);
//   };

//   return (
//     <MaxWidth>
//       <div className="mt-[90px]">
//         <div>
//           <SingleProductPageBreadcrumb name={product?.name} />
//           <div className="flex md:flex-row flex-col gap-5 relative">
//             <div className="relative lg:h-[450px] lg:w-[450px] md:w-[350px] flex-2 flex justify-center">
//               {product.images && (
//                 <DetailsPageImageSlider urls={product.images} />
//               )}
//             </div>

//             <div className="flex-1">
//               <h2 className="md:text-3xl text-2xl font-semibold ">
//                 {product.name}
//               </h2>
//               {product && (
//                 <Money prices={product.prices} className="md:mt-6 mt-3" />
//               )}

//               <div className="mt-3">
//                 <p className="font-semibold">Select Your Size:</p>
//                 <div className="flex gap-1 mt-3">
//                   {product.sizes &&
//                     product.sizes.map((size: string, i: number) => (
//                       <Button
//                         key={i}
//                         className="uppercase mr-1 px-6"
//                         variant={
//                           selectedSize === size ? "default" : "secondary"
//                         }
//                         onClick={() => handleSelectSize(size)}
//                       >
//                         {size}
//                       </Button>
//                     ))}
//                 </div>
//               </div>

//               <div className="flex gap-3 items-center mt-3">
//                 <p className="font-semibold">Quantity:</p>
//                 <div className="flex gap-2 items-center">
//                   <Button variant="outline" onClick={handleQtyDecrease}>
//                     -
//                   </Button>
//                   <span>{qty}</span>
//                   <Button variant="outline" onClick={handleQtyIncrease}>
//                     +
//                   </Button>
//                 </div>
//               </div>

//               <Separator className="w-full bg-primary h-[2px] my-8" />

//               <div className="lg:w-[60%] flex flex-col gap-2">
//                 <Button onClick={() => handleAddToCart(product)}>
//                   Add To Cart
//                 </Button>
//                 <Button onClick={() => handleBuyNow(product)}>
//                   {loading ? (
//                     <TbLoader className="text-2xl animate-spin mx-auto" />
//                   ) : (
//                     "Buy Now"
//                   )}
//                 </Button>
//               </div>

//               <div className="mt-6 text-lg flex gap-2 items-center">
//                 <IoCheckmarkCircleOutline className="text-3xl text-emerald-500" />
//                 <p>Best Quality</p>
//               </div>
//               <div className="text-lg flex gap-2 items-center">
//                 <IoCheckmarkCircleOutline className="text-3xl text-emerald-500" />
//                 <p>100% Money Back Guarantee</p>
//               </div>
//               <div className="text-lg flex gap-2 items-center">
//                 <IoCheckmarkCircleOutline className="text-3xl text-emerald-500" />
//                 <p>Delivery On Time</p>
//               </div>
//               <div className="text-lg flex gap-2 items-center">
//                 <PiDotDuotone className="text-3xl text-emerald-500" />
//                 <p>Next day delivery, if you order before 3pm</p>
//               </div>
//             </div>
//           </div>
//           <ReviewAndInfoTab />
//         </div>
//       </div>
//     </MaxWidth>
//   );
// };

// export default ProductDetailsPage;
