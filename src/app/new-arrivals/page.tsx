import { Metadata } from "next";
import React from "react";
import NewArrivalClient from "../../components/new-arrivals/new-arrival-client";

export const metadata: Metadata = {
  title: "New Arrivals | Alwan",
  description:
    "Discover our latest and most exciting new arrival products at Alwan",
};

export default function NewArrival() {
  return <NewArrivalClient />;
}
