import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Footer from "@/components/ui/footer";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "./utils/AuthContext";
import CartFab from "@/components/ui/cart-fab";
import { CartProvider } from "./utils/CartContext";
import NavbarWrapper from "./utils/NavbarWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ZONT music",
  description: "Pagina Oficial de ZONT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <AuthProvider>
            <NavbarWrapper />
            <MantineProvider>
              <HeroUIProvider>
                {children}
              </HeroUIProvider>
            </MantineProvider>
          </AuthProvider>
          <Footer />
          <CartFab />
        </CartProvider>
      </body>
    </html>
  );
}