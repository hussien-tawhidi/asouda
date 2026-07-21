"use client";

import { MostSellProductType } from "@/types";

interface ProductSpecificationsProps {
  product: MostSellProductType;
}

export default function ProductSpecifications({
  product,
}: ProductSpecificationsProps) {
  const specifications = [
    { label: "برند", value: product.brand },
    { label: "جنس", value: product.material },
    { label: "سایز", value: product.size },
    {
      label: "رنگ",
      value: product.colors?.map((c) => c.name).join("، "),
    },
    { label: "ابعاد", value: product.dimensions },
    { label: "وزن", value: product.weight },
    { label: "نوع فریم", value: product.frameType },
    { label: "سایز تخت", value: product.bedSize },
    {
      label: "نیاز به مونتاژ",
      value:
        product.assemblyRequired === undefined
          ? undefined
          : product.assemblyRequired
            ? "دارد"
            : "ندارد",
    },
    { label: "گارانتی", value: product.warranty },
  ].filter((item) => item.value);

  return (
    <section className='mt-14'>
      <h2 className='mb-6 md:text-2xl text-lg font-bold text-espresso-clay'>
        مشخصات محصول
      </h2>

      <div className='overflow-hidden'>
        {specifications.map((item, index) => (
          <div
            key={item.label}
            className={`grid grid-cols-2 md:text-sm text-[11px] items-center px-6 py-4 ${
              index !== specifications.length - 1
                ? "border-b border-espresso-clay/20"
                : ""
            }`}>
            <span className='font-medium text-espresso-clay/70'>
              {item.label}
            </span>

            <span className='text-right font-semibold text-espresso-clay'>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
