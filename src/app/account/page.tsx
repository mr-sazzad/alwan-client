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
    <div className="flex justify-center items-center w-full h-[70%]">
      <div className="flex justify-center flex-col gap-2 items-center">
        <h2 className="text-xl font-semibold">Image</h2>
        <p className="text-sm text-muted-foreground">
          Please Select A Section First
        </p>
      </div>
    </div>
  );
};

export default Account;
