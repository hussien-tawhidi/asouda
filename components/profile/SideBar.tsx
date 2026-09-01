"use client";

import { profileMenuItems } from "@/constant/home-data";
import { ChevronLeft, LogOut, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SideBar() {
  const { data: session } = useSession();
  return (
    <div className='h-fit rounded-3xl border border-espresso-clay/10 bg-white p-3 shadow-sm'>
      {/* User */}
      <div className='mb-3 rounded-2xl bg-espresso-clay px-4 py-5 text-bone-white'>
        <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bone-white/15'>
          <User size={26} strokeWidth={1.5} />
        </div>

        <h2 className='font-semibold'>{session?.user.name}</h2>

        <p className='mt-1 text-xs text-bone-white/60'>حساب کاربری شما</p>
      </div>

      {/* Navigation */}
      <nav className='space-y-1'>
        {profileMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className='group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-espresso-clay/70 transition hover:bg-espresso-clay/5 hover:text-espresso-clay'>
              <div className='flex items-center gap-3'>
                <Icon
                  size={18}
                  strokeWidth={1.7}
                  className='transition group-hover:scale-105'
                />

                <span>{item.label}</span>
              </div>

              <ChevronLeft
                size={15}
                className='opacity-0 transition group-hover:opacity-50'
              />
            </Link>
          );
        })}
      </nav>

      <div className='my-3 h-px bg-espresso-clay/10' />

      {/* Logout */}
      <button className='flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 transition hover:bg-red-50'>
        <LogOut size={18} strokeWidth={1.7} />

        <span>خروج از حساب</span>
      </button>
    </div>
  );
}
