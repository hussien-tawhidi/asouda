"use client";

import Link from "next/link";
import Image from "next/image";
import { Pencil, Eye } from "lucide-react";
import { MostSellProductType } from "@/types";
import DeleteProductButton from "./DeleteProduct";
import { Dispatch, SetStateAction } from "react";

interface ProductsGridProps {
  products: MostSellProductType[];
  loading?: boolean;
  setData: Dispatch<SetStateAction<MostSellProductType[]>>;
}

export default function ProductsGrid({
  products,
  loading = false,
  setData,
}: ProductsGridProps) {
  if (loading) {
    return (
      <div className='rounded-2xl p-6 shadow-sm'>
        <div className='flex items-center justify-between'>
          <div className='h-7 w-40 animate-pulse rounded bg-espresso-clay/10' />
          <div className='h-5 w-24 animate-pulse rounded bg-espresso-clay/10' />
        </div>
        <div className='mt-6 space-y-4'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='flex animate-pulse items-center gap-4 rounded-lg border border-gray-100 p-3'>
              <div className='h-12 w-12 rounded-lg bg-espresso-clay/10' />
              <div className='flex-1 space-y-2'>
                <div className='h-4 w-1/3 rounded bg-espresso-clay/10' />
                <div className='h-3 w-1/4 rounded bg-espresso-clay/10' />
              </div>
              <div className='h-8 w-16 rounded bg-espresso-clay/10' />
              <div className='flex gap-2'>
                <div className='h-8 w-8 rounded bg-espresso-clay/10' />
                <div className='h-8 w-8 rounded bg-espresso-clay/10' />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className='rounded-2xl border border-espresso-clay/10 p-6 shadow-sm'>
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <div className='mb-4 text-6xl'>🛏️</div>
          <h3 className='text-lg font-bold'>هیچ محصولی ثبت نشده است</h3>
          <p className='mt-1 text-sm text-espresso-clay/80'>
            اولین محصول خود را ثبت کنید تا در فروشگاه نمایش داده شود.
          </p>
          <Link
            href='/dashboard/create-product'
            className='mt-4 inline-flex items-center gap-2 rounded-xl bg-espresso-clay px-5 py-2.5 text-sm font-medium text-bone-white transition hover:opacity-90'>
            ثبت محصول جدید
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='rounded-2xl px-5 shadow-sm'>
      {/* Header */}
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <h2 className='text-lg font-semibold'>
          محصولات
          <span className='mr-2 text-sm font-normal text-espresso-clay/20'>
            ({products.length})
          </span>
        </h2>
      </div>

      {/* Table */}
      <div className='mt-4 px-5 overflow-x-auto'>
        <table className='w-full min-w-162.5 text-sm'>
          <thead>
            <tr className='border-b border-espresso-clay/50 text-right'>
              <th className='pb-3 pr-0 font-medium text-espresso-clay/90'>
                تصویر
              </th>
              <th className='pb-3 px-3 font-medium text-espresso-clay/90'>
                نام
              </th>
              <th className='pb-3 px-3 font-medium text-espresso-clay/90'>
                قیمت
              </th>
              <th className='pb-3 px-3 font-medium text-espresso-clay/90'>
                دسته
              </th>
              <th className='pb-3 px-3 font-medium text-espresso-clay/90 text-center'>
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const imageUrl =
                typeof product.image?.[0] === "string"
                  ? product.image[0]
                  : "/placeholder-product.jpg";
              return (
                <tr
                  key={product._id}
                  className='group border-b border-espresso-clay/20 transition hover:bg-gray-50 last:border-0'>
                  {/* Thumbnail */}
                  <td className='py-3 pr-0'>
                    <div className='relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200 bg-gray-100'>
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className='object-cover'
                        sizes='48px'
                      />
                    </div>
                  </td>

                  {/* Name with discount badge */}
                  <td className='py-3 px-3 font-medium text-gray-800'>
                    <div className='flex items-center gap-2'>
                      {product.name}
                      {product.discount > 0 && (
                        <span className='rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600'>
                          {product.discount}%
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Price */}
                  <td className='py-3 px-3 font-medium'>
                    {product.price.toLocaleString()} تومان
                  </td>

                  {/* Category */}
                  <td className='py-3 px-3 text-gray-600'>
                    {product.category}
                  </td>

                  {/* Actions */}
                  <td className='py-3 px-3'>
                    <div className='flex items-center justify-center gap-1'>
                      <Link
                        href={`/dashboard/${product._id}`}
                        className='rounded-lg p-2 text-blue-600 transition hover:bg-blue-50'
                        aria-label='ویرایش محصول'>
                        <Pencil size={16} />
                      </Link>
                      <Link
                        href={`/${product._id}`}
                        target='_blank'
                        className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100'
                        aria-label='مشاهده محصول در سایت'>
                        <Eye size={16} />
                      </Link>
                      <DeleteProductButton
                        productId={product._id.toString()}
                        setData={setData}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
