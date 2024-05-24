import Image from "next/image";
import banner from "../../images/banner.jpeg";

const Adverticement = () => {
  return (
    <div className="px-7">
      <Image
        src={banner}
        alt="banner-image"
        loading="lazy"
        quality={90}
        className="rounded"
      />
    </div>
  );
};

export default Adverticement;
