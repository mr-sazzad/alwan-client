import NewArrivalClient from "@/components/new-arrivals/new-arrival-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Arrivals | Alwan",
  description:
    "Discover our latest and most exciting new arrival products at Alwan",
};

export default function NewArrival() {
  return <NewArrivalClient />;
}
