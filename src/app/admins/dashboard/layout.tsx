"use client";

import AdminsDesktopMenu from "@/components/admins/dashboard/desktop-navigation-menu";
import AdminsMobileMenu from "@/components/admins/dashboard/mobile-navigation-menu";
import MaxWidth from "@/components/max-width";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <MaxWidth className="mt-[90px]">
      <div className="relative w-full h-full">
        <div className="flex gap-5 w-full min-h-full">
          <AdminsDesktopMenu />
          <div className="w-full h-full">{children}</div>
        </div>
        <div className="fixed bottom-5 right-0 left-0 w-full sm:hidden">
          <div className="flex justify-center">
            <AdminsMobileMenu />
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default DashboardLayout;
