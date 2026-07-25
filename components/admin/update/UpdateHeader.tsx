"use client"

import Link from "next/link";
import { ChevronLeft } from "lucide-react"; // or your icon library

export default function PageUpdateHeader({}) {
  // You can get productName from props/context if needed
  const productName = "محصول نمونه"; // dynamic

  return (
    <header className='border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 px-6 py-4'>
      <div className='flex items-center gap-4'>
        <Link
          href='/dashboard'
          className='group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-espresso-clay/50'
          aria-label='بازگشت به داشبورد'>
          <ChevronLeft
            size={18}
            className='transition-transform group-hover:-translate-x-1'
          />
          <span>بازگشت</span>
        </Link>

        <div className='h-6 w-px bg-gray-300' aria-hidden='true' />

        <div>
          <h1 className='text-2xl font-bold text-gray-800'>ویرایش محصول</h1>
          <p className='text-sm text-gray-500'>در حال ویرایش: {productName}</p>
        </div>
      </div>
    </header>
  );
}
