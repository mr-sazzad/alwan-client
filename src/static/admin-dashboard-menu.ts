import {
  Angry,
  Bug,
  Diameter,
  FolderOpen,
  GalleryHorizontal,
  Gem,
  Gift,
  HandCoins,
  LayoutDashboard,
  MessagesSquare,
  Package,
  Paintbrush,
  PenTool,
  Puzzle,
  TreePalm,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useAdminDashboardMenu = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        id: 1,
        title: "Dashboard",
        href: "/admins/dashboard/application-dashboard",
        icon: LayoutDashboard,
        active: pathname.includes("/admins/dashboard/application-dashboard"),
      },
      {
        id: 2,
        title: "Carousel",
        href: "/admins/dashboard/carousel",
        icon: GalleryHorizontal,
        active: pathname.includes("/admins/dashboard/carousel"),
      },
      {
        id: 3,
        title: "Category",
        href: "/admins/dashboard/category",
        icon: FolderOpen,
        active: pathname.includes("/admins/dashboard/category"),
      },
      {
        id: 4,
        title: "Reviews",
        href: "/admins/dashboard/reviews",
        icon: MessagesSquare,
        active: pathname.includes("/admins/dashboard/reviews"),
      },
      {
        id: 5,
        title: "Color",
        href: "/admins/dashboard/colors",
        icon: Paintbrush,
        active: pathname.includes("/admins/dashboard/colors"),
      },
      {
        id: 6,
        title: "Coupon",
        href: "/admins/dashboard/coupons",
        icon: Puzzle,
        active: pathname.includes("/admins/dashboard/coupons"),
      },
      {
        id: 7,
        title: "Expenses",
        href: "/admins/dashboard/expenses",
        icon: HandCoins,
        active: pathname.includes("/admins/dashboard/expenses"),
      },

      {
        id: 8,
        title: "Feedbacks",
        href: "/admins/dashboard/feedbacks",
        icon: Bug,
        active: pathname.includes("/admins/dashboard/feedbacks"),
      },
      {
        id: 9,
        title: "Orders",
        href: "/admins/dashboard/orders",
        icon: Package,
        active: pathname.includes("/admins/dashboard/orders"),
      },
      {
        id: 10,
        title: "Product Type",
        href: "/admins/dashboard/product-types",
        icon: PenTool,
        active: pathname.includes("/admins/dashboard/product-types"),
      },
      {
        id: 11,
        title: "Products",
        href: "/admins/dashboard/products",
        icon: Gift,
        active: pathname.includes("/admins/dashboard/products"),
      },

      {
        id: 12,
        title: "Returns",
        href: "/admins/dashboard/returns",
        icon: Angry,
        active: pathname.includes("/admins/dashboard/returns"),
      },
      {
        id: 13,
        title: "Revinew",
        href: "/admins/dashboard/revinews",
        icon: Gem,
        active: pathname.includes("/admins/dashboard/revinews"),
      },
      {
        id: 14,
        title: "Product Size",
        href: "/admins/dashboard/sizes",
        icon: Diameter,
        active: pathname.includes("/admins/dashboard/sizes"),
      },
      {
        id: 15,
        title: "Home Text",
        href: "/admins/dashboard/home-text",
        icon: TreePalm,
        active: pathname.includes("/admins/dashboard/home-text"),
      },
    ],
    [pathname]
  );

  return routes;
};
