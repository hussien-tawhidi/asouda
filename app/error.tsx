"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-[70vh] items-center justify-center px-4'>
      <div className='w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl'>
        {/* Icon */}
        <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50'>
          <AlertTriangle className='h-10 w-10 text-red-500' />
        </div>

        {/* Title */}
        <h1 className='mt-6 text-2xl font-extrabold text-gray-900'>
          مشکلی پیش آمده است
        </h1>

        {/* Description */}
        <p className='mt-3 leading-8 text-gray-600'>
          متأسفانه هنگام پردازش درخواست شما خطایی رخ داده است.
          <br />
          لطفاً چند دقیقه دیگر دوباره تلاش کنید. اگر مشکل همچنان ادامه داشت، با
          بخش پشتیبانی تماس بگیرید.
        </p>

        {/* Error ID */}
        {error.digest && (
          <div className='mt-5 rounded-xl bg-gray-50 p-3 text-sm text-gray-500'>
            شناسه خطا:
            <span className='mr-2 font-mono text-gray-700'>{error.digest}</span>
          </div>
        )}

        {/* Retry Button */}
        <button
          onClick={() => unstable_retry()}
          className='mt-8 inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-red-600 active:scale-95'>
          <RefreshCw size={18} />
          تلاش دوباره
        </button>

        {/* Footer */}
        <p className='mt-6 text-sm text-gray-400'>
          از شکیبایی شما سپاسگزاریم ❤️
        </p>
      </div>
    </div>
  );
}
