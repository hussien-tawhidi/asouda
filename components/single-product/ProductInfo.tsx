"use client";

import { useState } from "react";
import { MostSellProductType } from "@/types";
import {
  Check,
  Heart,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import PriceCard from "./PriceCard";

interface ProductInfoProps {
  product: MostSellProductType;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount = product.discount > 0;

  const discountedPrice = hasDiscount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className='md:space-y-8 space-y-5'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-start justify-between gap-4'>
        <div className='space-y-2'>
          {/* Category + Discount Badge */}
          <div className='flex flex-wrap items-center gap-5 md:justify-start mb-5 justify-between'>
            <span className='inline-flex rounded-full bg-espresso-clay/10 px-3 py-1 text-[9px] font-medium text-espresso-clay md:text-xs'>
              {product.category}
            </span>

            {hasDiscount && (
              <div className='group relative inline-flex items-center'>
                {/* Glow effect */}
                <div className='absolute -inset-1 rounded-full bg-linear-to-r from-red-500 to-orange-400 opacity-70 blur-sm transition duration-300 group-hover:opacity-100' />
                {/* Badge content */}
                <div className='relative flex items-center gap-1 rounded-full bg-linear-to-r from-red-500 to-orange-400 px-3 py-1 md:text-xs text-[10px] font-bold text-white shadow-lg'>
                  <span className='md:text-base text-xs'>🔥</span>
                  {product.discount}% تخفیف ویژه
                </div>
              </div>
            )}
          </div>

          {/* Product name */}
          <h1 className='text-lg font-bold leading-relaxed text-espresso-clay md:text-3xl'>
            {product.name}
          </h1>

          {product.brand && (
            <p className='text-[10px] text-espresso-clay/70 md:text-sm'>
              برند: <span className='mr-1 font-semibold'>{product.brand}</span>
            </p>
          )}
        </div>

        {/* Action buttons (unchanged) */}
        <div className='md:flex hidden gap-2'>
          <button className='rounded-xl border border-gray-200 p-2.5 transition-all hover:border-espresso-clay hover:bg-espresso-clay/5 hover:text-espresso-clay'>
            <Heart size={18} />
          </button>
          <button className='rounded-xl border border-gray-200 p-2.5 transition-all hover:border-espresso-clay hover:bg-espresso-clay/5 hover:text-espresso-clay'>
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className='h-px bg-linear-to-r from-transparent via-espresso-clay/30 to-transparent' />

      {/* Rating */}
      <div className='flex flex-wrap items-center gap-4 text-sm'>
        <div className='flex items-center gap-1'>
          <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
          <span className='font-semibold'>{product.rating}</span>
        </div>

        <span className='h-4 w-px bg-espresso-clay/20' />

        <span className='text-espresso-clay/70'>{product.reviews} دیدگاه</span>

        <span className='h-4 w-px bg-espresso-clay/20' />

        <span className='text-espresso-clay/70'>{product.sold} فروش</span>
      </div>

      {/* Features */}
      {!!product.features?.length && (
        <div>
          <h3 className='mb-4 font-semibold text-espresso-clay'>
            ویژگی‌های محصول
          </h3>

          <div className='flex flex-wrap gap-3'>
            {product.features.map((feature) => (
              <div
                key={feature}
                className='flex items-center gap-2 rounded-full border border-espresso-clay/10 bg-espresso-clay/5 px-4 py-2 text-sm'>
                <Check className='h-4 w-4 text-green-600' />
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {!!product.colors?.length && (
        <div>
          <div className='mb-3 flex items-center gap-2'>
            <span className='font-medium'>رنگ:</span>

            <span className='text-sm text-espresso-clay/70'>
              {product.colors[selectedColor].name}
            </span>
          </div>

          <div className='flex flex-wrap gap-3'>
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                title={color.name}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                  selectedColor === index
                    ? "ring-2 ring-espresso-clay ring-offset-2"
                    : "hover:scale-110"
                }`}>
                <span
                  className='h-8 w-8 rounded-full border border-gray-300'
                  style={{ backgroundColor: color.value }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <PriceCard
        price={product.price}
        discount={product.discount}
        phone='+98 919 389 7119'
        whatsapp='+989030931288'
      />

      {/* Services */}
      <div className='grid md:grid-cols-4 grid-cols-2 gap-3 '>
        <div className='flex items-center gap-3 rounded-2xl border p-2'>
          <Truck className='text-espresso-clay' />
          <span className='text-xs'>ارسال سریع</span>
        </div>

        <div className='flex items-center gap-3 rounded-2xl border p-2'>
          <ShieldCheck className='text-espresso-clay' />
          <span className='text-xs'>ضمانت کیفیت</span>
        </div>

        <div className='flex items-center gap-3 rounded-2xl border p-2'>
          <PackageCheck className='text-espresso-clay' />
          <span className='text-xs'>بسته‌بندی ایمن</span>
        </div>

        <div className='flex items-center gap-3 rounded-2xl border p-2'>
          <Check className='text-green-600' />
          <span className='text-xs'>{product.warranty ?? "گارانتی معتبر"}</span>
        </div>
      </div>
    </div>
  );
}
