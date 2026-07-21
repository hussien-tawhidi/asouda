"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ChevronLeft, Info } from "lucide-react";
import { mostSellsProduct } from "@/constant/home-data";
import ProductGallery from "@/components/single-product/ProductGallery";
import ProductInfo from "@/components/single-product/ProductInfo";
import ProductSpecifications from "@/components/single-product/ProductSpecifications";
import ProductSlider from "@/components/common/ProductSlider";

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  const product = mostSellsProduct.find(
    (item) => item._id.toString() === productId,
  );

  if (!product) {
    notFound();
  }

  return (
    <div className='container w-[90%] overflow-hidden mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <nav className='mb-8 flex items-center md:gap-2 gap-1 md:text-sm text-[10px] text-nowrap text-espresso-clay/70'>
        <Link href='/'>خانه</Link>
        <ChevronLeft size={16} />
        <Link href={`/category/${product.category}`}>{product.category}</Link>
        <ChevronLeft size={16} />
        <span className='text-espresso-clay'>{product.name}</span>
      </nav>

      <div className='grid gap-10 lg:grid-cols-2'>
        <ProductGallery images={product.image} />
        <ProductInfo product={product} />
      </div>

      {/* Specifications */}
      {/* Return Policy */}
      <div className='flex gap-3 rounded-2xl bg-espresso-clay/10 p-4 mt-5'>
        <Info className='mt-0.5 h-5 w-5 shrink-0' />

        <p className='md:text-sm text-xs leading-7'>
          درخواست مرجوع کردن کالا با دلیل{" "}
          <span className='font-bold'>انصراف از خرید</span> تنها در صورتی قابل
          تایید است که کالا در شرایط اولیه باشد.
        </p>
      </div>
      <ProductSpecifications product={product} />

      {/* Description */}

      <section className='mt-14'>
        <h2 className='mb-5 md:text-2xl font-bold'>توضیحات محصول</h2>

        <p className='leading-8 md:text-sm text-[11px] text-espresso-clay/80'>
          این تشک با استفاده از بهترین متریال تولید شده و برای خواب راحت، کاهش
          فشار بر ستون فقرات و افزایش کیفیت استراحت طراحی شده است. پارچه ضد
          حساسیت، اسفنج باکیفیت و دوام بالا از ویژگی‌های اصلی این محصول هستند.
        </p>
      </section>
      <ProductSlider products={mostSellsProduct} title='محصولات مشابه' />
    </div>
  );
}
