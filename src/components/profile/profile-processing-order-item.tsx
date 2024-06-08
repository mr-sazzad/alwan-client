import { IOrderItemResponse } from "@/types";
import ImageSlider from "../cards/image-slider";
import { Button } from "../ui/button";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import AlertDialogComp from "../alert-dialog/alert-dialog";

interface IProfileProcessingOrderItemProps {
  items: IOrderItemResponse[];
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
      {items?.map((item: IOrderItemResponse) => (
        <div key={item.id} className="flex gap-2 relative">
          {item.itemStatus === "processing" && (
            <div className="flex justify-between items-center w-full">
              <div className="h-[110px] w-[110px]">
                <ImageSlider urls={item.product.images} />
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
                <p className="text-muted-foreground">
                  Size: {item.size.toLocaleUpperCase()}
                </p>
              </div>
              <div className="absolute right-0 top-0 px-3 py-1 border rounded-3xl border-green-200 bg-green-500/10 capitalize text-xs">
                {item.itemStatus}
              </div>
              <div className="flex h-full items-end mb-5">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleCancelModal}
                >
                  <div className="flex items-center gap-2">
                    <IoClose size={16} />{" "}
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
        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
      />
    </div>
  );
};

export default ProfileProcessingOrderItem;
