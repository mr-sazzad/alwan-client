"use client";

import Banner from "../banner";
import HomeCategories from "../categories/home-categories";
import MaxWidth from "../max-width";
import NewArrivals from "../new-arrivals/new-arrivals";
import WhatWeOffer from "../static/what-we-offer";

const Home = () => {
  return (
    <div>
      <Banner />
      {/* <TextSection /> */}
      <MaxWidth>
        <div className="mb-5">
          <HomeCategories />
        </div>
        {/* <div className="flex justify-center">
          <Adverticement />
        </div> */}
        <div className="flex md:flex-row flex-col gap-5 rounded bg-gray-50 md:items-center mt-8">
          <WhatWeOffer />
        </div>
        <div>
          <NewArrivals />
        </div>
      </MaxWidth>
    </div>
  );
};

export default Home;
