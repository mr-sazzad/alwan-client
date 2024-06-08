import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAdminDashboardMenu } from "@/static/admin-dashboard-menu";
import Link from "next/link";

const AdminsMobileMenu = () => {
  const adminRoutes = useAdminDashboardMenu();
  return (
    <div className="sm:hidden flex flex-row gap-1 w-full rounded-full z-50 backdrop-blur bg-black/30 mb-2 dark:bg-white/10">
      {adminRoutes.map((menu) => (
        <Link
          key={menu.id}
          href={menu.href}
          className={`py-4 w-full flex justify-center items-center ${
            menu.active
              ? "bg-black/90 dark:bg-slate-100 text-slate-100 dark:text-black/80 hover:bg-black/80 hover:text-slate-100 dark:hover:text-gray-400"
              : "hover:bg-gray-300 dark:hover:bg-gray-100 text-muted-foreground dark:hover:text-black/80 hover:text-gray-800"
          }`}
        >
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <menu.icon size={20} />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{menu.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      ))}
    </div>
  );
};

export default AdminsMobileMenu;
