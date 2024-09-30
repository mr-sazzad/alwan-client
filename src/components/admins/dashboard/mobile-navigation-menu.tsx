"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAdminDashboardMenu } from "@/static/admin-dashboard-menu";
import { X } from "lucide-react";
import Link from "next/link";

const AdminsMobileMenu = () => {
  const adminRoutes = useAdminDashboardMenu();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="rounded-full text-xl font-medium">
          Dashboard menu
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <DrawerHeader className="mt-3">
            <DrawerTitle className="font-medium text-2xl">Menu</DrawerTitle>
            <DrawerDescription>
              Access your administrative dashboard to manage products,
              categories, orders, and more.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-row justify-start gap-2 w-full flex-wrap px-5 mb-7">
            {adminRoutes.map((menu) => (
              <Link
                key={menu.id}
                href={menu.href}
                className={`flex gap-2 justify-start items-center rounded w-[32%] border border-gray-300 p-1 h-[35px] overflow-hidden ${
                  menu.active
                    ? "bg-black/90 dark:bg-slate-100 text-slate-100 dark:text-black/80 hover:bg-black/80 hover:text-slate-100 dark:hover:text-gray-400"
                    : "hover:bg-gray-300 dark:hover:bg-gray-100 text-muted-foreground dark:hover:text-black/80 hover:text-gray-800"
                }`}
              >
                <menu.icon className="h-4 w-4" />
                <p className="">{menu.title}</p>
              </Link>
            ))}
          </div>
          <div className="absolute top-7 right-7">
            <DrawerClose>
              <Button className="rounded-full" size="icon">
                <X />
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AdminsMobileMenu;
