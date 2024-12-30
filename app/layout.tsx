import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./utils/AuthContext";
import CartFab from "@/components/ui/cart-fab";

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
        <AuthProvider>
          <Navbar />
          <MantineProvider>
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </MantineProvider>
        </AuthProvider>
        <Footer />
        <CartFab />
      </body>
    </html >
  );
}
