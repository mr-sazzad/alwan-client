"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

// react icons
import { HiOutlineHome } from "react-icons/hi2";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";

export const useUserAccountMenu = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        id: 1,
        title: "Address",
        href: "/account/address",
        icon: HiOutlineHome,
        active: pathname.startsWith("/account/address"),
      },
      {
        id: 2,
        title: "Orders",
        href: "/account/orders",
        icon: MdOutlineStarBorderPurple500,
        active: pathname.startsWith("/account/orders"),
      },
    ],
    [pathname]
  );

  return routes;
};
