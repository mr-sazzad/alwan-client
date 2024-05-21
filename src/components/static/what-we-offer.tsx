import React from "react";
import DeliveryTruck from "@/images/delivery-truck";
import ReturnProduct from "@/images/product-return";
import PackageDelivery from "@/images/package-delivery";
import OnlineSupport from "@/images/online-support";

const WhatWeOffer = () => {
  return (
    <div className="w-full px-10 mt-5">
      <div className="flex flex-wrap justify-center gap-5">
        <div className="flex flex-col items-center border rounded text-gray-700 p-3 md:w-1/5 sm:w-[30%] w-[42%] hover:bg-gray-100 hover:font-medium transition group">
          <DeliveryTruck className="group-hover:scale-75 transition-all duration-75" />
          <p>Faster Delivery</p>
        </div>
        <div className="flex flex-col items-center border rounded text-gray-700 p-3 md:w-1/5 sm:w-[30%] w-[42%] hover:bg-gray-100 hover:font-medium transition group">
          <ReturnProduct className="group-hover:scale-75 transition-all duration-75" />
          <p>Easy Return</p>
        </div>
        <div className="flex flex-col items-center border rounded text-gray-700 p-3 md:w-1/5 sm:w-[30%] w-[42%] hover:bg-gray-100 hover:font-medium transition group">
          <PackageDelivery className="group-hover:scale-75 transition-all duration-75" />
          <p>Cash On Delivery</p>
        </div>
        <div className="flex flex-col items-center border rounded text-gray-700 p-3 md:w-1/5 sm:w-[30%] w-[42%] hover:bg-gray-100 hover:font-medium transition group">
          <OnlineSupport className="group-hover:scale-75 transition-all duration-75" />
          <p>Online Support 24/7</p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
