"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container py-10 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">Settings</CardTitle>
          <CardDescription className="text-lg">
            Customize your experience and manage your preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Theme Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Choose a theme that suits your style and enhances your browsing
                experience.
              </p>
              <div className="flex justify-between items-center">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="w-full mr-2"
                >
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="w-full ml-2"
                >
                  Dark
                </Button>
              </div>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                onClick={() => setTheme("system")}
                className="w-full"
              >
                System
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Current theme:{" "}
                <span className="font-medium">
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
              <CardTitle className="text-2xl">Theme Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Light Theme</h3>
                <p className="text-muted-foreground">
                  Perfect for daytime use and well-lit environments. Offers high
                  contrast and readability.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dark Theme</h3>
                <p className="text-muted-foreground">
                  Ideal for low-light conditions and night-time browsing.
                  Reduces eye strain and saves battery on OLED screens.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">System Theme</h3>
                <p className="text-muted-foreground">
                  Automatically adjusts to match your device&apos;s settings,
                  providing a seamless experience across your system.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your theme preference is automatically saved and will be applied
                each time you visit. You can change it at any time from this
                settings page.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
