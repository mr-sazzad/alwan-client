"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import mainLogo from "../images/logo-main.png";
import logo from "../images/logo.png";
import Cart from "./cart/cart";
import Navigation from "./navigation-menu/navigation";
import Profile from "./profile/profile-menu";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center h-[110px] w-full md:px-14 sm:px-10 px-5 fixed top-0 z-50 backdrop-blur-[8px] border-b border-gray-50 bg-gray-50/30 dark:bg-gray-50/10">
      <menu className="flex gap-5">
        <Navigation />
      </menu>

      <div className="font-bold text-2xl cursor-pointer flex-1 flex justify-center">
        <Link href="/">
          <div className="sm:flex hidden">
            <Image src={mainLogo} alt="main-logo" height={1517} width={292} />
          </div>
          <div className="sm:hidden">
            <Image src={logo} alt="main-logo" height={1517} width={292} />
          </div>
        </Link>
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
