import { carouselImages } from "@/static/slide-images";
import Carousel from "../carousel";
import ParentCategories from "../categories/parent-categories";
import Identity, {
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "../identity/identity";
import MaxWidth from "../max-width";
import Adverticement from "../static/adverticement";
import WhatWeOffer from "../static/what-we-offer";
import TextSection from "../text-section/text-section";

const Home = () => {
  return (
    <div>
      <Carousel images={carouselImages} />
      <TextSection />
      <MaxWidth>
        <div className="mb-5">
          <ParentCategories />
        </div>
        <div className="flex justify-center">
          <Adverticement />
        </div>
        <div className="flex md:flex-row flex-col gap-5 rounded bg-gray-50 md:items-center mt-8">
          <Identity className="text-white">
            <GlowingStarsTitle>Alwan</GlowingStarsTitle>
            <GlowingStarsDescription>
              An ideal lifistyle brand of bangladesh
            </GlowingStarsDescription>
          </Identity>
          <WhatWeOffer />
        </div>
      </MaxWidth>
    </div>
  );
};

export default Home;
