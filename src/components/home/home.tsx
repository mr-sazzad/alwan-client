import { carouselImages } from "@/static/slide-images";
import Carousel from "../carousel";
import MaxWidth from "../max-width";
import NewArrivals from "../new-arrivals/new-arrivals";
import Adverticement from "../static/adverticement";
import WhatWeOffer from "../static/what-we-offer";
import WhoWeAre from "../static/who-we-are";

const Home = () => {
  return (
    <div>
      <Carousel images={carouselImages} />
      <MaxWidth>
        <div className="mb-5">
          <NewArrivals />
        </div>
        {/* Adverticement */}
        <div className="flex justify-center">
          <Adverticement />
        </div>
        <div className="flex md:flex-row flex-col gap-5 rounded bg-gray-50 md:items-center mt-8">
          <WhoWeAre />
          <WhatWeOffer />
        </div>
      </MaxWidth>
    </div>
  );
};

export default Home;
