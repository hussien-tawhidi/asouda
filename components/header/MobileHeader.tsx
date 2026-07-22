"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BiHome, BiPhone } from "react-icons/bi";
import { BsInfo } from "react-icons/bs";
import { categories } from "@/constant/home-data";
import MobileMenuDrawer from "./MobileMenuDrawer";
import MobileTopHeader from "./MobileTopHeader";
import MobileBottomNav from "./MobileBottomNav";

export default function MobileHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    queueMicrotask(() => {
      setIsMenuOpen(false);
    });
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Bottom tab items
  const navItems = [
    { name: "خانه", href: "/", icon: BiHome },
    { name: "درباره ما", href: "/about", icon: BsInfo },
    { name: "تماس با ما", href: "/contact", icon: BiPhone },
  ];

  return (
    <header>
      {/* ===== TOP HEADER (fixed) ===== */}
      <MobileTopHeader />

      {/* ===== OVERLAY & DRAWER ===== */}
      <MobileMenuDrawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={categories}
      />

      {/* ===== BOTTOM TAB BAR ===== */}
      <MobileBottomNav
        navItems={navItems}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />
    </header>
  );
}
