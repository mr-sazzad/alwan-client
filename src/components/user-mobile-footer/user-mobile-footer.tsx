"use client";
import { useUserMobileMenu } from "@/static/user-mobile-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Cart from "../cart/cart";
import Favorite from "../favorite/favorite";
import SearchDialog from "../search/search-dialog";

const UserMobileFooter = () => {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [cartModelOpen, setCartModelOpen] = useState(false);
  const [favoriteModelOpen, setFavoriteModelOpen] = useState(false);

  // pathname
  const pathname = usePathname();

  const handleSearchModal = () => {
    setSearchDialogOpen(true);
  };
  const handleCartModal = () => {
    setFavoriteModelOpen(false);
    setCartModelOpen(true);
  };
  const handleWishlistModal = () => {
    setCartModelOpen(false);
    setFavoriteModelOpen(true);
  };

  const userMobileMenu = useUserMobileMenu({
    handleSearchModel: handleSearchModal,
    handleCartModal: handleCartModal,
    handleWishlistModal: handleWishlistModal,
  });

  return (
    <div className="fixed bottom-2 right-2 left-2 z-10 w-full">
      <div
        className={`max-w-[300px] mx-auto flex justify-center ${
          pathname.startsWith("/admins/dashboard") ? "hidden" : ""
        }`}
      >
        <div className="flex flex-row gap-1 h-[50px] w-full justify-between backdrop-blur bg-black/30 dark:bg-white/10 rounded-full">
          {userMobileMenu.map((menu) => (
            <div
              key={menu.id}
              className={`w-full flex justify-center items-center cursor-pointer hover:bg-gray-100/30 dark:text-black hover:text-lg transition duration-100 ${
                menu.className ?? ""
              }`}
              onClick={menu.onClick}
            >
              <div className="flex flex-col items-center w-full h-full">
                {menu.href ? (
                  <Link
                    href={menu.href}
                    className="w-full h-full flex justify-center items-center group"
                  >
                    <menu.icon
                      size={22}
                      className="font-extrabold text-muted-foreground group-hover:text-black"
                    />
                  </Link>
                ) : (
                  <div
                    onClick={menu.onClick}
                    className="w-full h-full flex justify-center items-center group"
                  >
                    <menu.icon
                      size={22}
                      className="font-extrabold text-muted-foreground group-hover:text-black"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SearchDialog
        searchDialogOpen={searchDialogOpen}
        setSearchDialogOpen={setSearchDialogOpen}
      />
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
