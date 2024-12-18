"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAdminDashboardMenu } from "@/static/admin-dashboard-menu";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { TbLayoutSidebarRight } from "react-icons/tb";

export default function AdminsDesktopMenu() {
  const adminRoutes = useAdminDashboardMenu();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      className="hidden sm:flex flex-col border-r dark:border-gray-800 h-auto"
      animate={{ width: isExpanded ? 240 : 70 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${isExpanded ? "self-end" : "mx-auto"}`}
        >
          <TbLayoutSidebarRight className="h-4 w-4 rotate-180" />
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="px-4 pb-4 space-y-2">
          {adminRoutes.map((menu) => (
            <TooltipProvider key={menu.id} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={menu.href}
                    className={`p-3 w-full rounded-md flex items-center gap-3 transition-all duration-200 ${
                      menu.active
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <menu.icon className="w-4 h-4 flex-shrink-0" />
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          className="truncate"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {menu.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className={isExpanded ? "hidden" : "block"}
                >
                  <p>{menu.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
}
