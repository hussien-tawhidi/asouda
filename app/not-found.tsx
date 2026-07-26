"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className='md:mb-0 md:mt-0 mt-20 mb-16'>
        <div className='flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center text-center px-6 py-10'>
            {/* تصویر */}
            <div className='mb-6 opacity-80'>
              <Image
                src='/not-found.png' // تصویر مشابه همینی که فرستادی بذار
                alt='یافت نشد'
                width={220}
                height={220}
                className='mx-auto md:w-[40%] w-[30%]'
              />
            </div>

            {/* عنوان */}
            <h1 className='text-xl font-bold text-espresso-clay mb-2'>
              نتیجه‌ای پیدا نشد 😕
            </h1>

            {/* توضیح */}
            <p className='text-sm text-earth-brown/70 mb-6 leading-relaxed max-w-xs'>
              متأسفانه چیزی مطابق جستجوی شما پیدا نکردیم. لطفاً عبارت دیگری
              امتحان کنید یا به صفحه اصلی برگردید.
            </p>

            {/* دکمه‌ها */}
            <div className='flex gap-3'>
              <Link
                href='/'
                className='px-5 py-2 rounded-full bg-earth-brown text-bone-white text-sm hover:bg-earth-brown/90 transition'>
                صفحه اصلی
              </Link>

              <Link
                href='/shop'
                className='px-5 py-2 rounded-full border border-earth-brown text-earth-brown text-sm hover:bg-earth-brown/10 transition'>
                مشاهده محصولات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
