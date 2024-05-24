import DeliveryTruck from "@/images/delivery-truck";
import OnlineSupport from "@/images/online-support";
import PackageDelivery from "@/images/package-delivery";
import ReturnProduct from "@/images/product-return";

const WhatWeOffer = () => {
  return (
    <div className="w-full p-5">
      <div className="flex flex-wrap justify-center gap-2">
        <div className="flex flex-col items-center border rounded border-dashed text-gray-700 p-3 md:w-[48%] sm:w-[48%] w-[48%] hover:bg-gray-100 hover:font-medium transition group border-gray-400 hover:border-gray-100">
          <DeliveryTruck className="group-hover:scale-75 transition-all duration-75" />
          <p>Faster Delivery</p>
        </div>
        <div className="flex flex-col items-center border rounded border-dashed text-gray-700 p-3 md:w-[48%] sm:w-[48%] w-[48%] hover:bg-gray-100 hover:font-medium transition group border-gray-400 hover:border-gray-100">
          <ReturnProduct className="group-hover:scale-75 transition-all duration-75" />
          <p>Easy Return</p>
        </div>
        <div className="flex flex-col items-center border rounded border-dashed text-gray-700 p-3 md:w-[48%] sm:w-[48%] w-[48%] hover:bg-gray-100 hover:font-medium transition group border-gray-400 hover:border-gray-100">
          <PackageDelivery className="group-hover:scale-75 transition-all duration-75" />
          <p>Cash On Delivery</p>
        </div>
        <div className="flex flex-col items-center border rounded border-dashed text-gray-700 p-3 md:w-[48%] sm:w-[48%] w-[48%] hover:bg-gray-100 hover:font-medium transition group border-gray-400 hover:border-gray-100">
          <OnlineSupport className="group-hover:scale-75 transition-all duration-75" />
          <p>Online Support 24/7</p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
