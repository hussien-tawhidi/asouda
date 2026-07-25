import Link from "next/link";
import { ChevronRight, PackagePlus } from "lucide-react";

import CreateForm from "@/components/admin/create-product/CreateForm";

export default function CreateProductPage() {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8'>
      {/* Breadcrumb */}
      <div className='mb-6 flex items-center gap-2 text-sm text-gray-500'>
        <Link href='/dashboard' className='transition hover:text-espresso-clay'>
          داشبورد
        </Link>

        <ChevronRight size={16} />

        <span className='font-medium text-gray-700'>ثبت محصول جدید</span>
      </div>

      {/* Header */}
      <div className='mb-8 flex items-start justify-between border-b border-gray-200 pb-6'>
        <div className='flex items-start gap-4'>
          <div className='rounded-2xl bg-espresso-clay/10 p-3 text-espresso-clay'>
            <PackagePlus size={28} />
          </div>

          <div>
            <h1 className='text-3xl font-bold text-espresso-clay'>
              ثبت محصول جدید
            </h1>

            <p className='mt-2 text-sm text-gray-500'>
              اطلاعات محصول را تکمیل کنید و تصاویر آن را بارگذاری نمایید.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8'>
        <CreateForm />
      </div>
    </div>
  );
}
