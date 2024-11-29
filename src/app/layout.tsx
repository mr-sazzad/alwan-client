import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import UserMobileMenu from "@/components/navigation-menu/user-mobile-menu";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/reduxProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alwan",
  description: "The ideal lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body className="font-mono">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className="mb-5">{children}</div>
            <Toaster />
            <UserMobileMenu />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
