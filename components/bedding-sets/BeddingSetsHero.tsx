"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, MessageCircle, Sparkles } from "lucide-react";

export default function BeddingSetsHero() {
  return (
    <section dir='rtl' className='relative overflow-hidden bg-[#f7f3eb]'>
      {/* Background decorations */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute -right-40 -top-40 h-105 w-105 rounded-full bg-[#ded1b4]/30 blur-3xl' />
        <div className='absolute -bottom-40 -left-40 h-105 w-105 rounded-full bg-earth-brown/10 blur-3xl' />

        <div className='absolute right-[8%] top-[18%] h-2 w-2 rounded-full bg-earth-brown/40' />
        <div className='absolute left-[12%] top-[30%] h-3 w-3 rounded-full bg-[#ded1b4]' />
      </div>

      <div className='container relative mx-auto px-5 py-10 sm:px-8 md:py-16 lg:py-24'>
        <div className='grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20'>
          {/* Content */}
          <div className='order-2 text-right lg:order-1'>
            {/* Badge */}
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-earth-brown/15 bg-white/70 px-4 py-2 text-sm font-medium text-[#6d5843] shadow-sm backdrop-blur-md'>
              <Sparkles className='h-4 w-4 text-[#a17d4f]' />
              ویژه جهیزیه عروس
            </div>

            {/* Heading */}
            <h1 className='max-w-2xl text-4xl font-black leading-[1.35] tracking-tight text-[#3f352c] sm:text-5xl md:text-6xl lg:text-[4.2rem]'>
              اتاق خوابی که
              <br />
              <span className='relative inline-block text-earth-brown'>
                رؤیای شماست
                <span className='absolute -bottom-1 right-0 h-1 w-2/3 rounded-full bg-[#ded1b4]' />
              </span>
            </h1>

            <p className='mt-6 max-w-xl text-base leading-8 text-[#75685c] sm:text-lg'>
              مجموعه‌ای از سرویس خواب‌های شیک و باکیفیت آسوده؛ طراحی‌شده برای
              زوج‌هایی که می‌خواهند شروع زندگی‌شان زیباتر و آرام‌تر باشد.
            </p>

            {/* Benefits */}
            <div className='mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {[
                "تولید مستقیم کارخانه",
                "طراحی مدرن و لوکس",
                "کیفیت ساخت بالا",
                "مناسب جهیزیه عروس",
              ].map((item) => (
                <div
                  key={item}
                  className='flex items-center gap-2 text-sm text-[#62564c]'>
                  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-earth-brown/10'>
                    <Check className='h-3.5 w-3.5 text-earth-brown' />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className='mt-9 flex flex-col gap-3 sm:flex-row'>
              <Link
                href='/products/bedding-sets'
                className='group inline-flex items-center justify-center gap-3 rounded-2xl bg-espresso-clay px-7 py-4 text-base font-bold text-white shadow-xl shadow-espresso-clay/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#493c2e] hover:shadow-2xl'>
                مشاهده سرویس خواب‌ها
                <ArrowLeft className='h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1' />
              </Link>

              <Link
                href='/contact'
                className='inline-flex items-center justify-center gap-2 rounded-2xl border border-earth-brown/20 bg-white/80 px-7 py-4 text-base font-bold text-espresso-clay shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-earth-brown/40 hover:bg-white'>
                <MessageCircle className='h-5 w-5' />
                مشاوره رایگان
              </Link>
            </div>

            {/* Trust */}
            <div className='mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-earth-brown/10 pt-6'>
              <div>
                <p className='md:text-xl text-sm font-black text-espresso-clay'>ASOUDA</p>
                <p className='text-xs text-earth-brown'>تولید مستقیم</p>
              </div>

              <div className='h-8 w-px bg-earth-brown/15' />

              <div className='text-sm text-[#75685c]'>
                <span className='font-bold text-espresso-clay'>کیفیت</span> که دیده
                می‌شود
              </div>

              <div className='text-sm text-[#75685c]'>
                <span className='font-bold text-espresso-clay'>طراحی</span> که
                ماندگار است
              </div>
            </div>
          </div>

          {/* Image */}
          <div className='order-1 lg:order-2'>
            <div className='relative mx-auto max-w-155'>
              {/* Main image container */}
              <div className='relative aspect-[4/4.3] overflow-hidden rounded-[2.5rem] bg-[#e8dfd1] shadow-2xl shadow-espresso-clay/15'>
                <Image
                  src='/bedding-sets.png'
                  alt='سرویس خواب لوکس آسوده'
                  fill
                  priority
                  className='object-cover transition-transform duration-700 hover:scale-[1.03]'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />

                {/* Image overlay */}
                <div className='absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent' />

                {/* Image label */}
                <div className='absolute bottom-5 right-5 left-5 flex items-end justify-between'>
                  <div className='rounded-2xl border border-white/30 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl'>
                    <p className='text-xs text-[#75685c]'>مجموعه سرویس خواب</p>
                    <p className='mt-1 font-bold text-[#4b3e31]'>
                      آسوده | ASOUDA
                    </p>
                  </div>

                  <div className='rounded-full border border-white/30 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl'>
                    <Sparkles className='h-5 w-5 text-earth-brown' />
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className='absolute -bottom-5 -left-3 rounded-2xl border border-white/60 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-xl sm:-left-8'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#ded1b4]/40'>
                    <Check className='h-5 w-5 text-[#6d5843]' />
                  </div>

                  <div>
                    <p className='text-sm font-bold text-[#4b3e31]'>
                      تولید مستقیم
                    </p>
                    <p className='mt-0.5 text-xs text-earth-brown'>
                      قیمت مناسب کارخانه
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative circles */}
              <div className='absolute -right-8 -top-8 -z-10 h-32 w-32 rounded-full border border-earth-brown/15' />
              <div className='absolute -bottom-10 -right-10 -z-10 h-40 w-40 rounded-full bg-[#ded1b4]/30 blur-2xl' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
