"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination } from "swiper/modules";

import ExploreBtn from "../common/ExploreBtn";
import Card from "../most-sells/Card";
import { MostSellProductType } from "@/types";

interface ProductSliderProps {
  title: string;
  description?: string;
  products: MostSellProductType[];
  exploreTitle?: string;
  onExplore?: () => void;
}

export default function ProductSlider({
  title,
  description,
  products,
  exploreTitle,
  onExplore,
}: ProductSliderProps) {
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const toggleLike = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <section className='py-6 md:py-12'>
      <div className='container mx-auto px-0 lg:px-6'>
        {/* Header */}
        <div className='flex justify-between md:mb-12 mb-6 gap-4 px-4 lg:px-0'>
          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <span className='md:h-8 h-5 md:w-1.5 w-0.5 rounded-full bg-linear-to-b from-espresso-clay to-earth-brown' />
              <h2 className='text-xl font-bold tracking-tight md:text-4xl'>
                {title}
              </h2>
            </div>
            {description && (
              <p className='pr-4 text-base md:text-sm text-[11px] text-espresso-clay/80'>
                {description}
              </p>
            )}
          </div>
          <div>
            {exploreTitle && (
              <ExploreBtn title={exploreTitle} onClick={onExplore} />
            )}
          </div>
        </div>

        {/* Swiper Slider */}
        <div className='relative'>
          <Swiper
            modules={[Pagination]}
            spaceBetween={8}
            slidesPerView={2}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} custom-bullet"></span>`;
              },
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}>
            {products.map((product) => {
              const hasDiscount = product.discount > 0;
              const discountedPrice = hasDiscount
                ? Math.round(product.price * (1 - product.discount / 100))
                : product.price;

              return (
                <SwiperSlide key={product._id} className="pb-14">
                  <Card
                    product={product}
                    isLiked={likedProducts.includes(product._id)}
                    discountedPrice={discountedPrice}
                    hasDiscount={hasDiscount}
                    toggleLike={toggleLike}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
