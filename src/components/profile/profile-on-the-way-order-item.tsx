import { IOrderItemResponse } from "@/types";
import ImageSlider from "../cards/image-slider";

interface IProfileOnTheWayOrderItemProps {
  items: IOrderItemResponse[];
}

const ProfileOnTheWayOrderItem: React.FC<IProfileOnTheWayOrderItemProps> = ({
  items,
}) => {
  return (
    <>
      {items?.map((item: IOrderItemResponse) => (
        <div key={item.id} className="flex gap-2 relative">
          {item.itemStatus === "onTheWay" && (
            <div className="flex justify-start gap-8 items-center w-full mb-2">
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
              <div className="absolute right-0 top-0 px-3 py-1 border rounded-3xl border-yellow-200 bg-yellow-500/10 z-50 text-xs">
                {item.itemStatus}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ProfileOnTheWayOrderItem;
