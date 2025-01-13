"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AdminsDesktopMenu from "../../../components/admins/dashboard/desktop-navigation-menu";
import AdminsMobileMenu from "../../../components/admins/dashboard/mobile-navigation-menu";
import MaxWidth from "../../../components/max-width";
import { Toaster } from "../../../components/ui/toaster";
import { useToast } from "../../../components/ui/use-toast";
import { getUserFromLocalStorage } from "../../../helpers/jwt";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const user: any = getUserFromLocalStorage();
    const authorized =
      user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN");
    setIsAuthorized(authorized);

    if (!authorized) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You are not authorized to access this page.",
      });
      router.back();
    }
  }, [router, toast]);

  if (isAuthorized === null) {
    // Return a loading state or null while checking authorization
    return null;
  }

  if (!isAuthorized) {
    // User is not authorized, don't render the layout
    return null;
  }

  return (
    <>
      <Toaster />
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
    </>
  );
};

export default DashboardLayout;
