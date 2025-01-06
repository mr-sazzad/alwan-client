"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiSidebarSimpleBold } from "react-icons/pi";
import { Button } from "../../../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import { Input } from "../../../components/ui/input";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { useAdminDashboardMenu } from "../../../static/admin-dashboard-menu";

export default function AdminsMobileMenu() {
  const adminRoutes = useAdminDashboardMenu();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  const filteredRoutes = adminRoutes.filter((route) =>
    route.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="sm:hidden"
          aria-label="Open dashboard menu"
        >
          <PiSidebarSimpleBold className="h-5 w-5" /> <p>Menu</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl font-medium">
            Dashboard Menu
          </DrawerTitle>
          <DrawerDescription>
            Access your administrative dashboard to manage products, categories,
            orders, and more.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search menu items..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-12rem)] px-4">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-1 pb-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            <AnimatePresence>
              {filteredRoutes.map((menu) => (
                <motion.div
                  key={menu.id}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  <Link
                    href={menu.href}
                    className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
                      pathname === menu.href
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                    }`}
                  >
                    <menu.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{menu.title}</span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </ScrollArea>
        <div className="absolute right-4 top-4">
          <DrawerClose asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
