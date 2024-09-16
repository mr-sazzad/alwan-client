"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import blackLogo from "../images/logo-black-40.png";
import Cart from "./cart/cart";
import Favorite from "./favorite/favorite";
import Profile from "./profile/profile-menu";
import DesktopMenu from "./sidebar/desktop-menu";
import MobileSidebar from "./sidebar/mobile-sidebar";

// Throttle function to limit the rate at which a function can fire
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

const Header = () => {
  const [open, setOpen] = useState(false);
  const [favoriteOpen, setFavoriteOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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
    <nav
      className={`h-[90px] md:px-14 sm:px-10 px-5 w-full fixed top-0 z-30 bg-white  transition-transform duration-300 border-b ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center relative h-full">
        <div>
          <Link href="/">
            <Image src={blackLogo} alt="main-logo" height={40} width={40} />
          </Link>
        </div>

        <div className="hidden md:flex justify-center w-full">
          <DesktopMenu />
        </div>

        <menu className="items-center gap-3 flex justify-end">
          <Profile />
          <div className="md:hidden flex">
            <MobileSidebar />
          </div>
          <div className="hidden md:flex">
            <Cart cartOpen={open} setCartOpen={setOpen} />
          </div>

          <div className="hidden md:flex">
            <Favorite open={favoriteOpen} setOpen={setFavoriteOpen} />
          </div>
        </menu>
      </div>
    </nav>
  );
};

export default Header;
