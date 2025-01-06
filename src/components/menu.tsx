"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ListItem } from "./ui/list-item";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const Menu = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] sm:w-[300px] w-[250px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Image
                        src="../images/profile.svg"
                        alt="logo-image"
                        width={24}
                        height={24}
                      />
                      <div className="mb-2 mt-4 text-lg font-medium">ALWAN</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        The most loved clothing brand in Bangladesh
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/t-shirts" title="T-shirts">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Menu;
