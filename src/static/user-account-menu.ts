"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

// react icons
import { RxDashboard } from "react-icons/rx";
import { TbHome } from "react-icons/tb";

export const useUserAccountMenu = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        id: 1,
        title: "My Account",
        href: "/account/profile",
        icon: TbHome,
        active: pathname === "/account/profile",
      },
      {
        id: 2,
        title: "Address",
        href: "/account/profile/address",
        icon: RxDashboard,
        active: pathname.startsWith("/account/profile/address"),
      },
    ],
    [pathname]
  );

  return routes;
};
