import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAdminDashboardMenu } from "@/static/admin-dashboard-menu";
import Link from "next/link";

const AdminsDesktopMenu = () => {
  const adminRoutes = useAdminDashboardMenu();
  return (
    <div className="sm:flex hidden flex-col gap-1 lg:w-[220px] md:w-[200px] sm:w-[40px] border-r pr-2">
      {adminRoutes.map((menu) => (
        <Link
          key={menu.id}
          href={menu.href}
          className={`p-2 w-full rounded flex items-center md:justify-start justify-center gap-1 ${
            menu.active
              ? "bg-black/90 text-slate-100 hover:bg-black/80 hover:text-slate-100 dark:hover:text-white"
              : "hover:bg-gray-300 dark:hover:bg-gray-100 text-muted-foreground"
          }`}
        >
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <menu.icon />
              </TooltipTrigger>
              <TooltipContent side="right" className="md:hidden sm:ml-3">
                <p>{menu.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="hidden md:block">{menu.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default AdminsDesktopMenu;
