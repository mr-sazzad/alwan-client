"use client";

import Link from "next/link";
import Cart from "./cart/cart";
import Navigation from "./navigation-menu/navigation";
import Profile from "./profile/profile-menu";
import ModeToggle from "./themes/theme-toggle";

const Header = () => {
  return (
    <nav className="flex justify-between items-center h-[90px] w-full md:px-14 sm:px-10 px-5 fixed top-0 z-50 backdrop-blur-2xl border-b border-gray-200">
      <menu className="flex gap-5 flex-1">
        <Navigation />
      </menu>
      <div className="font-bold text-2xl cursor-pointer flex-1 flex justify-center">
        <Link href="/">ALWAN</Link>
      </div>
      <menu className="items-center gap-3 flex justify-end flex-1">
        <div className="hidden md:flex">
          <Cart />
        </div>
        <Profile />
        <ModeToggle />
      </menu>
    </nav>
  );
};

export default Header;
