import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { BsBodyText } from "react-icons/bs";
import { GiExpense, GiProfit } from "react-icons/gi";
import { GoCommentDiscussion } from "react-icons/go";
import { LiaTshirtSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdMergeType,
  MdOutlineColorLens,
  MdStarBorderPurple500,
} from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { RxSize } from "react-icons/rx";
import { TbCarouselHorizontal, TbTruckReturn } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";

export const useAdminDashboardMenu = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        id: 1,
        title: "Dashboard",
        href: "/admins/dashboard/application-dashboard",
        icon: LuLayoutDashboard,
        active: pathname.includes("/admins/dashboard/application-dashboard"),
      },
      {
        id: 2,
        title: "Carousel",
        href: "/admins/dashboard/carousel",
        icon: TbCarouselHorizontal,
        active: pathname.includes("/admins/dashboard/carousel"),
      },
      {
        id: 3,
        title: "Category",
        href: "/admins/dashboard/category",
        icon: BiCategoryAlt,
        active: pathname.includes("/admins/dashboard/category"),
      },
      {
        id: 4,
        title: "Reviews",
        href: "/admins/dashboard/reviews",
        icon: GoCommentDiscussion,
        active: pathname.includes("/admins/dashboard/reviews"),
      },
      {
        id: 5,
        title: "Color",
        href: "/admins/dashboard/colors",
        icon: MdOutlineColorLens,
        active: pathname.includes("/admins/dashboard/colors"),
      },
      {
        id: 6,
        title: "Coupon",
        href: "/admins/dashboard/coupons",
        icon: RiCoupon3Line,
        active: pathname.includes("/admins/dashboard/coupons"),
      },
      {
        id: 7,
        title: "Expenses",
        href: "/admins/dashboard/expenses",
        icon: GiExpense,
        active: pathname.includes("/admins/dashboard/espenses"),
      },

      {
        id: 8,
        title: "Feedbacks",
        href: "/admins/dashboard/feedbacks",
        icon: VscFeedback,
        active: pathname.includes("/admins/dashboard/feedbacks"),
      },
      {
        id: 9,
        title: "Orders",
        href: "/admins/dashboard/orders",
        icon: MdStarBorderPurple500,
        active: pathname.includes("/admins/dashboard/orders"),
      },
      {
        id: 10,
        title: "Product Type",
        href: "/admins/dashboard/product-types",
        icon: MdMergeType,
        active: pathname.includes("/admins/dashboard/product-types"),
      },
      {
        id: 11,
        title: "Products",
        href: "/admins/dashboard/products",
        icon: LiaTshirtSolid,
        active: pathname.includes("/admins/dashboard/products"),
      },

      {
        id: 12,
        title: "Returns",
        href: "/admins/dashboard/returns",
        icon: TbTruckReturn,
        active: pathname.includes("/admins/dashboard/returns"),
      },
      {
        id: 13,
        title: "Revinew",
        href: "/admins/dashboard/revinews",
        icon: GiProfit,
        active: pathname.includes("/admins/dashboard/revinews"),
      },
      {
        id: 14,
        title: "Size",
        href: "/admins/dashboard/sizes",
        icon: RxSize,
        active: pathname.includes("/admins/dashboard/sizes"),
      },
      {
        id: 15,
        title: "Home Text",
        href: "/admins/dashboard/home-text",
        icon: BsBodyText,
        active: pathname.includes("/admins/dashboard/home-text"),
      },
    ],
    [pathname]
  );

  return routes;
};
