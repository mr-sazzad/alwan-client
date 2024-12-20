"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AdminsDesktopMenu from "@/components/admins/dashboard/desktop-navigation-menu";
import AdminsMobileMenu from "@/components/admins/dashboard/mobile-navigation-menu";
import MaxWidth from "@/components/max-width";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { getUserFromLocalStorage } from "@/helpers/jwt";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const user: any = getUserFromLocalStorage();

  useEffect(() => {
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You are not authorized to access this page.",
      });
      router.back();
    }
  }, [user, router, toast]);

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
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
