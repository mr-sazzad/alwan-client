import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Image from "next/image"
import { IReadSizeVariant } from "@/types"
import DotIcon from "../utils/half-icon"
import { X } from "lucide-react"

interface IProductFeaturesProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    product: any
}

const ProductFeatures:React.FC<IProductFeaturesProps> = ({open, setOpen, product}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[725px] p-10">
            <div className="flex gap-2">
                <Image src={product.imageUrls[0]} alt="product-image" height={60} width={60}/>
                <div className="flex flex-col justify-center">
                    <h2 className="font-medium">{product.name}</h2>
                    <p className="font-medium">TK. {product.sizeVariants[0].price}</p>
                </div>
            </div>
            <div className="mt-4">
                <div>
                    {product.description.map((description: string, i: number) => (<p key={i}> {description}</p>))}
                </div>
            </div>
            <div className="mt-1">
                <p className="text-xl font-normal">Features</p>
                <div>
                    {product.features.map((feature: string, i: number) => (<div key={i} className="flex items-center"><p>{feature}</p> </div>))}
                </div>
            </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent >
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="flex gap-2">
            <Image src={product.imageUrls[0]} alt="product-image" height={60} width={60} />
            <div className="flex flex-col justify-center">
              <p>{product.name}</p>
              <p className="font-medium">TK. {product.sizeVariants[0].price}</p>
            </div>
          </div>
          <p className="mt-4">{product.description}</p>

          <div className="mt-5">
            <h2 className="text-xl mb-2">Features</h2>
            {product.features.map((feature: string, i: number) => (<div key={i}>{feature}</div>))}
          </div>
        </div>
        <DrawerFooter className="absolute right-5 top-5">
          <DrawerClose>
          <Button variant="secondary" className="w-full rounded-full px-[10px]"><X size={20} /></Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}


export default ProductFeatures;