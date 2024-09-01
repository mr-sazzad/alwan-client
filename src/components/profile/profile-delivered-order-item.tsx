import { IOrderItem } from "@/types";
import ImageSlider from "../cards/image-slider";
import { Button } from "../ui/button";

import { useState } from "react";
import ProductReturnDialog from "../modals/product-return-dialog";

import { FcSms } from "react-icons/fc";
import { TbExchange } from "react-icons/tb";

interface IProfileOnDeliveredOrderItemProps {
  items: IOrderItem[];
}

const ProfileOnDeliveredOrderItem: React.FC<
  IProfileOnDeliveredOrderItemProps
> = ({ items }) => {
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);

  const handleReturnDialog = () => {
    setReturnDialogOpen(true);
  };

  return (
    <div>
      {items?.map((item: IOrderItem) => (
        <div key={item.id} className="flex gap-2 relative">
          {items?.map((item) => (
            <div key={item?.id} className="flex gap-2 relative">
              {item.itemStatus.toLocaleLowerCase() === "delivered" && (
                <div className="flex justify-between gap-4 items-center w-full mb-2">
                  <div className="h-[100px] w-[100px]">
                    <ImageSlider urls={item?.product.imageUrls} isRounded />
                  </div>

                  <div className="flex flex-col gap-2 items-start h-full">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium capitalize">
                        {item?.product.name}
                      </p>
                    </div>
                    {item.product.sizeVariants.map(
                      (sizeVariant) =>
                        sizeVariant?.sizeId === item?.sizeId && (
                          <div
                            className="flex flex-col gap-1"
                            key={sizeVariant?.id}
                          >
                            <p className="text-sm text-muted-foreground font-medium">
                              {sizeVariant?.price}
                            </p>
                            <p className="text-sm text-muted-foreground font-medium">
                              {sizeVariant?.size.name}
                            </p>
                          </div>
                        )
                    )}
                  </div>

                  <div className="flex sm:flex-row flex-col gap-2 items-end mt-5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReturnDialog}
                    >
                      <div className="flex items-center gap-2">
                        <FcSms size={18} />
                        Review
                      </div>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleReturnDialog}
                    >
                      <div className="flex items-center gap-2">
                        <TbExchange size={18} />
                        Return
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <ProductReturnDialog
        open={returnDialogOpen}
        setOpen={setReturnDialogOpen}
      />
    </div>
  );
};

export default ProfileOnDeliveredOrderItem;
