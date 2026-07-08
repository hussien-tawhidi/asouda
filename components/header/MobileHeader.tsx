"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { BiHome, BiPhone, BiSolidUser } from "react-icons/bi";
import { BsInfo, BsInstagram, BsWhatsapp } from "react-icons/bs";

export default function MobileHeader() {
  const pathname = usePathname(); // برای تشخیص صفحه‌ی فعال

  // لیست آیتم‌های منوی پایین
  const navItems = [
    { name: "خانه", href: "/", icon: BiHome },
    { name: "درباره ما", href: "/about", icon: BsInfo },
    { name: "تماس با ما", href: "/contact", icon: BiPhone },
    { name: "حساب کاربری", href: "/profile", icon: BiSolidUser },
  ];

  return (
    <header>
      {/* ===== هدر بالایی (ثابت) ===== */}
      <section className='fixed top-0 left-0 w-full z-50 bg-bone-white/80 backdrop-blur-md border-b border-earth-brown/20 shadow-sm'>
        <div className='flex items-center justify-between px-6'>
          <div className='flex items-center p-2 gap-4'>
            {/* لوگو - با سایز مناسب */}
            <Link href='/' className=''>
              <Image
                src='/asouda-logo.png'
                width={160}
                loading='eager'
                height={20}
                className='object-fit w-14'
                alt='آسوده لوگو'
              />
            </Link>
            {/* نوار جستجو - کشیده شود */}
            <div className=' min-w-0'>
              <SearchBar />
            </div>
          </div>
          <div className='flex items-center gap-6'>
            {/* Instagram */}
            <a
              href='https://instagram.com/yourpage'
              target='_blank'
              rel='noopener noreferrer'
              className='text-espresso-clay text-xl'>
              <BsInstagram />
            </a>

            {/* WhatsApp */}
            <a
              href='https://wa.me/93700000000'
              target='_blank'
              rel='noopener noreferrer'
              className='text-espresso-clay text-xl'>
              <BsWhatsapp />
            </a>
          </div>
        </div>
      </section>
      {/* ===== منوی پایین (Tab Bar) ===== */}
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
                {/* نشانگر فعال - یک نقطه یا خط زیر */}
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
