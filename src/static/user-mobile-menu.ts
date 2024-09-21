"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

// react icons
import { Home } from "lucide-react";
import { ShoppingCart  } from "lucide-react";
import { Heart } from "lucide-react";

interface IUserMobileMenuProps {
  handleCartModal: () => void;
  handleWishlistModal: () => void;
}

export const useUserMobileMenu = ({
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
        icon: Home,
        active: pathname === "/",
        className: "rounded-l-full",
      },
      {
        id: 4,
        title: "Cart",
        icon: ShoppingCart ,
        onClick: handleCartModal,
      },
      {
        id: 5,
        title: "Wishlist",
        icon: Heart,
        onClick: handleWishlistModal,
        className: "rounded-r-full",
      },
    ],
    [pathname, handleCartModal, handleWishlistModal]
  );

  return routes;
};
