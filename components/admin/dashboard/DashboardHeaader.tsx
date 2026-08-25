"use client";
import { PlusCircle, StoreIcon } from "lucide-react";
import AdminDropDown from "./AdminDropDown";
import LinkButton from "@/components/common/LinkButton";

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
      <div className='flex items-center justify-center gap-3'>
        <AdminDropDown />
        <p className='text-2xl font-bold flex flex-col text-light-lavender md:text-3xl'>
          {title}
          <span className='mt-1 text-sm text-light-lavender/70'>
            {description}
          </span>
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        {showStoreButton && (
          <LinkButton title='فروشگاه' href='/' icon={StoreIcon} />
        )}

        {showCreateButton && (
          <LinkButton
            title=' ثبت محصول جدید'
            href='/dashboard/create-product'
            prem
            icon={PlusCircle}
            classVar='bg-light-lavender text-bg-dark border-light-lavender/30'
          />
        )}
      </div>
    </div>
  );
}
