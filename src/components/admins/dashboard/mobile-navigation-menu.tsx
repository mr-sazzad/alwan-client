"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
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
        <div className="flex flex-row justify-start gap-2 w-full flex-wrap px-5">
          {adminRoutes.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className={`flex flex-col gap-1 justify-center items-center p-3 rounded w-[23%] border border-gray-400 ${
                menu.active
                  ? "bg-black/90 dark:bg-slate-100 text-slate-100 dark:text-black/80 hover:bg-black/80 hover:text-slate-100 dark:hover:text-gray-400"
                  : "hover:bg-gray-300 dark:hover:bg-gray-100 text-muted-foreground dark:hover:text-black/80 hover:text-gray-800"
              }`}
            >
              <menu.icon size={28} className="p-1 border rounded-full" />
              <p className="text-xs font-medium">{menu.title}</p>
            </Link>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AdminsMobileMenu;
