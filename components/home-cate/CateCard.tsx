"use client"

import { homeCategoryTypes } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function CateCard({item,big=false}:homeCategoryTypes) {
  return (
    <Link href={`/category/bed/${item.slug}`} className='block h-full'>
      <div
        className={`
        relative h-65 md:h-full w-full rounded-3xl overflow-hidden
        group cursor-pointer transition-all duration-500
        hover:-translate-y-1 hover:shadow-xl
        ${big ? "p-6 md:p-8" : "p-4 md:p-5"}
      `}>
        {/* Image */}
        <Image
          alt={item.name}
          width={300}
          height={300}
          src={item.image}
          className='absolute inset-0 w-full h-full object-cover 
          transition duration-700 group-hover:scale-110'
        />

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent' />

        {/* Content */}
        <div className='relative z-10 h-full flex flex-col justify-between text-right'>
          <div>
            <span className='text-[10px] md:text-[11px] text-bone-white bg-espresso-clay backdrop-blur-md px-3 py-1 rounded-full inline-block mb-2'>
              تا ۳۰٪ تخفیف
            </span>

            <h2
              className={`
              text-bone-white font-semibold leading-snug
              ${big ? "text-lg md:text-2xl" : "text-sm md:text-base"}
            `}>
              {item.name}
            </h2>
          </div>

          {/* CTA */}
          <div className='flex items-center justify-between'>
            <span className='text-xs text-bone-white group-hover:translate-x-1 transition'>
              مشاهده
            </span>

            <div
              className='w-8 h-8 flex items-center justify-center rounded-full 
              bg-mushroom-beige/50 backdrop-blur-md group-hover:bg-white/30 transition'>
              →
            </div>
          </div>
        </div>

        {/* Glow */}
        <div
          className='absolute inset-0 opacity-0 group-hover:opacity-100 transition 
          bg-linear-to-tr from-orange-400/10 via-transparent to-transparent'
        />
      </div>
    </Link>
  );
}

