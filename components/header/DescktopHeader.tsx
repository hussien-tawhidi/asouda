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
        <Link href='/'>
          <Image
            src={"/asouda-logo.png"}
            loading='eager'
            width={150}
            height={150}
            className='object-fit w-auto h-auto'
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
          سرویس خواب مدرن
        </Link>
        <span>|</span>

        <Link href={"/"} className='hover:text-earth-brown transition'>
          سرویس خواب دو نفره
        </Link>
        <span>|</span>

        <Link href={"/"} className='hover:text-earth-brown transition'>
          سرویس خواب یک نفره
        </Link>
        <span>|</span>

        <Link href={"/"} className='hover:text-earth-brown transition'>
          سرویس خواب نوجوان
        </Link>
        <span>|</span>

        <Link href={"/"} className='hover:text-earth-brown transition'>
          سرویس خواب سلطنتی
        </Link>
      </nav>
    </section>
  );
}
