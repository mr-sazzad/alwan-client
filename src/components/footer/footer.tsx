"use client";

import Link from "next/link";
import { useState } from "react";
import { PiGlobeHemisphereEast } from "react-icons/pi";
import FeedbackDialog from "../modals/feedback-dialog";

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <footer className="w-full mt-8 py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-lg uppercase">Resources</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <button
                  className="hover:text-gray-900 transition-colors text-start"
                  onClick={() => setOpen(true)}
                >
                  Site Feedback
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-lg uppercase">Help</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <Link
                  href="/returns"
                  className="hover:text-gray-900 transition-colors"
                >
                  Returns
                </Link>
                <Link
                  href="/order-status"
                  className="hover:text-gray-900 transition-colors"
                >
                  Order Status
                </Link>
                <Link
                  href="/shipping"
                  className="hover:text-gray-900 transition-colors"
                >
                  Shipping and Delivery
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-lg uppercase">Company</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <Link
                  href="/about"
                  className="hover:text-gray-900 transition-colors"
                >
                  About Alwan
                </Link>
                <Link
                  href="/sustainability"
                  className="hover:text-gray-900 transition-colors"
                >
                  Sustainability
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-lg uppercase">
                Terms & Conditions
              </h3>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <Link
                  href="/terms"
                  className="hover:text-gray-900 transition-colors"
                >
                  Terms & conditions
                </Link>
                <Link
                  href="/faqs"
                  className="hover:text-gray-900 transition-colors"
                >
                  FAQs
                </Link>
                <Link
                  href="/terms-of-use"
                  className="hover:text-gray-900 transition-colors"
                >
                  Terms of use
                </Link>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-900 transition-colors"
                >
                  Privacy policy
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-lg uppercase">Location</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <PiGlobeHemisphereEast className="text-xl" />
                <span>Bangladesh</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Alwan Ideal Lifestyle. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <FeedbackDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Footer;
