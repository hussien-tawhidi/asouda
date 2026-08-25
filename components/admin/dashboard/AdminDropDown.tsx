"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { LogOut, Settings, User, ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LinkButton from "@/components/common/LinkButton";

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
  return (
    <div className='relative'>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        aria-expanded={open}
        aria-haspopup='true'
        className='flex items-center gap-2 rounded-xl border border-light-lavender/20 px-3 py-2 shadow-sm backdrop-blur-sm transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-light-lavender group'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full font-bold text-dark-bg shadow-sm bg-light-lavender'>
          {initials}
        </div>
        <ChevronDown
          size={18}
          className={`text-light-lavender transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } group-hover:text-light-lavender/80`}
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
            className='absolute right-0 mt-2 w-64 origin-top-left overflow-hidden rounded-2xl bg-dark-bg/90 shadow-2xl backdrop-blur-md z-50'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='user-menu-button'>
            {/* Optional small arrow */}
            <div className='absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-l border-t border-espresso-clay/20 bg-light-mode/90' />

            {/* User info */}
            <div className='border-b border-light-lavender/20 text-light-mode px-4 py-4'>
              <p className='font-semibold'>{displayName}</p>
              <p className='truncate text-sm opacity-70'>{email}</p>
              {session?.user?.role && (
                <span className='mt-1 inline-block rounded-full bg-espresso-clay/70 px-2 py-0.5 text-xs font-medium text-bone-white'>
                  {session.user.role}
                </span>
              )}
            </div>

            {/* Menu items */}
            <div className='p-2 space-y-4 mt-3'>
              <LinkButton
                href='/admin/profile'
                role='menuitem'
                onClick={() => setOpen(false)}
                title='پروفایل'
                icon={User}
              />
              <LinkButton
                href='/admin/settings'
                role='menuitem'
                onClick={() => setOpen(false)}
                title='تنظیمات'
                icon={Settings}
              />

              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm bg-light-lavender text-dark-bg transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
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
