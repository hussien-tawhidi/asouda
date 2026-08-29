"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogOut, Settings, User, LayoutDashboard } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AccountDropdown() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (status === "loading") return null;

  // Logged out – show login icon
  if (!session) {
    return (
      <Link
        href='/signin'
        className='flex h-10 w-10 items-center justify-center rounded-full
                   text-espresso-clay transition-colors
                   hover:bg-espresso-clay/10'
        aria-label='ورود'>
        <User size={21} strokeWidth={1.8} />
      </Link>
    );
  }

  const isAdmin = session.user?.role === "admin";
  const userName = session.user?.name || "کاربر";
  const userEmail = session.user?.email || "";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Toggle button */}
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className='flex h-10 w-10 items-center justify-center rounded-full
                   bg-espresso-clay/5 text-espresso-clay transition-colors
                   hover:bg-espresso-clay/10'
        aria-label='حساب کاربری'
        aria-expanded={open}>
        {initials ? (
          <span className='text-sm font-semibold'>{initials}</span>
        ) : (
          <User size={21} strokeWidth={1.8} />
        )}
      </button>

      {/* Dropdown menu */}
      <div
        className={`
          absolute left-0 top-12 z-50 w-64 origin-top-right
          overflow-hidden rounded-2xl rounded-tr-none rounded-tl-none border border-espresso-clay/10 border-t-0
          bg-bone-white shadow-2xl transition-all duration-200
          ${
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }
        `}
        role='menu'
        aria-orientation='vertical'>
        {/* Caret */}
        <div className='absolute -top-2 right-3 h-3 w-3 rotate-45 border-l border-t border-espresso-clay/10 bg-bone-white' />

        {/* User info */}
        <div className='border-b border-espresso-clay/10 px-4 py-4'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold text-espresso-clay'>
              {userName}
            </p>
            {isAdmin && (
              <span className='rounded-full bg-earth-brown/10 px-2 py-0.5 text-xs font-medium text-earth-brown'>
                ادمین
              </span>
            )}
          </div>
          {userEmail && (
            <p className='mt-1 truncate text-xs text-espresso-clay/60'>
              {userEmail}
            </p>
          )}
        </div>

        {/* Menu items */}
        <div className='p-2'>
          <Link
            href='/profile'
            onClick={() => setOpen(false)}
            className='flex items-center gap-3 rounded-xl px-3 py-2.5
                       text-sm text-espresso-clay transition-colors
                       hover:bg-espresso-clay/10'
            role='menuitem'>
            <User size={17} />
            <span>پروفایل من</span>
          </Link>

          <Link
            href='/profile/settings'
            onClick={() => setOpen(false)}
            className='flex items-center gap-3 rounded-xl px-3 py-2.5
                       text-sm text-espresso-clay transition-colors
                       hover:bg-espresso-clay/10'
            role='menuitem'>
            <Settings size={17} />
            <span>تنظیمات حساب</span>
          </Link>

          {isAdmin && (
            <Link
              href='/admin'
              onClick={() => setOpen(false)}
              className='flex items-center gap-3 rounded-xl px-3 py-2.5
                         text-sm text-espresso-clay transition-colors
                         hover:bg-espresso-clay/10'
              role='menuitem'>
              <LayoutDashboard size={17} />
              <span>پنل مدیریت</span>
            </Link>
          )}

          <div className='my-2 h-px bg-espresso-clay/10' />

          <button
            type='button'
            onClick={() => signOut({ callbackUrl: "/" })}
            className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5
                       text-sm text-red-600 transition-colors
                       hover:bg-red-50'
            role='menuitem'>
            <LogOut size={17} />
            <span>خروج از حساب</span>
          </button>
        </div>
      </div>
    </div>
  );
}
