import { IOrderItemResponse } from "@/types";
import ImageSlider from "../cards/image-slider";
import { Button } from "../ui/button";

import { useState } from "react";
import ProductReturnDialog from "../modals/product-return-dialog";

import { FcSms } from "react-icons/fc";
import { TbExchange } from "react-icons/tb";

interface IProfileOnDeliveredOrderItemProps {
  items: IOrderItemResponse[];
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
      {items?.map((item: IOrderItemResponse) => (
        <div key={item.id} className="flex gap-2 relative">
          {item.itemStatus === "delivered" && (
            <div className="flex justify-between gap-5 items-center w-full mb-2">
              <div className="h-[100px] w-[100px]">
                <ImageSlider urls={item.product.images} isRounded />
              </div>
              <div className="flex flex-col gap-2 items-start h-full">
                <div>
                  {item.product.name.length > 20 ? (
                    <p>{item.product.name.slice(0, 17) + "..."}</p>
                  ) : (
                    <p>{item.product.name}</p>
                  )}
                </div>
                {item.product.prices.length > 1 ? (
                  <div className="flex gap-2 items-end">
                    <p className="text-muted-foreground">
                      TK. {item.product.prices[1]}
                    </p>
                    <p className="text-muted-foreground text-sm line-through">
                      TK. {item.product.prices[0]}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    TK. {item.product.prices[0]}
                  </p>
                )}
                <p className="text-muted-foreground">Size: {item.size}</p>
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
      <ProductReturnDialog
        open={returnDialogOpen}
        setOpen={setReturnDialogOpen}
      />
    </div>
  );
};

export default ProfileOnDeliveredOrderItem;
