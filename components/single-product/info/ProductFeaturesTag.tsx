"use client";

import { Check } from "lucide-react";

interface ProductFeatureTagsProps {
  features?: string[];
  title?: string;
}

export default function ProductFeatureTags({
  features,
  title = "ویژگی‌های محصول",
}: ProductFeatureTagsProps) {
  if (!features?.length) return null;

  return (
    <div>
      {/* Title */}
      <h3 className='mb-4 font-semibold text-espresso-clay'>{title}</h3>

      {/* Tags */}
      <div className='flex flex-wrap gap-3'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='group flex items-center gap-2 rounded-full border border-espresso-clay/10 bg-espresso-clay/5 px-4 py-2 text-sm transition-all duration-200 hover:bg-espresso-clay/10 hover:-translate-y-0.5'>
            <Check className='h-4 w-4 text-green-600 transition-transform duration-200 group-hover:scale-110' />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
