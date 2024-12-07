import { ISizeVariant } from "@/types";
import ImageSlider from "../cards/image-slider";
import { Button } from "../ui/button";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import AlertDialogComp from "../alert-dialog/alert-dialog";

interface IProfileProcessingOrderItemProps {
  items: any[];
}

const ProfileProcessingOrderItem: React.FC<
  IProfileProcessingOrderItemProps
> = ({ items }) => {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const handleCancelModal = () => {
    setAlertDialogOpen(true);
  };

  const handleOrderCancel = () => {
    // order cancel handler goes here
  };

  return (
    <div>
      {items?.map((item) => (
        <div key={item?.id} className="flex gap-2 relative">
          {item.itemStatus.toLocaleLowerCase() === "processing" && (
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
                  (sizeVariant: ISizeVariant) =>
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

              <div className="flex h-full items-end mb-5">
                <Button size="sm" onClick={handleCancelModal}>
                  <div className="flex items-center gap-2">
                    <IoClose size={16} />
                    <span className="text-sm">Cancel</span>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <AlertDialogComp
        title="Cancel Order"
        description="Would you like to cancel your order? If yes, please click the 'Yes' button or press 'Cancel' to keep your order."
        buttonText="Yes, Cancel"
        open={alertDialogOpen}
        setOpen={setAlertDialogOpen}
        handler={handleOrderCancel}
      />
    </div>
  );
};

export default ProfileProcessingOrderItem;
