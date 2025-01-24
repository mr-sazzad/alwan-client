import { Check, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent } from "../../components/ui/drawer";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface IProductFeaturesProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: any;
}

export default function ProductFeatures({
  open,
  setOpen,
  product,
}: IProductFeaturesProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const getPriceRange = (sizeVariants: any[]) => {
    const prices = sizeVariants.map((variant) => variant.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return minPrice === maxPrice
      ? `TK. ${minPrice}`
      : `TK. ${minPrice} - ${maxPrice}`;
  };

  const Content = () => (
    <div className="flex flex-col h-full py-4">
      <div className="flex items-start gap-6 mb-6">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          width={100}
          height={100}
          className="rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-grow">
          <div>
            <div className="flex items-center gap-8">
              {product?.isNewArrival && (
                <span className="text-sm font-medium text-[#D33918]">
                  New Arrival
                </span>
              )}
              <span className="text-sm font-medium text-[#D33918]">
                {product?.availabilityTag}
              </span>
            </div>
            <h2 className="text-xl font-medium text-primary">{product.name}</h2>
            <p className="text-xl font-medium mt-1">
              {getPriceRange(product?.sizeVariants)}
            </p>
          </div>
          <p className="text-sm  mt-2">SKU: {product?.sku}</p>
        </div>
      </div>

      <div className="overflow-y-auto hide-scrollbar">
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className=" leading-relaxed">{product?.description}</p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Features</h3>
            <ul className="grid grid-cols-1 gap-2">
              {product?.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-1">
                  <Check size={16} className=" flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Product Details</h3>
            <div className="bg-secondary rounded-lg p-4">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span>Category:</span>
                <span className="font-medium">{product?.category.name}</span>
                <span>Stock Status:</span>
                <span className="font-medium">
                  {product?.stockStatus.charAt(0).toUpperCase() +
                    product?.stockStatus.slice(1).toLowerCase()}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl p-6 overflow-hidden">
          <Content />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="px-2">
        <Content />
        <DrawerClose asChild>
          <Button size="icon" className="rounded-full absolute right-4 top-4">
            <X size={20} />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
