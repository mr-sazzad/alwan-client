import React from "react";
import { IOrderItem } from "../../types";
import ImageSlider from "../cards/image-slider";
interface IProfileOnTheWayOrderItemProps {
  items: IOrderItem[];
}

const ProfileOnTheWayOrderItem: React.FC<IProfileOnTheWayOrderItemProps> = ({
  items,
}) => {
  return (
    <>
      {items?.map((item) => (
        <div key={item?.id} className="flex gap-2 relative">
          {item.itemStatus &&
            item.itemStatus.toLocaleLowerCase() === "processing" && (
              <div className="flex justify-between gap-4 items-center w-full mb-2">
                <div className="h-[100px] w-[100px]">
                  {item.product && (
                    <ImageSlider urls={item?.product.imageUrls} isRounded />
                  )}
                </div>

                <div className="flex flex-col gap-2 items-start h-full">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium capitalize">
                      {item.product && item?.product.name}
                    </p>
                  </div>
                  {item.product &&
                    item.product.sizeVariants.map(
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
              </div>
            )}
        </div>
      ))}
    </>
  );
};

export default ProfileOnTheWayOrderItem;
