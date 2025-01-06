"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import MaxWidth from "../../components/max-width";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useUserAccountMenu } from "../../static/user-account-menu";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const userRoutes = useUserAccountMenu();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState("0px");
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const updateMenuHeight = () => {
      if (menuRef.current) {
        if (window.innerWidth >= 768) {
          setMenuHeight("auto");
        } else {
          setMenuHeight(
            isMobileMenuOpen ? `${menuRef.current.scrollHeight}px` : "0px"
          );
        }
      }
    };

    updateMenuHeight();
    window.addEventListener("resize", updateMenuHeight);

    return () => {
      window.removeEventListener("resize", updateMenuHeight);
    };
  }, [isMobileMenuOpen]);

  return (
    <MaxWidth className="mt-[100px]">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col md:grid md:gap-6 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="md:hidden mb-4">
            <Button
              onClick={toggleMobileMenu}
              variant="outline"
              className="w-full justify-between"
            >
              <span>Menu</span>
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Card
            className={`overflow-hidden transition-all duration-300 ease-in-out md:h-auto md:overflow-visible ${
              isMobileMenuOpen ? "border" : "border-0"
            }`}
            style={{ maxHeight: menuHeight }}
          >
            <CardContent className="p-4" ref={menuRef}>
              <nav className="flex flex-col space-y-2">
                {userRoutes.map((route) => (
                  <Link
                    key={route.id}
                    href={route.href}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      route.active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.title}
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>

          <Card className="mt-4 md:mt-0">
            <CardContent className="p-4 md:p-6">{children}</CardContent>
          </Card>
        </div>
      </div>
    </MaxWidth>
  );
}
