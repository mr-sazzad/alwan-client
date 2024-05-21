"use client";

import MaxWidth from "@/components/max-width";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAdminDashboardMenu } from "@/static/admin-dashboard-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const adminRoutes = useAdminDashboardMenu();

  return (
    <MaxWidth className="mt-[90px]">
      <div className="flex gap-5 w-full min-h-[85vh]">
        <div className="flex flex-col gap-1 lg:w-[220px] md:w-[200px] w-[40px]">
          {adminRoutes.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className={`py-2 w-full rounded hover:bg-gray-300 flex items-center md:justify-start justify-center gap-1 px-2 ${
                menu.active
                  ? "bg-black/90 text-slate-100 hover:bg-black/80 hover:text-slate-100"
                  : "text-muted-foreground"
              }`}
            >
              <TooltipProvider delayDuration={40}>
                <Tooltip>
                  <TooltipTrigger>
                    <menu.icon />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{menu.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="hidden md:block">{menu.title}</p>
            </Link>
          ))}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </MaxWidth>
  );
};

export default DashboardLayout;
