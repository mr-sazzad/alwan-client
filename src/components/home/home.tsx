import { carouselImages } from "@/static/slide-images";
import Carousel from "../carousel";
import MaxWidth from "../max-width";
import NewArrivals from "../new-arrivals/new-arrivals";
import WhatWeOffer from "../static/what-we-offer";
import WhoWeAre from "../static/who-we-are";

const Home = () => {
  return (
    <div>
      <Carousel images={carouselImages} />
      <MaxWidth>
        <div>
          <NewArrivals />
        </div>
        <div>
          <WhoWeAre />
          <WhatWeOffer />
        </div>
      </MaxWidth>
    </div>
  );
};

export default Home;
