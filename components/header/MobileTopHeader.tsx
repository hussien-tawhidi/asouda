"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./search/search-bar/SearchBar";
import { BiUser } from "react-icons/bi";
import { PiHeartThin } from "react-icons/pi";
import SocialIconsContact from "../common/SocialIconsContact";

export default function MobileTopHeader() {
  return (
    <section className='fixed top-0 left-0 z-50 w-full border-b border-earth-brown/20 bg-bone-white/80 shadow-sm backdrop-blur-md'>
      {/* Top Bar */}
      <div className='flex items-center justify-between bg-espresso-clay px-5 py-2 text-xs text-bone-white'>
        <span>
          خوش آمدید |{" "}
          <Link href='/login' className='underline'>
            ورود
          </Link>
        </span>

        <div className='flex items-center gap-4 text-base'>
          <Link href='/wishlist' aria-label='علاقه‌مندی‌ها'>
            <PiHeartThin />
          </Link>

          <Link href='/account' aria-label='حساب کاربری'>
            <BiUser />
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className='flex items-center justify-between px-4 py-2'>
        {/* Logo + Search */}
        <div className='flex min-w-0 flex-1 items-center'>
          <Link href='/' className='shrink-0'>
            <Image
              src='/asouda-logo.png'
              alt='آسوده'
              width={160}
              height={40}
              priority
              className='h-auto w-14 object-contain'
            />
          </Link>

          <div className='min-w-0 flex-1'>
            <SearchBar />
          </div>
        </div>

        {/* Actions */}
        <div className='mr-2 flex shrink-0 items-center'>
          <SocialIconsContact />
        </div>
      </div>
    </section>
  );
}
