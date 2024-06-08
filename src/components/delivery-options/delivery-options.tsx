import { Separator } from "../ui/separator";

import { RiExchange2Line } from "react-icons/ri";

const DeliveryOptions = () => {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <h1 className="font-medium text-lg mb-3 uppercase">Delivery Options</h1>
      <Separator />
      <div className="flex items-center gap-2 p-2">
        <RiExchange2Line />
        <p className="text-lg font-medium">Cash on Delivery</p>
      </div>
    </div>
  );
};

export default DeliveryOptions;
