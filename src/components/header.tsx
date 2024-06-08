"use client";

import Link from "next/link";
import { useState } from "react";
import Cart from "./cart/cart";
import Navigation from "./navigation-menu/navigation";
import Profile from "./profile/profile-menu";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center h-[90px] w-full md:px-14 sm:px-10 px-5 fixed top-0 z-50 backdrop-blur-[8px] border-b border-gray-50 bg-gray-50/30 dark:bg-gray-50/10">
      <menu className="flex gap-5">
        <Navigation />
      </menu>

      <div className="font-bold text-2xl cursor-pointer flex-1 flex justify-center">
        <Link href="/">ALWAN</Link>
      </div>
      <menu className="items-center gap-3 flex justify-end">
        <div className="hidden md:flex">
          <Cart cartOpen={open} setCartOpen={setOpen} />
        </div>
        <Profile />
      </menu>
    </nav>
  );
};

export default Header;
