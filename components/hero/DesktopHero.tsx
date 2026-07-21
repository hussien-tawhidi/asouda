"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { BiStar } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

// تابع ساده برای کلاس‌های شرطی
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface HeroCollageProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string | undefined;
  subtitle: string;
  stats?: { value: string; label: string; icon?: React.ReactNode }[];
  images: string[];
  ctaText?: string;
  ctaLink?: string;
}

const HeroCollage = React.forwardRef<HTMLDivElement, HeroCollageProps>(
  (
    {
      className,
      title,
      subtitle,
      images,
      ctaText = "خرید کنید",
      ctaLink = "/products",
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
  ) => {
    const [startIndex, setStartIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // اسکرول افکت‌ها
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"],
    });
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    // چرخش خودکار تصاویر با تاخیر بیشتر
    useEffect(() => {
      const interval = setInterval(() => {
        setStartIndex((prev) => (prev + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }, [images.length]);

    // چرخش تصاویر
    const displayImages = Array.from({ length: 7 }, (_, i) => {
      return images[(startIndex + i) % images.length];
    });

    // موقعیت‌های تصاویر با مقادیر بهبودیافته
    const positions = [
      "left-1/2 top-1/2 w-[280px] md:w-[340px] -translate-x-1/2 -translate-y-1/2 z-20",
      "left-[15%] md:left-[20%] top-[10%] md:top-[12%] w-40 md:w-52",
      "right-[18%] md:right-[22%] top-[8%] md:top-[10%] w-36 md:w-48",
      "right-[15%] md:right-[18%] bottom-[10%] md:bottom-[12%] w-44 md:w-56",
      "right-[5%] top-1/2 -translate-y-[60%] w-40 md:w-52",
      "left-[12%] md:left-[15%] bottom-[6%] md:bottom-[8%] w-44 md:w-56",
      "left-[3%] md:left-[5%] top-[20%] md:top-[25%] w-36 md:w-48",
    ];

    // تاخیرهای متفاوت برای انیمیشن float
    const delays = [0, 0.2, 0.5, 0.8, 1.1, 1.4, 1.7];

    return (
      <section
        ref={containerRef}
        className={cn(
          "relative w-full md:block hidden min-h-screen overflow-hidden md:mt-0 mt-10",
          className,
        )}
        {...props}>
        {/* دایره‌های تزئینی پس‌زمینه */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -right-40 w-96 h-96 bg-white rounded-full blur-3xl' />
          <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-3xl' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-earth-brown/5 rounded-full blur-2xl' />
        </div>

        <motion.div
          style={{ opacity, scale }}
          className='relative z-10 container mx-auto md:px-4 py-16 md:py-24 lg:py-32'>
          {/* گالری تصاویر شناور */}
          <div className='relative mt-8 md:mt-16 h-100 md:h-125 lg:h-150 flex items-center justify-center'>
            <div className='relative w-full max-w-6xl h-full'>
              {displayImages.map((img, i) => (
                <motion.div
                  key={`${img}-${i}`}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    y: [0, -12, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: i * 0.05 },
                    scale: { duration: 0.8, delay: i * 0.05 },
                    rotate: { duration: 0.8, delay: i * 0.05 },
                    y: {
                      duration: 6 + delays[i],
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: delays[i],
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    zIndex: 50,
                    transition: { duration: 0.3 },
                  }}
                  className={cn(
                    "absolute rounded-2xl shadow-2xl overflow-hidden border-2 border-white/50 backdrop-blur-sm",
                    positions[i],
                  )}
                  style={{
                    boxShadow: "0 20px 60px rgba(91, 76, 58, 0.15)",
                  }}>
                  <Image
                    src={img}
                    alt={`Hero ${i + 1}`}
                    width={400}
                    height={500}
                    className='w-full h-full object-cover'
                    priority={i < 3}
                  />
                  {/* افکت شیشه‌ای روی تصاویر */}
                  <div className='absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none' />
                </motion.div>
              ))}
            </div>
          </div>
          {/* محتوای متنی */}
          <div className='text-center max-w-4xl mx-auto md:space-y-6 md:mt-20 mt-10 space-y-3'>
            {/* نشان کوچک */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='inline-flex items-center gap-2 px-4 py-1.5 bg-earth-brown/10 rounded-full text-sm font-medium'>
              <BiStar className='w-4 h-4 fill-earth-brown' />
              <span>تولیدکننده‌ی برتر سرویس خواب</span>
            </motion.div>

            {/* عنوان اصلی */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className='text-2xl md:text-6xl lg:text-7xl font-display font-bold leading-tight '>
              {title}
            </motion.h1>

            {/* زیرنویس */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className='text-sm md:text-xl max-w-2xl mx-auto leading-relaxed'>
              {subtitle}
            </motion.p>

            {/* دکمه CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}>
              <Link
                href={ctaLink}
                className='inline-flex items-center gap-3 md:px-8 px-4 md:py-4 py-2 md:text-md text-sm bg-earth-brown text-bone-white rounded-full hover:bg-earth-brown/90 hover:shadow-xl hover:shadow-earth-brown/20 transition-all duration-300 active:scale-95 font-medium'>
                {ctaText}
                <BsArrowRight className='w-5 h-5' />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  },
);

HeroCollage.displayName = "HeroCollage";

export { HeroCollage };
