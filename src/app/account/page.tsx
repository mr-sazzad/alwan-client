import MaxWidth from "@/components/max-width";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Alwan",
    template: "%s | account",
  },
  description: "Alwan account page",
};

const Account = () => {
  return (
    <MaxWidth>
      <div className="mt-[90px]">
        <div>Hello from account page</div>
      </div>
    </MaxWidth>
  );
};

export default Account;
