"use client";

import { Card, CardContent } from "@/components/ui/card";
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
import { useState } from "react";

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
    description: "On orders over $50",
  },
  {
    id: 8,
    icon: ThumbsUp,
    label: "Customer Satisfaction",
    description: "Your happiness, our priority",
  },
];

export default function MarqueeOffers() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="w-full overflow-hidden py-12 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          What We Offer
        </h2>
        <div
          className={`flex gap-6 ${isPaused ? "" : "animate-marquee"}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...offerItems, ...offerItems].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[250px]"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-primary">
                        {item.label}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
