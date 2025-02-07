"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname === "/admin-dashboard") {
    return null; // Don't render the Navbar on the admin-dashboard page
  }

  return <Navbar />;
}