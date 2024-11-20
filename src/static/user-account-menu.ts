"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Box, Home, Settings, UserRound } from "lucide-react";

export const useUserAccountMenu = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        id: 1,
        title: "Profile",
        href: "/account/profile",
        icon: UserRound,
        active: pathname.startsWith("/account/profile"),
      },
      {
        id: 2,
        title: "Address",
        href: "/account/address",
        icon: Home,
        active: pathname.startsWith("/account/address"),
      },
      {
        id: 3,
        title: "Orders",
        href: "/account/orders",
        icon: Box,
        active: pathname.startsWith("/account/orders"),
      },
      {
        id: 4,
        title: "Settings",
        href: "/account/settings",
        icon: Settings,
        active: pathname.startsWith("/account/settings"),
      },
    ],
    [pathname]
  );

  return routes;
};
