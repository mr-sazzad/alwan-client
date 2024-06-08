"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

// react icons
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiHeart3Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbHome } from "react-icons/tb";

interface IUserMobileMenuProps {
  handleSearchModel: () => void;
  handleCartModal: () => void;
  handleWishlistModal: () => void;
}

export const useUserMobileMenu = ({
  handleSearchModel,
  handleCartModal,
  handleWishlistModal,
}: IUserMobileMenuProps) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        id: 1,
        title: "Home",
        href: "/",
        icon: TbHome,
        active: pathname === "/",
        className: "rounded-l-full",
      },
      {
        id: 2,
        title: "Products",
        href: "/t-shirts",
        icon: RxDashboard,
        active: pathname.startsWith("/t-shirts"),
      },
      {
        id: 3,
        title: "Search",
        icon: FiSearch,
        onClick: handleSearchModel,
      },
      {
        id: 4,
        title: "Cart",
        icon: MdOutlineShoppingBag,
        onClick: handleCartModal,
      },
      {
        id: 5,
        title: "Wishlist",
        icon: RiHeart3Line,
        onClick: handleWishlistModal,
        className: "rounded-r-full",
      },
    ],
    [pathname, handleCartModal, handleSearchModel, handleWishlistModal]
  );

  return routes;
};
