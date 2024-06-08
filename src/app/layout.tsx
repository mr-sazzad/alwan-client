import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import UserMobileMenu from "@/components/navigation-menu/user-mobile-menu";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/reduxProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const font = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

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
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div>{children}</div>
            <Toaster />
            <Footer />
            <UserMobileMenu />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
