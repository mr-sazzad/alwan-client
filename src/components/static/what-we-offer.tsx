import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, HeadphonesIcon, RefreshCcw, Rocket } from "lucide-react";

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
];

export default function WhatWeOffer() {
  return (
    <section className="w-full py-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
          What We Offer
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {offerItems.map((item) => (
            <div key={item.id} className="w-full">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left space-y-3 lg:space-y-0 lg:space-x-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-medium text-primary">
                        {item.label}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">
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
