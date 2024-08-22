import Image from "next/image";
import Link from "next/link";

import footerLogo from "../../images/footer-logo.png";

const Footer = () => {
  return (
    <div className="w-full mt-8 py-16 border-t">
      <div className="flex sm:flex-row flex-col justify-around gap-3 w-full md:px-10 px-5 mb-2">
        <div className="flex-1 flex flex-col gap-5 md:text-start text-center">
          <Image
            src={footerLogo}
            alt="footer-logo"
            width={1517}
            height={292}
            className="flex justify-start"
          />
          <p>+880 9606999695</p>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-xl font-semibold uppercase md:text-start text-center">
            Information
          </h3>
          <div className="flex flex-col gap-1">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/faqs">FAQs</Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-xl font-semibold uppercase md:text-start text-center">
            Contract Info
          </h3>
          <div className="flex flex-col gap-1">
            <p>Gopalganj Sadar, Dhaka, Bangladesh</p>
            <p>alwan.bd@gmail.com</p>
            <div className="flex gap-2">
              <p>01613980323</p>
              <p className="text-gray-500">|</p>
              <p>01862911593</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center py-1">All rights reserved @Alwan clothing</p>
    </div>
  );
};

export default Footer;
