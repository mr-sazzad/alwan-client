import Image from "next/image";
import MaxWidth from "../max-width";

import mainLogo from "../../images/logo-main.png";
import logo from "../../images/logo.png";

const WhoWeAre = () => {
  return (
    <MaxWidth>
      <div className="pt-2">
        <div className="mb-5">
          <div className="flex justify-center items-center sm:hidden">
            <Image src={logo} alt="logo" height={40} width={1517} />
          </div>
          <div className="justify-center items-center sm:flex hidden">
            <Image src={mainLogo} alt="logo" height={40} width={1517} />
          </div>
        </div>
        <p className="px-1 text-gray-700">
          <span className="text-2xl font-bold">A</span>lwan reflects
          Bangladesh&apos;s vibrant spirit, infusing each garment with passion
          and purpose. Committed to quality, creativity, and community, we
          create clothing that speaks to the heart. Embracing inclusivity and
          empowerment, we invite you to join us in expressing individuality and
          celebrating diversity. Together, let&apos;s spread the colorful
          essence of Alwan across the world, uniting souls through style and
          storytelling. Join us, as we weave dreams into fabric, and paint the
          world with the hues of Alwan.
        </p>
      </div>
    </MaxWidth>
  );
};

export default WhoWeAre;
