"use client";

import { useState } from "react";
import { MostSellProductType } from "@/types";
import { Star } from "lucide-react";
import PriceCard from "./PriceCard";
import ProductHeader from "./ProductHeader";
import ColorSelector from "./ColorSelect";
import ProductFeatures from "./ProductFeatures";
import ProductFeatureTags from "./ProductFeaturesTag";

interface ProductInfoProps {
  product: MostSellProductType;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className='md:space-y-8 space-y-5'>
      {/* Header */}
      <ProductHeader
        name={product.name}
        category={product.category}
        brand={product.brand}
        discount={product.discount}
      />

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
      <ProductFeatureTags features={product.features} />

      {/* Colors */}
      <ColorSelector
        colors={product.colors}
        selectedColor={selectedColor}
        onChange={setSelectedColor}
      />

      {/* Price */}
      <PriceCard
        price={product.price}
        discount={product.discount}
        phone='+98 919 389 7119'
        whatsapp='+989030931288'
      />

      {/* Services */}
      <ProductFeatures warranty={product.warranty} />
    </div>
  );
}
