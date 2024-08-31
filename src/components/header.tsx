"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import blackLogo from "../images/logo-black-40.png";
import Cart from "./cart/cart";
import Profile from "./profile/profile-menu";

// icons
import DesktopMenu from "./sidebar/desktop-menu";
import MobileSidebar from "./sidebar/mobile-sidebar";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="h-[90px] md:px-14 sm:px-10 px-5 w-full fixed top-0 z-30 backdrop-blur-[8px] border-b border-gray-50 bg-gray-50/30 dark:bg-gray-50/10">
      <div className="flex justify-between items-center relative h-full">
        <div>
          <Link href="/">
            <Image src={blackLogo} alt="main-logo" height={40} width={40} />
          </Link>
        </div>

        <div className="hidden md:flex justify-center">
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
        </menu>
      </div>
    </nav>
  );
};

export default Header;
