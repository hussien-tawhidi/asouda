"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className='relative h-[80vh] min-h-150 overflow-hidden'>
      {/* Banner */}
      <Image
        src='/images/home-about.jpg'
        alt='درباره آسوده'
        fill
        priority
        className='object-cover'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-linear-to-b from-black/65 via-black/45 to-black/70' />

      {/* Content */}
      <div className='relative z-10 flex h-full items-center justify-center'>
        <div className='mx-auto max-w-6xl px-6 text-center text-bone-white'>
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-semibold backdrop-blur-md'>
           درباره تولید کننده سرویس خواب آسوده
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className='mt-5 text-4xl font-bold md:text-6xl'>
            داستان{" "}
            <span className='bg-linear-to-r from-earth-brown to-bone-white bg-clip-text text-transparent'>
              آسوده
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-bone-white'>
            آسوده با تکیه بر دانش، تجربه و عشق به هنر تولید، فعالیت خود را در
            زمینه طراحی و ساخت انواع سرویس خواب آغاز کرده است.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className='mt-10 flex flex-wrap justify-center gap-4'>
            <Link
              href='/products'
              className='group inline-flex items-center gap-2 rounded-full bg-bone-white px-8 py-3 font-medium text-espresso-clay transition hover:scale-105'>
              مشاهده محصولات
              <ChevronRight
                size={18}
                className='transition-transform group-hover:translate-x-1'
              />
            </Link>

            <Link
              href='/contact'
              className='rounded-full border border-bone-white/30 px-8 py-3 font-medium backdrop-blur transition hover:bg-white/10'>
              تماس با ما
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className='absolute bottom-8 left-1/2 -translate-x-1/2'>
            <div className='flex flex-col items-center gap-2'>
              <span className='text-xs text-bone-white/70'>اسکرول کنید</span>

              <div className='h-10 w-px bg-bone-white/40' />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
