"use client";

import { categories } from "@/constant/home-data";
import CateCard from "./CateCard";
import CateMobile from "./CateMobile";

export default function BedBento() {
  return (
    <div className='py-16 md:py-20'>
      {/* Header */}
      <div className='px-10 md:px-6 mb-10 md:mb-14 text-right mx-auto'>
        <h1 className='text-2xl md:text-4xl font-semibold text-[#2b2b2b]'>
          مجموعه سرویس خواب
        </h1>
        <p className='text-[#6e6e73] mt-2 md:mt-3 text-xs md:text-sm leading-relaxed'>
          ترکیبی از زیبایی، آرامش و کیفیت برای خلق فضایی لوکس
        </p>
      </div>

      {/* 📱 MOBILE: Horizontal Scroll */}
      <CateMobile />

      {/* 💻 DESKTOP: Bento Grid */}
      <div className='hidden md:grid grid-cols-4 gap-6 auto-rows-57.5 px-6'>
        {categories[0] && <CateCard item={categories[0]} />}
        {categories[1] && (
          <div className='col-span-2 row-span-2'>
            <CateCard item={categories[1]} big />
          </div>
        )}
        {categories[2] && <CateCard item={categories[2]} />}
        {categories[3] && <CateCard item={categories[3]} />}
        {categories[4] && <CateCard item={categories[4]} />}
      </div>
    </div>
  );
}
