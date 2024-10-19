import Home from "@/components/home/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Alwan",
  description: "this is home page",
};

export default function Page() {
  return (
    <div>
      <Home />
    </div>
  );
}
