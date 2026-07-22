"use client";

import Image from "next/image";
import Link from "next/link";
import { BiX } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { PiHeartThin, PiShoppingCartThin } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  name: string;
  slug: string;
  href: string;
  image: string;
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
}

export default function MobileMenuDrawer({
  open,
  onClose,
  categories,
}: MobileDrawerProps) {
  const pathname = usePathname();

  // Quick access links
  const quickLinks = [
    { name: "حساب کاربری", href: "/profile", icon: HiOutlineUser },
    { name: "علاقه‌مندی‌ها", href: "/wishlist", icon: PiHeartThin },
    { name: "سبد خرید", href: "/cart", icon: PiShoppingCartThin },
  ];

  return (
    <>
      {/* Backdrop with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 z-100 bg-black/50 backdrop-blur-sm'
            aria-hidden='true'
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: open ? "0%" : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className='fixed inset-y-0 right-0 z-9999 w-[85%] max-w-sm bg-bone-white/95 backdrop-blur-md shadow-2xl flex flex-col'
        role='dialog'
        aria-modal='true'
        aria-label='منوی اصلی'>
        <div className='flex h-screen flex-col'>
          {/* ===== HEADER ===== */}
          <div className='flex items-center justify-between border-b border-espresso-clay/20 px-5 py-4'>
            <Link href={"/"} className='flex items-center gap-2.5'>
              <div className='relative'>
                <Image
                  src='/asouda-logo.png'
                  alt='آسوده'
                  width={36}
                  height={36}
                  className='h-full w-full object-cover p-1'
                />
              </div>
              <div>
                <span className='text-lg font-bold'>راحتی</span>
                <p className='text-[10px] text-espresso-clay/80 font-medium leading-none'>
                  که ماندگار است
                </p>
              </div>
            </Link>

            <button
              onClick={onClose}
              className='group p-2 transition'
              aria-label='بستن منو'>
              <BiX
                size={24}
                className='text-gray-600 transition group-hover:rotate-90'
              />
            </button>
          </div>

          {/* ===== QUICK ACTION LINKS ===== */}
          <div className='border-b border-espresso-clay/20 px-5 py-3'>
            <div className='flex justify-around'>
              {quickLinks.map(({ name, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all ${
                      isActive ? "bg-warm-putty/50" : ""
                    }`}>
                    <Icon
                      size={20}
                      className={isActive ? "fill-primary" : ""}
                    />
                    <span className='text-[10px] font-medium'>{name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ===== CATEGORIES ===== */}
          <nav className='flex-1 overflow-y-auto px-3 py-4'>
            <p className='mb-3 px-2 text-xs font-semibold uppercase tracking-wider'>
              دسته‌بندی‌ها
            </p>
            <ul className='space-y-1.5'>
              {categories.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-200 ${
                        isActive ? "bg-warm-putty/50 shadow-sm" : ""
                      }`}>
                      <div
                        className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                          isActive ? "ring-2 ring-primary/30" : ""
                        }`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={56}
                          height={56}
                          className='h-full w-full object-cover'
                        />
                      </div>

                      <div className='flex flex-1 flex-col'>
                        <span
                          className={`font-medium text-sm ${
                            isActive ? "" : "text-espresso-clay/90"
                          }`}>
                          {item.name}
                        </span>
                        <span className='text-[10px] text-espresso-clay/70'>
                          {isActive ? "همین حالا ببینید" : "مشاهده محصولات"}
                        </span>
                      </div>

                      {isActive && (
                        <span className='h-2 w-2 rounded-full bg-espresso-clay' />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ===== FOOTER ===== */}
          <div className='border-t border-espresso-clay/20 bg-bone-white/50 px-5 py-4'>
            <div className='flex items-center justify-between'>
              {/* Social Links */}
              <div className='flex items-center gap-3'>
                <a
                  href='https://instagram.com/yourpage'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-lg p-1.5 text-espresso-clay/70 transition hover:bg-primary/10 hover:text-primary'
                  aria-label='اینستاگرام'>
                  <BsInstagram size={20} />
                </a>
                <a
                  href='https://wa.me/93700000000'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-lg p-1.5 text-espresso-clay/70 transition hover:bg-primary/10 hover:text-primary'
                  aria-label='واتساپ'>
                  <BsWhatsapp size={20} />
                </a>
              </div>

              {/* Brand info */}
              <div className='text-right'>
                <p className='text-xs font-medium text-espresso-clay'>آسوده</p>
                <p className='text-[10px] text-espresso-clay/80'>
                  تولید کننده سرویس خواب
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
