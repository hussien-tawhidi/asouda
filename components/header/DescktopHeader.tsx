"use client";

import { categories } from "@/constant/home-data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import SocialIconsContact from "../common/SocialIconsContact";

export default function DesktopHeader() {
  const pathname = usePathname();

  return (
    <header className='w-full border-b border-espresso-clay/10 shadow-sm'>
      {/* Top Bar */}
      <div className='bg-espresso-clay text-bone-white'>
        <div className='mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs'>
          <span>
            خوش آمدید |{" "}
            <Link
              href='/login'
              className='underline underline-offset-4 hover:text-earth-brown transition-colors'>
              ورود
            </Link>
          </span>

          <div className='flex items-center gap-5'>
            <Link
              href='/wishlist'
              className='hover:text-earth-brown transition-colors'>
              علاقه‌مندی‌ها
            </Link>

            <Link
              href='/account'
              className='hover:text-earth-brown transition-colors'>
              حساب کاربری
            </Link>
          </div>
        </div>
      </div>

      {/* Logo + Search + Slogan */}
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-5'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='shrink-0'>
            <Image
              src='/asouda-logo.png'
              alt='لوگوی اسودی'
              width={180}
              height={60}
              priority
              className='h-12 w-auto'
            />
          </Link>
          <p className='text-xl font-semibold tracking-wide'>
            راحتی که ماندگار است
          </p>
          <SearchBar />
        </div>

        <div className='shrink-0'>
          <SocialIconsContact aboutInfo />
        </div>
      </div>

      <div className='mx-auto h-px max-w-7xl bg-linear-to-r from-transparent via-espresso-clay/30 to-transparent' />

      {/* Navigation */}
      <nav className='mx-auto flex h-14 max-w-7xl items-center justify-center px-6'>
        <ul className='flex items-center gap-6 text-sm font-medium text-espresso-clay'>
          {categories.map((item, index) => (
            <li key={item.href} className='flex items-center gap-6'>
              <Link
                href={item.href}
                className={`relative py-2 transition-colors duration-300
                  after:absolute after:bottom-0 after:left-0 after:h-0.5
                  after:w-0 after:bg-earth-brown after:transition-all
                  after:duration-300 hover:text-earth-brown hover:after:w-full
                  ${
                    pathname === item.href
                      ? "text-earth-brown after:w-full"
                      : ""
                  }`}>
                {item.name}
              </Link>

              {index !== categories.length - 1 && (
                <span className='text-espresso-clay/30'>|</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
