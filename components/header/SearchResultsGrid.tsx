"use client";

import Link from "next/link";
import { MostSellProductType } from "@/types";
import Card from "@/components/most-sells/Card";
import { useState } from "react";
import { toggleLike } from "@/lib/products";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function SearchResultsGrid({
  products,
  pagination,
  query,
}: {
  products: MostSellProductType[];
  pagination: PaginationInfo;
  query: string;
}) {
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  // No results
  if (products.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-earth-brown/70 text-lg'>نتیجه‌ای یافت نشد</p>
        <p className='text-earth-brown/40 mt-1'>عبارت دیگری را امتحان کنید</p>
      </div>
    );
  }

  const { page, pages, limit } = pagination;

  // ✅ Pagination logic (FIXED)
  let startPage = Math.max(1, page - 2);
  const endPage = Math.min(pages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <>
      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
        {products.map((product) => {
          const hasDiscount = product.discount > 0;
          const discountedPrice = hasDiscount
            ? Math.round(product.price * (1 - product.discount / 100))
            : product.price;

          return (
            <Card
              key={product._id}
              product={product}
              isLiked={likedProducts.includes(product._id)}
              discountedPrice={discountedPrice}
              hasDiscount={hasDiscount}
              toggleLike={(id, e) => toggleLike(id, e, setLikedProducts)}
            />
          );
        })}
      </div>

      {/* Pagination Controls */}
      {pages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-8 flex-wrap'>
          {/* Previous */}
          {page > 1 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}&limit=${limit}`}
              className='px-4 py-2 rounded-lg border border-earth-brown/20 hover:bg-earth-brown/5 transition-colors text-earth-brown/70'>
              قبلی
            </Link>
          )}

          {/* Page Numbers */}
          <div className='flex gap-1'>
            {pageNumbers.map((p) => (
              <Link
                key={p}
                href={`/search?q=${encodeURIComponent(query)}&page=${p}&limit=${limit}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  p === page
                    ? "bg-earth-brown text-white"
                    : "hover:bg-earth-brown/5 text-earth-brown/70"
                }`}>
                {p}
              </Link>
            ))}
          </div>

          {/* Next */}
          {page < pages && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}&limit=${limit}`}
              className='px-4 py-2 rounded-lg border border-earth-brown/20 hover:bg-earth-brown/5 transition-colors text-earth-brown/70'>
              بعدی
            </Link>
          )}
        </div>
      )}
    </>
  );
}
