"use client";

import MaxWidth from "@/components/max-width";
import { useUserAccountMenu } from "@/static/user-account-menu";
import Link from "next/link";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const userRoutes = useUserAccountMenu();

  return (
    <MaxWidth className="mt-[90px]">
      <div className="w-full h-[15vh] bg-gradient-to-r from-green-200 to-green-300 rounded-md py-3 px-5 flex flex-row justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Hello</h2>
          <p className="text-sm text-muted-foreground">
            Welcome to your account
          </p>
        </div>
        <div className="mt-auto">
          <p className="text-muted-foreground text-xs">alwan ideal lifesyle</p>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col min-h-[50vh]">
        <div className="flex md:w-[170px] sm:w-[58px] sm:flex-col flex-row sm:justify-start sm:items-start justify-center items-center w-full sm:h-[73vh] sm:border-r gap-1 sm:pt-10 pt-10">
          {userRoutes.map((route) => (
            <Link
              key={route.id}
              href={route.href}
              className="flex flex-col items-center sm:mt-0 px-3 py-1 "
            >
              <div className="p-1 w-full flex sm:justify-start items-center justify-center gap-2">
                <div
                  className={`w-[3px] bg-black h-[18px] rounded-r-full sm:block hidden ${
                    route.active ? "" : "bg-transparent"
                  }`}
                />
                <route.icon
                  className={`${
                    route.active ? "" : "text-muted-foreground"
                  } md:text-base text-xl`}
                />
                <p className="text-xl font-medium md:flex hidden">
                  {route.title}
                </p>
              </div>

              <div
                className={`w-[45%] bg-black h-[3px] rounded-b-full ${
                  route.active ? "sm:hidden" : "bg-transparent"
                }`}
              />
            </Link>
          ))}
        </div>
        <div className="p-2 w-full sm:mt-0 mt-5">{children}</div>
      </div>
    </MaxWidth>
  );
};

export default AccountLayout;
