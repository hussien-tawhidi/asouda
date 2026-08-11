"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function ParallaxCTA() {
  return (
    <section className='relative py-20 overflow-hidden'>
      <div
        className='absolute inset-0 bg-fixed bg-cover bg-center'
        style={{
          backgroundImage: "url('/cta-bg.jpg')",
          transform: "scale(1.1)",
        }}
      />
      <div className='absolute inset-0 bg-espresso-clay/80 backdrop-blur-sm' />

      <div className='relative z-10 container mx-auto max-w-4xl px-4 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}>
          <h2 className='text-xl font-bold text-bone-white md:text-5xl'>
            آماده‌اید خانه‌تان را با <span className='font-black'>آسوده</span>{" "}
            بسازید؟
          </h2>
          <p className='mx-auto mt-4 max-w-2xl md:text-lg text-xs text-bone-white/80'>
            امروز با ما تماس بگیرید و محصولی متناسب با سلیقه و فضای منزل خود
            انتخاب کنید.
          </p>
          <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
            <Link
              href='/category/double-bedroom-set'
              className='group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-bone-white md:px-8 px-4 md:py-3 py-1.5 text-sm font-medium text-espresso-clay transition hover:shadow-lg hover:shadow-bone-white/20'>
              مشاهده محصولات
              <ChevronRight
                size={16}
                className='transition-transform duration-300 group-hover:translate-x-1'
              />
            </Link>
            <Link
              href='/contact'
              className='rounded-full border border-bone-white/30 md:px-8 px-3 md:py-3 py-1.5 text-sm font-medium text-bone-white transition hover:bg-bone-white/10'>
              تماس با ما
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
