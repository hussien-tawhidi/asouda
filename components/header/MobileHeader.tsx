"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import {
  BiHome,
  BiPhone,
  BiSolidUser,
  BiUser,
  BiMenu,
  BiX,
} from "react-icons/bi";
import { BsInfo, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { PiHeartThin } from "react-icons/pi";
import { categories, CategotyMenu } from "@/constant/home-data";

export default function MobileHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    queueMicrotask(() => {
      setIsMenuOpen(false);
    });
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Bottom tab items
  const navItems = [
    { name: "خانه", href: "/", icon: BiHome },
    { name: "درباره ما", href: "/about", icon: BsInfo },
    { name: "تماس با ما", href: "/contact", icon: BiPhone },
    { name: "حساب کاربری", href: "/profile", icon: BiSolidUser },
  ];

  return (
    <header>
      {/* ===== TOP HEADER (fixed) ===== */}
      <section className='fixed top-0 left-0 w-full z-50 bg-bone-white/80 backdrop-blur-md border-b border-earth-brown/20 shadow-sm'>
        {/* Top bar with login and wishlist */}
        <div className='bg-espresso-clay text-bone-white text-xs px-5 py-1 flex justify-between'>
          <span>
            خوش آمدید |{" "}
            <Link href='/login' className='underline'>
              ورود
            </Link>
          </span>
          <div className='flex gap-4 text-[16px]'>
            <Link href='/wishlist' aria-label='علاقه‌مندی‌ها'>
              <PiHeartThin />
            </Link>
            <Link href='/account' aria-label='حساب کاربری'>
              <BiUser />
            </Link>
          </div>
        </div>

        {/* Logo + Search + Social + Menu */}
        <div className='flex items-center justify-between px-4 py-2'>
          <div className='flex items-center gap-3 flex-1 min-w-0'>
            {/* Logo */}
            <Link href='/' className='shrink-0'>
              <Image
                src='/asouda-logo.png'
                width={160}
                height={20}
                loading='eager'
                className='w-14 h-auto object-contain'
                alt='آسوده لوگو'
              />
            </Link>
            {/* Search Bar - flex-1 so it takes remaining space */}
            <div className='flex-1 min-w-0'>
              <SearchBar />
            </div>
          </div>

          {/* Right side: Instagram, WhatsApp, Menu */}
          <div className='flex items-center gap-3 shrink-0 mr-2'>
            <a
              href='https://instagram.com/yourpage'
              target='_blank'
              rel='noopener noreferrer'
              className='text-espresso-clay text-xl'
              aria-label='اینستاگرام'>
              <BsInstagram />
            </a>
            <a
              href='https://wa.me/93700000000'
              target='_blank'
              rel='noopener noreferrer'
              className='text-espresso-clay text-xl'
              aria-label='واتساپ'>
              <BsWhatsapp />
            </a>
            {/* Hamburger menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-espresso-clay text-2xl p-1 focus:outline-none focus:ring-2 focus:ring-earth-brown/50 rounded'
              aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}>
              {isMenuOpen ? <BiX /> : <BiMenu />}
            </button>
          </div>
        </div>
      </section>

      {/* ===== OVERLAY & DRAWER ===== */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden='true'
        />

        {/* Drawer - slides from right (RTL) or left? Since Persian is RTL, we slide from right */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-3/4 max-w-sm bg-bone-white shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role='navigation'
          aria-label='منوی اصلی'>
          <div className='flex flex-col h-full'>
            {/* Drawer header with close button */}
            <div className='flex items-center justify-between p-4 border-b border-espresso-clay/20'>
              <button
                onClick={() => setIsMenuOpen(false)}
                className='p-1 text-espresso-clay/70 hover:text-espresso-clay'
                aria-label='بستن منو'>
                <BiX size={28} />
              </button>
            </div>

            {/* Drawer links */}
            <nav className='flex-1 overflow-y-auto p-4'>
              <ul className='space-y-1'>
                {categories.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`px-4 flex gap-3 items-center py-3 rounded-lg text-base transition-all duration-200 ${
                          isActive
                            ? "font-medium opacity-100 border border-espresso-clay/20"
                            : "border-none"
                        }`}
                        onClick={() => setIsMenuOpen(false)}>
                        <Image
                          src={item.image}
                          alt={item.slug}
                          width={100}
                          height={100}
                          className='w-10 h-10 rounded-2xl'
                          />
                          <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Optional footer in drawer (e.g., version, social) */}
            <div className='p-4 border-t border-gray-100 text-xs text-gray-400'>
              <p>نسخه ۱.۰</p>
            </div>
          </div>
        </aside>
      </>

      {/* ===== BOTTOM TAB BAR ===== */}
      <section className='fixed bottom-0 left-0 w-full z-50 bg-bone-white/90 backdrop-blur-md border-t border-earth-brown/20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]'>
        <nav className='flex justify-around items-center max-w-7xl mx-auto'>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center
                  py-1.5 px-3 min-h-15 w-full
                  transition-all duration-200 ease-in-out
                  hover:bg-earth-brown/5 active:scale-95
                  relative
                  ${
                    isActive
                      ? "text-earth-brown font-medium bg-earth-brown/10"
                      : "text-earth-brown/70"
                  }
                `}
                aria-current={isActive ? "page" : undefined}>
                <Icon
                  size={22}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "scale-110 stroke-earth-brown"
                      : "stroke-earth-brown/50"
                  }`}
                />
                <span className='text-[10px] mt-0.5 leading-none'>
                  {item.name}
                </span>
                {isActive && (
                  <span className='absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-earth-brown rounded-full' />
                )}
              </Link>
            );
          })}
        </nav>
      </section>
    </header>
  );
}
