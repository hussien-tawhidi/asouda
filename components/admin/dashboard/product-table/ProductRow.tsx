"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Eye } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { MostSellProductType } from "@/types";
import DeleteProductButton from "../DeleteProduct";

interface ProductRowProps {
  product: MostSellProductType;
  setData: Dispatch<SetStateAction<MostSellProductType[]>>;
}

export default function ProductRow({ product, setData }: ProductRowProps) {
  const imageUrl =
    typeof product.image?.[0] === "string"
      ? product.image[0]
      : "/placeholder-product.jpg";

  return (
    <tr
      className='
        group
        border-b
        border-light-lavender/30
        transition
        hover:bg-light-lavender/5
        last:border-0
      '>
      {/* Image */}
      <td className='py-3 pr-0'>
        <div className='relative h-12 w-12 overflow-hidden rounded-lg border border-light-lavender bg-light-lavender'>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className='object-cover'
            sizes='48px'
          />
        </div>
      </td>

      {/* Name */}
      <td className='px-3 py-3 font-medium text-light-lavender'>
        <div className='flex items-center gap-2'>
          {product.name}

          {product.discount > 0 && (
            <span className='rounded-full bg-light-lavender px-2 py-0.5 text-[10px] font-bold text-dark-bg'>
              {product.discount}%
            </span>
          )}
        </div>
      </td>

      {/* Price */}
      <td className='px-3 py-3 font-medium text-light-lavender'>
        {product.price.toLocaleString()} تومان
      </td>

      {/* Category */}
      <td className='px-3 py-3 text-light-lavender'>{product.category}</td>

      {/* Actions */}
      <td className='px-3 py-3'>
        <div className='flex items-center justify-center gap-1'>
          {/* Edit */}
          <Link
            href={`/dashboard/${product._id}`}
            className='rounded-lg p-2 text-blue-600 transition hover:bg-blue-50'
            aria-label='ویرایش محصول'>
            <Pencil size={16} />
          </Link>

          {/* View */}
          <Link
            href={`/${product._id}`}
            target='_blank'
            className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100'
            aria-label='مشاهده محصول در سایت'>
            <Eye size={16} />
          </Link>

          {/* Delete */}
          <DeleteProductButton
            productId={product._id.toString()}
            setData={setData}
          />
        </div>
      </td>
    </tr>
  );
}
