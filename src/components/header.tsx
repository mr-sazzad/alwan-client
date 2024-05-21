"use client";

import Link from "next/link";
import Cart from "./cart/cart";
import Menu from "./menu";
import Profile from "./profile/profile-menu";

const Header = () => {
  return (
    <nav className="flex justify-between items-center h-[90px] w-full md:px-14 sm:px-10 px-5 fixed top-0 z-50 bg-white/30 backdrop-blur-2xl">
      <menu className="flex gap-5 flex-1">
        <Menu />
      </menu>
      <div className="font-bold text-2xl cursor-pointer flex-1 flex justify-center">
        <Link href="/">ALWAN</Link>
      </div>
      <menu className="items-center gap-3 flex justify-end flex-1">
        <div className="hidden md:flex">
          <Cart />
        </div>
        <Profile />
      </menu>
    </nav>
  );
};

export default Header;
