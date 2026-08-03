"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { LogOut, Settings, User, ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Utility: consistent gradient from a string
const stringToGradient = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 60) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 80%, 60%), hsl(${hue2}, 80%, 60%))`;
};

export default function AdminDropDown() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const toggleDropdown = useCallback(() => setOpen((prev) => !prev), []);

  if (status === "loading") {
    return (
      <div className='flex items-center gap-2 rounded-xl border bg-bone-white px-3 py-2 shadow-sm'>
        <div className='h-10 w-10 animate-pulse rounded-full bg-bone-white' />
        <Loader2 size={18} className='animate-spin text-gray-400' />
      </div>
    );
  }

  const displayName = session?.user?.name ?? "Admin";
  const email = session?.user?.email ?? "admin@example.com";
  const initials = displayName.charAt(0).toUpperCase();
  const avatarGradient = stringToGradient(displayName);

  return (
    <div className='relative'>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        aria-expanded={open}
        aria-haspopup='true'
        className='flex items-center gap-2 rounded-xl border border-espresso-clay/20 px-3 py-2 shadow-sm backdrop-blur-sm transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 group'>
        <div
          className='flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-sm'
          style={{ background: avatarGradient }}>
          {initials}
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } group-hover:text-gray-700`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className='absolute right-0 mt-2 w-64 origin-top-left overflow-hidden rounded-2xl bg-bone-white/90 shadow-2xl backdrop-blur-md z-50'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='user-menu-button'>
            {/* Optional small arrow */}
            <div className='absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-l border-t border-espresso-clay/20 bg-warm-putty/90' />

            {/* User info */}
            <div className='border-b border-espresso-clay/20 px-4 py-4'>
              <p className='font-semibold'>{displayName}</p>
              <p className='truncate text-sm text-espresso-clay/80'>{email}</p>
              {session?.user?.role && (
                <span className='mt-1 inline-block rounded-full bg-espresso-clay/70 px-2 py-0.5 text-xs font-medium text-bone-white'>
                  {session.user.role}
                </span>
              )}
            </div>

            {/* Menu items */}
            <div className='p-2 space-y-0.5'>
              <Link
                href='/admin/profile'
                className='flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500'
                role='menuitem'
                onClick={() => setOpen(false)}>
                <User size={18} className='text-gray-500' />
                پروفایل
              </Link>

              <Link
                href='/admin/settings'
                className='flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500'
                role='menuitem'
                onClick={() => setOpen(false)}>
                <Settings size={18} className='text-gray-500' />
                تنظیمات
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition-all hover:bg-red-50/80 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                role='menuitem'>
                <LogOut size={18} />
                خروج از حساب
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
