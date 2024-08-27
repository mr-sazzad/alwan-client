import Image from "next/image";
import CODIcon from "../../images/cod.png";
import { Separator } from "../ui/separator";

const DeliveryOptions = () => {
  return (
    <div className="flex flex-col mt-5">
      <h1 className="font-medium text-lg uppercase">Delivery Options</h1>
      <Separator className="w-[170px]" />
      <div className="flex items-center gap-2 p-2">
        <Image src={CODIcon} alt="COD icon" width={22} height={22} />
        <p className="font-medium">Cash on Delivery</p>
      </div>
    </div>
  );
};

export default DeliveryOptions;
