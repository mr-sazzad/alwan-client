import { Metadata } from "next";
import React from "react";
import Home from "../components/home/home";

export const metadata: Metadata = {
  title: "Home | Alwan",
  description: "this is home page",
};
// home page
export default function Page() {
  return (
    <div>
      <Home />
    </div>
  );
}
