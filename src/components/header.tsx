"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button } from "../components/ui/button";
import Cart from "./cart/cart";
import Favorite from "./favorite/favorite";
import Profile from "./profile/profile-menu";
import FullWidthSearch from "./search/search";
import DesktopMenu from "./sidebar/desktop-menu";
import MobileSidebar from "./sidebar/mobile-sidebar";

const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [favoriteOpen, setFavoriteOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    setVisible((prevVisible) => {
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setPrevScrollPos(currentScrollPos);
      return visible;
    });
  }, [prevScrollPos]);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [handleScroll]);

  return (
    <>
      <nav
        className={`h-[90px] md:px-14 sm:px-10 px-5 w-full fixed top-0 z-30 transition-transform duration-200 border-b bg-background ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center relative h-full">
          <div>
            <Link href="/">
              {/* <Image src={blackLogo} alt="main-logo" height={40} width={40} /> */}
            </Link>
          </div>

          <div className="hidden md:flex justify-center w-full">
            <DesktopMenu />
          </div>

          <menu className="items-center flex justify-end">
            <div className="mr-2">
              <Profile />
            </div>
            <div className="flex items-center">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
                className="rounded-full mr-1"
              >
                <FiSearch size={20} />
              </Button>
              <div className="md:hidden">
                <MobileSidebar />
              </div>
            </div>

            <div className="hidden md:flex">
              <Favorite open={favoriteOpen} setOpen={setFavoriteOpen} />
              <div>
                <Cart cartOpen={open} setCartOpen={setOpen} />
              </div>
            </div>
          </menu>
        </div>
      </nav>
      <FullWidthSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
