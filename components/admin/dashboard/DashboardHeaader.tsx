"use client";

import Link from "next/link";
import { PlusCircle, StoreIcon } from "lucide-react";
import AdminDropDown from "./AdminDropDown";

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  showStoreButton?: boolean;
  showCreateButton?: boolean;
}

export default function DashboardHeader({
  title = "👋 خوش آمدید!",
  description = "امروز چه کاری می‌خواهید انجام دهید؟",
  showStoreButton = true,
  showCreateButton = true,
}: DashboardHeaderProps) {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      <div className="flex items-center justify-center gap-3">
        <AdminDropDown />
        <p className='text-2xl font-bold flex flex-col text-gray-800 md:text-3xl'>
          {title}
          <span className='mt-1 text-sm text-gray-500'>{description}</span>
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        {showStoreButton && (
          <Link
            href='/'
            className='flex items-center gap-2 rounded-xl border border-espresso-clay/20 px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg'>
            <StoreIcon size={18} />
            صفحه فروشگاه
          </Link>
        )}

        {showCreateButton && (
          <Link
            href='/dashboard/create-product'
            className='flex items-center gap-2 rounded-xl bg-espresso-clay px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg'>
            <PlusCircle size={18} />
            ثبت محصول جدید
          </Link>
        )}
      </div>
    </div>
  );
}
