"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { MostSellProductType } from "@/types";

interface ProductCardProps {
  product: MostSellProductType;
  isLiked: boolean;
  discountedPrice: number;
  hasDiscount: boolean;
  toggleLike: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Card({
  product,
  isLiked,
  discountedPrice,
  hasDiscount,
  toggleLike,
}: ProductCardProps) {
  console.log("🚀 ~ Card ~ hasDiscount:", hasDiscount);
  // console.log("🚀 ~ Card ~ hasDiscount:", product.discount,product.name,product.price,discountedPrice)
  return (
    <div
      dir='rtl'
      className='group overflow-hidden md:rounded-[28px] rounded text-right  shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl'>
      {/* Image */}
      <div className='relative md:p-4'>
        <div className='relative overflow-hidden md:rounded-3xl bg-white aspect-square'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className='object-cover transition duration-500 group-hover:scale-105'
          />

          {/* Wishlist */}
          <button
            onClick={(e) => toggleLike(product.id, e)}
            className='absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur'>
            <Heart
              size={18}
              className={
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-bone-white fill-none"
              }
            />
          </button>

          <div className='absolute right-0 left-0 bottom-0 bg-espresso-clay/60  flex items-center justify-center text-bone-white w-full py-1 text-xs'>
          ثبت سفارش
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='md:px-5 px-0 md:pb-5 pb-0'>
        <span className='md:text-xs text-[10px] text-espresso-clay/70'>
          {product.category}
        </span>

        <h3 className='md:mt-1 truncate md:text-lg text-xs font-semibold'>
          {product.name}
        </h3>

        <div className='md:mt-2 mt-1 flex items-center gap-1 md:text-sm text-[12px]'>
          <Star size={14} className='fill-yellow-400 text-yellow-400' />

          <span className=''>{product.rating}</span>

          <span className='text-gray-500'>({product.reviews})</span>
        </div>

        <div className='md:mt-3 mt-1 md:pt-3 pt-1 md:pb-0 pb-2 md:bg-transparent bg-espresso-clay md:text-espresso-clay text-bone-white flex md:items-end justify-between border-t border-espresso-clay/20'>
          <div className='flex md:flex-col gap-3 md:px-0 px-2 w-full justify-between'>
            {hasDiscount && (
              <p className='md:text-sm text-[10px] line-through'>
                {product.price.toLocaleString("fa-IR")}
              </p>
            )}

            <h2 className='md:text-2xl flex gap-1 text-sm font-bold'>
              {discountedPrice.toLocaleString("fa-IR")}
              <span className='md:text-xs text-[8px] font-light text-bone-white/70'>
                تومان
              </span>
            </h2>
          </div>
          <button className='rounded-xl border border-espresso-clay md:flex hidden px-5 py-2 text-sm font-semibold text-espresso-clay transition hover:bg-espresso-clay hover:text-white'>
            ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  );
}
