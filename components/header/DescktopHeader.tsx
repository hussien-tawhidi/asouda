"use client";

import { categories } from "@/constant/home-data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./search/search-bar/SearchBar";
import SocialIconsContact from "../common/SocialIconsContact";
import TopBar from "./TopBar";

export default function DesktopHeader() {
  const pathname = usePathname();

  return (
    <header className='w-full border-b border-espresso-clay/10 shadow-sm'>
      {/* Top Bar */}
      <TopBar />

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
        <ul className='flex items-center gap-4 text-sm font-medium text-espresso-clay'>
          {categories.map((item, index) => (
            <li key={item.href} className='flex items-center gap-3'>
              <Link
                href={item.href}
                className={`relative text-xs py-2 transition-colors duration-300
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
