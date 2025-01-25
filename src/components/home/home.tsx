"use client";
import Banner from "../banner";
// import HomeCategories from "../categories/home-categories";
// import MaxWidth from "../max-width";
// import NewArrivalProductsSlider from "../new-arrivals/new-arrival-products-slider";
// import NewArrivals from "../new-arrivals/new-arrivals";
// import WhatWeOffer from "../static/what-we-offer";
import TextSection from "../text-section/text-section";

const Home = () => {
  return (
    <div>
      <Banner />
      <TextSection />
      {/* <MaxWidth>
        <div className="mb-5">
          <HomeCategories />
        </div>
        <div className="flex md:flex-row flex-col gap-5 rounded md:items-center mt-8">
          <WhatWeOffer />
        </div>
        <div>
          <NewArrivals />
        </div>
        <NewArrivalProductsSlider />
      </MaxWidth> */}
    </div>
  );
};

export default Home;
