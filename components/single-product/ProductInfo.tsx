"use client";

import { useState } from "react";
import { MostSellProductType } from "@/types";
import {
  Check,
  Heart,
  Info,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

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
      <div className='flex md:items-start justify-between gap-4'>
        <div>
          <span className='inline-flex rounded-full bg-espresso-clay/10 px-3 py-1 md:text-xs text-[9px] font-medium text-espresso-clay'>
            {product.category}
          </span>

          <h1 className='mt-3 md:text-3xl text-lg font-bold leading-relaxed text-espresso-clay'>
            {product.name}
          </h1>

          {product.brand && (
            <p className='md:mt-2 md:text-sm text-[10px] text-espresso-clay/70'>
              برند:
              <span className='mr-1 font-semibold'>{product.brand}</span>
            </p>
          )}
        </div>

        <div className='flex gap-2'>
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
      <div className='bg-espresso-clay text-bone-white rounded mb-3'>
        <div className='rounded-3xl p-6 flex justify-between shadow-lg'>
          {hasDiscount && (
            <div className='mb-3 flex md:flex-row flex-col items-center gap-3'>
              <span className='rounded-full bg-warm-putty text-espresso-clay md:text-sm text-[9px] md:px-3 px-1.5 py-1 font-bold'>
                %{product.discount} تخفیف
              </span>

              <span className='line-through opacity-80'>
                {product.price.toLocaleString("fa-IR")}
              </span>
            </div>
          )}

          <div className='md:text-4xl text-lg font-bold flex gap-2'>
            {discountedPrice.toLocaleString("fa-IR")}
            <span className='mt-1 text-sm opacity-80'>تومان</span>
          </div>
        </div>

        {/* CTA */}
        <button className='flex w-full items-center justify-center gap-3 border-t border-bone-white/50 py-4 text-lg font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]'>
          ثبت سفارش
        </button>
      </div>

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
