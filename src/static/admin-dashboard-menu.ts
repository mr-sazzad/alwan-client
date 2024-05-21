import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { LiaTshirtSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { TbCarouselHorizontal } from "react-icons/tb";
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
        title: "Products",
        href: "/admins/dashboard/products",
        icon: LiaTshirtSolid,
        active: pathname.includes("/admins/dashboard/products"),
      },
      {
        id: 3,
        title: "Orders",
        href: "/admins/dashboard/orders",
        icon: MdOutlineMonitorHeart,
        active: pathname.includes("/admins/dashboard/orders"),
      },
      {
        id: 4,
        title: "Comments",
        href: "/admins/dashboard/comments",
        icon: GoCommentDiscussion,
        active: pathname.includes("/admins/dashboard/comments"),
      },
      {
        id: 5,
        title: "Feedbacks",
        href: "/admins/dashboard/feedbacks",
        icon: VscFeedback,
        active: pathname.includes("/admins/dashboard/feedbacks"),
      },
      {
        id: 6,
        title: "Carousel",
        href: "/admins/dashboard/carousel",
        icon: TbCarouselHorizontal,
        active: pathname.includes("/admins/dashboard/carousel"),
      },
    ],
    [pathname]
  );

  return routes;
};
