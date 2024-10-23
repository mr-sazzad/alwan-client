"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Package,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const orderStatuses = [
  {
    name: "All Orders",
    icon: Package,
    color: "bg-blue-500",
    path: "/account/orders",
  },
  {
    name: "Processing",
    icon: RotateCcw,
    color: "bg-yellow-500",
    path: "/account/orders/processing",
  },
  {
    name: "In Transit",
    icon: Truck,
    color: "bg-purple-500",
    path: "/account/orders/in-transit",
  },
  {
    name: "Delivered",
    icon: CheckCircle,
    color: "bg-green-500",
    path: "/account/orders/delivered",
  },
  {
    name: "Cancelled",
    icon: XCircle,
    color: "bg-red-500",
    path: "/account/orders/cancelled",
  },
  {
    name: "Request Return",
    icon: ArrowLeftRight,
    color: "bg-orange-500",
    path: "/account/orders/request-to-return",
  },
  {
    name: "Returned",
    icon: Package,
    color: "bg-gray-500",
    path: "/account/orders/returned",
  },
];

export default function Component({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState("All Orders");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const currentStatus = orderStatuses.find(
      (status) => status.path === pathname
    );
    if (currentStatus) {
      setActiveFilter(currentStatus.name);
    }
  }, [pathname]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-medium text-primary">Your Orders</h1>
      </header>

      <Card className="relative overflow-hidden">
        <CardContent className="p-1 sm:p-2">
          <div className="flex items-center">
            {showLeftButton && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 z-10 h-full rounded-none md:hidden"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <div
              ref={scrollContainerRef}
              className="flex space-x-2 p-2 overflow-x-auto scrollbar-hide md:justify-between w-full"
              onScroll={checkScroll}
            >
              {orderStatuses.map((status) => (
                <motion.div
                  key={status.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 md:flex-1"
                >
                  <Link href={status.path} className="w-full">
                    <Button
                      variant="outline"
                      className={`flex flex-col items-center justify-center h-24 sm:w-24 md:w-full rounded-lg transition-all w-full ${
                        activeFilter === status.name
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-primary/5 hover:border-primary"
                      }`}
                    >
                      <div className={`p-2 rounded-full ${status.color}`}>
                        <status.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="mt-2 text-[12px] sm:text-sm font-medium text-center line-clamp-2">
                        {status.name}
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
            {showRightButton && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 z-10 h-full rounded-none md:hidden"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <main>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              {activeFilter === "All Orders"
                ? "All Orders"
                : `${activeFilter} Orders`}
            </h2>
            {children}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
