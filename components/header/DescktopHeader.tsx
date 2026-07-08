"use client";

import Image from "next/image";
import Link from "next/link";

export default function DesktopHeader() {
  return (
    <section className='w-full border-b border-espresso-clay/10'>
      {/* 🔝 TOP BAR */}
      <div className='bg-espresso-clay text-bone-white text-xs px-10 py-2 flex justify-between'>
        <span>
          خوش آمدید |{" "}
          <Link href='/login' className='underline'>
            ورود
          </Link>
        </span>

        <div className='flex gap-4'>
          <Link href='/wishlist'>علاقه‌مندی‌ها</Link>
          <Link href='/account'>حساب کاربری</Link>
        </div>
      </div>

      {/* 🏷 LOGO */}
      <div className='flex justify-center items-center py-3'>
        <Link
          href='/'
          className='text-2xl tracking-[0.3em] font-semibold text-[#5b4c3a]'>
          <Image
            src={"/asouda-logo.png"}
            width={150}
            height={150}
            className='object-fit'
            alt='لوگوی اسودی'
          />
        </Link>
      </div>

      {/* 📌 NAV MENU */}
      <nav className='flex justify-center items-center gap-6 text-xs text-espresso-clay pb-4'>
        <Link href={"/"} className='hover:text-earth-brown transition'>
          خانه
        </Link>
        <span>|</span>

        <Link href={"/"} className='hover:text-earth-brown transition'>
          سرویس خواب
        </Link>
        <span>|</span>

        <Link href={"/"} className='hover:text-earth-brown transition'>
          کالکشن‌ها
        </Link>
        <span>|</span>

        <Link href={"/"} className='hover:text-earth-brown transition'>
          فروش ویژه
        </Link>
        <span>|</span>

        <Link href={"/"} className='hover:text-earth-brown transition'>
          جدید
        </Link>
        <span>|</span>

        <Link href={"/"} className='hover:text-earth-brown transition'>
          تماس
        </Link>
      </nav>
    </section>
  );
}
