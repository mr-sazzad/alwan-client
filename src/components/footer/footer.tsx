"use client";
import Link from "next/link";
import React, { useState } from "react";
import { PiGlobeHemisphereEast } from "react-icons/pi";
import FeedbackDialog from "../modals/feedback-dialog";

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <footer className="w-full mt-8 py-16 bg-gray-50 dark:bg-[#020817] border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-lg uppercase">Resources</h3>
              <div className="flex flex-col gap-2 text-sm text-primary">
                <button
                  className="text-primary text-start"
                  onClick={() => setOpen(true)}
                >
                  Site Feedback
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-lg uppercase">Help</h3>
              <div className="flex flex-col gap-2 text-sm text-primary">
                <Link href="/returns" className="text-primary">
                  Returns
                </Link>
                <Link href="/order-status" className="text-primary">
                  Order Status
                </Link>
                <Link href="/shipping" className="text-primary">
                  Shipping and Delivery
                </Link>
                <Link href="/contact" className="text-primary">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-lg uppercase">Company</h3>
              <div className="flex flex-col gap-2 text-sm text-primary">
                <Link href="/about" className="text-primary">
                  About Alwan
                </Link>
                <Link href="/sustainability" className="text-primary">
                  Sustainability
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-lg uppercase">
                Terms & Conditions
              </h3>
              <div className="flex flex-col gap-2 text-sm text-primary">
                <Link href="/terms" className="text-primary">
                  Terms & conditions
                </Link>
                <Link href="/faqs" className="text-primary">
                  FAQs
                </Link>
                <Link href="/terms-of-use" className="text-primary">
                  Terms of use
                </Link>
                <Link href="/privacy-policy" className="text-primary">
                  Privacy policy
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-lg uppercase">Location</h3>
              <div className="flex items-center gap-2 text-primary">
                <PiGlobeHemisphereEast className="text-xl" />
                <span>Bangladesh</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-primary">
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
