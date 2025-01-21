import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import React from "react";

import Footer from "../components/footer/footer";
import Header from "../components/header";
import UserMobileMenu from "../components/navigation-menu/user-mobile-menu";
import { Toaster } from "../components/ui/toaster";
import Providers from "../providers/reduxProvider";
import { ThemeProvider } from "../providers/theme-provider";

import ClarityTracker from "../components/utils/clarity";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alwan",
  description: "The ideal lifestyle",
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-mono min-h-screen flex flex-col">
        {/* MICROSOFT CLARITY TRACKER */}
        <ClarityTracker />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <UserMobileMenu />
            <Toaster />
          </ThemeProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
