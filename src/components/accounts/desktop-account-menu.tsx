"use client";

import { useUserAccountMenu } from "@/static/user-account-menu";
import Link from "next/link";
import { Button } from "../ui/button";

const DesktopAccountMenu = () => {
  const userAccountmenus = useUserAccountMenu();
  return (
    <div className="pt-2 md:w-[180px] sm:w-[50px] pr-3 border-r h-custom-height sm:block hidden">
      <div className="flex flex-col gap-2">
        {userAccountmenus.map((menu) => (
          <Button variant="outline" key={menu.id}>
            <Link href={menu.href} className="flex gap-2 items-center">
              <menu.icon />
              <p className="md:flex hidden">{menu.title}</p>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DesktopAccountMenu;
