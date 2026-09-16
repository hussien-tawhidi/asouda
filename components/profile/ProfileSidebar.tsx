"use client";

import Link from "next/link";
import { ChevronLeft, Edit3, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { profileMenuItems } from "@/constant/home-data";

export default function ProfileSidebar() {
  const { data: session } = useSession();

  return (
    <aside className='h-fit rounded-3xl border border-espresso-clay/10 p-3 shadow-sm'>
      {/* User */}
      <div className='mb-3 flex items-center justify-between rounded-2xl px-4'>
        <div className=''>
          <h2 className='font-semibold'>{session?.user.name}</h2>
          <p className='mt-1 text-xs opacity-90'>{session?.user?.email}</p>
        </div>
        <Link href={`/profile/${session?.user.id}-${session?.user.name}`}>
          <Edit3 className="w-4 h-4 text-light-lavender"/>
        </Link>
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

      {/* Divider */}
      <div className='my-3 h-px bg-espresso-clay/10' />

      {/* Logout */}
      <button
        type='button'
        onClick={() => signOut({ callbackUrl: "/" })}
        className='flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 transition hover:bg-red-50'>
        <LogOut size={18} strokeWidth={1.7} />

        <span>خروج از حساب</span>
      </button>
    </aside>
  );
}
