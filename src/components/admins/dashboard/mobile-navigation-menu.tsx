"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAdminDashboardMenu } from "@/static/admin-dashboard-menu";
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
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>
              Access your administrative dashboard to manage products,
              categories, orders, and more.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-row justify-start gap-2 w-full flex-wrap px-5">
            {adminRoutes.map((menu) => (
              <Link
                key={menu.id}
                href={menu.href}
                className={`flex gap-2 justify-start items-center rounded w-[32%] border border-gray-400 p-1 h-[35px] overflow-hidden ${
                  menu.active
                    ? "bg-black/90 dark:bg-slate-100 text-slate-100 dark:text-black/80 hover:bg-black/80 hover:text-slate-100 dark:hover:text-gray-400"
                    : "hover:bg-gray-300 dark:hover:bg-gray-100 text-muted-foreground dark:hover:text-black/80 hover:text-gray-800"
                }`}
              >
                <menu.icon />
                <p className="text-xs font-medium">{menu.title}</p>
              </Link>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full" variant="outline" size="sm">
                Cancel Menu
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AdminsMobileMenu;
