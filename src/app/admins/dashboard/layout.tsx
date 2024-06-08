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
      <div className="relative w-full h-custom-height">
        <div className="flex gap-5 w-full min-h-full">
          <AdminsDesktopMenu />
          <div className="w-full">{children}</div>
        </div>
        <div className="fixed bottom-0 right-0 left-0 backdrop-blur">
          <AdminsMobileMenu />
        </div>
      </div>
    </MaxWidth>
  );
};

export default DashboardLayout;
