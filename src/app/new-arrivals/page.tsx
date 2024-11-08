import MaxWidth from "@/components/max-width";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Arrival | Alwan",
  description: "Browse our new arrival products",
};

const NewArrival = () => {
  return (
    <MaxWidth className="mt-[100px]">
      <div>Hello</div>
    </MaxWidth>
  );
};

export default NewArrival;
