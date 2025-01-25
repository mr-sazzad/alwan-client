"use client";

import { cn } from "@/lib/utils";
import {
  CreditCard,
  Gift,
  HeadphonesIcon,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  ThumbsUp,
  Truck,
} from "lucide-react";
import { Marquee } from "../ui/marquee";

type IItem = {
  id: number;
  icon: React.ElementType;
  label: string;
  description: string;
};

const offerItems = [
  {
    id: 1,
    icon: Rocket,
    label: "Faster Delivery",
    description: "Lightning-quick shipping",
  },
  {
    id: 2,
    icon: CreditCard,
    label: "Secure Payments",
    description: "Safe & flexible options",
  },
  {
    id: 3,
    icon: RefreshCcw,
    label: "Easy Returns",
    description: "Hassle-free process",
  },
  {
    id: 4,
    icon: HeadphonesIcon,
    label: "24/7 Support",
    description: "Always here to help",
  },
  {
    id: 5,
    icon: ShieldCheck,
    label: "Quality Guarantee",
    description: "Top-notch products",
  },
  {
    id: 6,
    icon: Gift,
    label: "Loyalty Rewards",
    description: "Earn points on purchases",
  },
  {
    id: 7,
    icon: Truck,
    label: "Free Shipping",
    description: "Terms & conditions apply",
  },
  {
    id: 8,
    icon: ThumbsUp,
    label: "Customer Satisfaction",
    description: "Your happiness, our priority",
  },
];

const firstRow = offerItems.slice(0, offerItems.length / 2);
const secondRow = offerItems.slice(offerItems.length / 2);

const OfferCard = (item: IItem) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-4 p-4">
        <div className="p-3.5 rounded-full border">
          <item.icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium">{item.label}</p>
          <blockquote className="mt-2 text-sm">{item.description}</blockquote>
        </div>
      </div>
    </figure>
  );
};

export default function MarqueeOffers() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((item) => (
          <OfferCard key={item.id} {...item} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((item) => (
          <OfferCard key={item.id} {...item} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
