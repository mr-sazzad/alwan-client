"use client";
import { useUserMobileMenu } from "@/static/user-mobile-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Cart from "../cart/cart";
import Favorite from "../favorite/favorite";

const UserMobileFooter = () => {
  const [cartModelOpen, setCartModelOpen] = useState(false);
  const [favoriteModelOpen, setFavoriteModelOpen] = useState(false);

  // pathname
  const pathname = usePathname();

  const handleCartModal = () => {
    setFavoriteModelOpen(false);
    setCartModelOpen(true);
  };
  const handleWishlistModal = () => {
    setCartModelOpen(false);
    setFavoriteModelOpen(true);
  };

  const userMobileMenu = useUserMobileMenu({
    handleCartModal: handleCartModal,
    handleWishlistModal: handleWishlistModal,
  });

  return (
    <div className="fixed bottom-2 right-2 left-2 z-10 w-full">
      <div
        className={`max-w-[180px] mx-auto flex justify-center ${
          pathname.startsWith("/admins/dashboard") ? "hidden" : ""
        }`}
      >
        <div className="flex flex-row gap-1 h-[47px] w-full justify-between bg-white dark:bg-gray-900 rounded-full">
          {userMobileMenu.map((menu) => (
            <div
              key={menu.id}
              className={`w-full flex justify-center items-center cursor-pointer hover:text-lg transition duration-100 ${
                menu.className ?? ""
              }`}
              onClick={menu.onClick}
            >
              <div className="flex flex-col items-center w-full h-full">
                {menu.href ? (
                  <Link
                    href={menu.href}
                    className="w-full h-full flex justify-center items-center"
                  >
                    <menu.icon size={22} className="font-extrabold" />
                  </Link>
                ) : (
                  <div
                    onClick={menu.onClick}
                    className="w-full h-full flex justify-center items-center group"
                  >
                    <menu.icon size={22} className="font-extrabold" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden">
        <Cart cartOpen={cartModelOpen} setCartOpen={setCartModelOpen} />
      </div>
      <div className="hidden">
        <Favorite open={favoriteModelOpen} setOpen={setFavoriteModelOpen} />
      </div>
    </div>
  );
};

export default UserMobileFooter;
