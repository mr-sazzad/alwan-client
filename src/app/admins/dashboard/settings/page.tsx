"use client";
import {
  AlertTriangle,
  Info,
  Laptop,
  Moon,
  Settings,
  Sun,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const AdminSettings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container">
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admins/dashboard" },
        ]}
        page="Settings"
        className="my-3"
      />
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-medium">
              Admin Settings
            </CardTitle>
          </div>
          <CardDescription>
            Manage your admin preferences, view system information, and access
            helpful resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-medium">
                Theme Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select a theme for the admin interface. This affects only your
                view.
              </p>
              <div className="flex space-x-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="flex-1"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="flex-1"
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="flex-1"
                >
                  <Laptop className="mr-2 h-4 w-4" />
                  System
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Current theme:{" "}
                <span className="text-foreground">
                  {theme === "system"
                    ? "System"
                    : theme === "dark"
                    ? "Dark"
                    : "Light"}
                </span>
              </p>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-medium">
                  Order Tracking Resources
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Platforms for checking customer order receive ratios and fraud
                prevention:
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">CourierScore</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Free
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Provides basic order tracking and delivery success rates.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">eFraudChecker</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Paid
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Advanced fraud detection and order verification system.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-medium">
                  Fraud Prevention Tips
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                1. Regularly update your fraud detection software.
              </p>
              <p className="text-sm">
                2. Monitor unusual ordering patterns or high-value orders.
              </p>
              <p className="text-sm">
                3. Verify shipping addresses for high-risk orders.
              </p>
              <p className="text-sm">
                4. Implement two-factor authentication for customer accounts.
              </p>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-medium">
                  System Information
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm flex justify-between">
                  <span className="text-muted-foreground">
                    Admin panel version:
                  </span>
                  <span className="text-foreground">2.1.0</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span className="text-muted-foreground">Last updated:</span>
                  <span className="text-foreground">2023-10-15</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span className="text-muted-foreground">Environment:</span>
                  <span className="text-foreground">Production</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
