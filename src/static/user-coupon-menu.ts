import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { LuLayoutDashboard } from "react-icons/lu";

export const useUserCouponMenu = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        id: 1,
        title: "Active",
        href: "/account/coupons/active-coupons",
        icon: LuLayoutDashboard,
        active: pathname.includes("/account/coupons/active-coupons"),
      },
      {
        id: 2,
        title: "Used",
        href: "/account/coupons/used-coupons",
        icon: LuLayoutDashboard,
        active: pathname.includes("/account/coupons/used-coupons"),
      },
      {
        id: 3,
        title: "Expired",
        href: "/account/coupons/expired-coupons",
        icon: LuLayoutDashboard,
        active: pathname.includes("/account/coupons/expired-coupons"),
      },
    ],
    [pathname]
  );

  return routes;
};
