import {
  Angry,
  BarChart,
  Bug,
  Diameter,
  FolderOpen,
  GalleryHorizontal,
  Gem,
  Gift,
  HandCoins,
  MessagesSquare,
  Package,
  Paintbrush,
  PenTool,
  PieChart,
  Puzzle,
  Settings,
  TreePalm,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useAdminDashboardMenu = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      // Core Functionality
      {
        id: 1,
        title: "Dashboard",
        href: "/admins/dashboard/application-dashboard",
        icon: PieChart,
        active: pathname.includes("/admins/dashboard/application-dashboard"),
      },
      {
        id: 2,
        title: "Orders",
        href: "/admins/dashboard/orders",
        icon: Package,
        active: pathname.includes("/admins/dashboard/orders"),
      },
      {
        id: 3,
        title: "Products",
        href: "/admins/dashboard/products",
        icon: Gift,
        active: pathname.includes("/admins/dashboard/products"),
      },
      {
        id: 4,
        title: "Users",
        href: "/admins/dashboard/users",
        icon: Users,
        active: pathname.includes("/admins/dashboard/users"),
      },

      // Product Management
      {
        id: 5,
        title: "Product Type",
        href: "/admins/dashboard/product-types",
        icon: PenTool,
        active: pathname.includes("/admins/dashboard/product-types"),
      },
      {
        id: 6,
        title: "Category",
        href: "/admins/dashboard/category",
        icon: FolderOpen,
        active: pathname.includes("/admins/dashboard/category"),
      },
      {
        id: 7,
        title: "Product Size",
        href: "/admins/dashboard/sizes",
        icon: Diameter,
        active: pathname.includes("/admins/dashboard/sizes"),
      },
      {
        id: 8,
        title: "Color",
        href: "/admins/dashboard/colors",
        icon: Paintbrush,
        active: pathname.includes("/admins/dashboard/colors"),
      },
      {
        id: 9,
        title: "Banner",
        href: "/admins/dashboard/carousel",
        icon: GalleryHorizontal,
        active: pathname.includes("/admins/dashboard/carousel"),
      },

      // Financial Management
      {
        id: 10,
        title: "Revinew",
        href: "/admins/dashboard/revinews",
        icon: Gem,
        active: pathname.includes("/admins/dashboard/revinews"),
      },
      {
        id: 11,
        title: "Expenses",
        href: "/admins/dashboard/expenses",
        icon: HandCoins,
        active: pathname.includes("/admins/dashboard/expenses"),
      },

      // User Interaction & Feedback
      {
        id: 12,
        title: "Reviews",
        href: "/admins/dashboard/reviews",
        icon: MessagesSquare,
        active: pathname.includes("/admins/dashboard/reviews"),
      },
      {
        id: 13,
        title: "Feedbacks",
        href: "/admins/dashboard/feedbacks",
        icon: Bug,
        active: pathname.includes("/admins/dashboard/feedbacks"),
      },
      {
        id: 14,
        title: "Returns",
        href: "/admins/dashboard/returns",
        icon: Angry,
        active: pathname.includes("/admins/dashboard/returns"),
      },

      // Marketing & Coupons
      {
        id: 15,
        title: "Coupon",
        href: "/admins/dashboard/coupons",
        icon: Puzzle,
        active: pathname.includes("/admins/dashboard/coupons"),
      },

      // Reports & Settings
      {
        id: 16,
        title: "Reports",
        href: "/admins/dashboard/reports",
        icon: BarChart,
        active: pathname.includes("/admins/dashboard/reports"),
      },
      {
        id: 17,
        title: "Home Text",
        href: "/admins/dashboard/home-text",
        icon: TreePalm,
        active: pathname.includes("/admins/dashboard/home-text"),
      },
      {
        id: 18,
        title: "Settings",
        href: "/admins/dashboard/settings",
        icon: Settings,
        active: pathname.includes("/admins/dashboard/settings"),
      },
    ],
    [pathname]
  );

  return routes;
};
