"use client";

import { Heart, Share2 } from "lucide-react";

interface ProductHeaderProps {
  name: string;
  category: string;
  brand?: string;
  discount?: number;
}

export default function ProductHeader({
  name,
  category,
  brand,
  discount = 0,
}: ProductHeaderProps) {
  const hasDiscount = discount > 0;

  return (
    <div className='flex flex-col md:flex-row md:items-start justify-between gap-4'>
      {/* LEFT CONTENT */}
      <div className='space-y-2'>
        {/* Category + Discount */}
        <div className='flex flex-wrap items-center gap-5 md:justify-start mb-5 justify-between'>
          {/* Category */}
          <span className='inline-flex rounded-full bg-espresso-clay/10 px-3 py-1 text-[9px] md:text-xs font-medium text-espresso-clay'>
            {category}
          </span>

          {/* Discount */}
          {hasDiscount && (
            <div className='group relative inline-flex items-center'>
              {/* Glow */}
              <div className='absolute -inset-1 rounded-full bg-linear-to-r from-red-500 to-orange-400 opacity-70 blur-sm transition duration-300 group-hover:opacity-100' />

              {/* Badge */}
              <div className='relative flex items-center gap-1 rounded-full bg-linear-to-r from-red-500 to-orange-400 px-3 py-1 text-[10px] md:text-xs font-bold text-white shadow-lg'>
                <span className='text-xs md:text-base'>🔥</span>
                {discount}% تخفیف ویژه
              </div>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h1 className='text-lg md:text-3xl font-bold leading-relaxed text-espresso-clay'>
          {name}
        </h1>

        {/* Brand */}
        {brand && (
          <p className='text-[10px] md:text-sm text-espresso-clay/70'>
            برند:
            <span className='mr-1 font-semibold'>{brand}</span>
          </p>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className='hidden md:flex gap-2'>
        <button className='rounded-xl border border-gray-200 p-2.5 transition-all hover:border-espresso-clay hover:bg-espresso-clay/5 hover:text-espresso-clay'>
          <Heart size={18} />
        </button>

        <button className='rounded-xl border border-gray-200 p-2.5 transition-all hover:border-espresso-clay hover:bg-espresso-clay/5 hover:text-espresso-clay'>
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}
