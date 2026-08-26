import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function AccessDeniedPage() {
  return (
    <main className='flex min-h-screen items-center justify-center px-5'>
      <div className='w-full max-w-md rounded-3xl p-8 text-center shadow-xl'>
        <div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50'>
          <ShieldX className='h-8 w-8 text-red-500' />
        </div>

        <h1 className='text-2xl font-bold'>دسترسی غیرمجاز</h1>

        <p className='mt-4 leading-8 text-gray-500'>
          شما با موفقیت وارد حساب کاربری خود شده‌اید، اما حساب شما دسترسی لازم
          برای ورود به پنل مدیریت را ندارد.
        </p>

        <p className='mt-2 text-sm text-gray-400'>
          اگر فکر می‌کنید این یک اشتباه است، لطفاً با مدیریت تماس بگیرید.
        </p>

        <div className='mt-7 flex gap-3'>
          <Link
            href='/'
            className='flex-1 rounded-xl border border-gray-200 py-3 font-medium transition hover:bg-gray-50'>
            بازگشت به فروشگاه
          </Link>

          <Link
            href='/account'
            className='flex-1 rounded-xl bg-espresso-clay py-3 font-semibold text-white transition hover:opacity-90'>
            حساب کاربری
          </Link>
        </div>
      </div>
    </main>
  );
}
