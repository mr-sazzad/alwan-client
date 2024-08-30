import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import UserMobileMenu from "@/components/navigation-menu/user-mobile-menu";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/reduxProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alwan",
  description: "The ideal lifestyle",
};

const myFont = localFont({
  src: "../../public/fonts/HelveticaNowText-Medium.woff2",
  variable: "--font-helvetica",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" className={`${myFont.variable} font-sans`}>
        <body>
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
