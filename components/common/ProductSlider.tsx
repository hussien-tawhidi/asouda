"use client";

import { useRef, useState } from "react";
import Slider from "react-slick";
import ExploreBtn from "../common/ExploreBtn";
import Card from "../most-sells/Card";
import { MostSellProductType } from "@/types";

interface ProductSliderProps {
  title: string;
  description?: string;
  products: MostSellProductType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sliderSettings: any;
  exploreTitle?: string;
  onExplore?: () => void;
}

export default function ProductSlider({
  title,
  description,
  products,
  sliderSettings,
  exploreTitle,
  onExplore,
}: ProductSliderProps) {
  const sliderRef = useRef<Slider | null>(null);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();

    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <section className='py-6 md:py-24'>
      <div className='container mx-auto px-0 lg:px-6'>
        {/* Header */}
        <div className='flex  justify-between md:mb-12 mb-6 gap-4'>
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

        {/* Slider */}
        <Slider
          ref={sliderRef}
          {...sliderSettings}
          className='most-sell-slider'>
          {products.map((product) => {
            const hasDiscount = product.discount > 0;
            const discountedPrice = hasDiscount
              ? Math.round(product.price * (1 - product.discount / 100))
              : product.price;

            return (
              <div key={product.id} className='h-full px-1 pb-5 md:pb-10'>
                <Card
                  product={product}
                  isLiked={likedProducts.includes(product.id)}
                  discountedPrice={discountedPrice}
                  hasDiscount={hasDiscount}
                  toggleLike={toggleLike}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
