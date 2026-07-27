"use client";

import { MostSellProductType, SearchSuggestionsProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { BsArrowRight, BsSearch, BsExclamationCircle } from "react-icons/bs";

export default function SearchSuggestions({
  onSearch,
}: SearchSuggestionsProps) {
  const [products, setProducts] = useState<MostSellProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ─── Fetch logic (extracted for retry) ──────────────────
  const fetchSuggestions = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/search/search-suggestion", {
        signal,
      });

      if (!res.ok) throw new Error("Failed to fetch suggestions");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError("خطا در دریافت پیشنهادات");
        console.error("Suggestion fetch error:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Auto-fetch on mount ──────────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchSuggestions(controller.signal);
    }, 0);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [fetchSuggestions]);

  // ─── Loading state (skeleton) ───────────────────────────
  if (loading) {
    return (
      <div className='space-y-3'>
        <div className='h-4 w-24 bg-earth-brown/10 rounded animate-pulse' />
        <div className='grid grid-cols-2 gap-2'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='flex items-center gap-2 px-3 py-2.5 bg-earth-brown/5 rounded-lg animate-pulse'>
              <div className='w-8 h-8 rounded bg-earth-brown/10 shrink-0' />
              <div className='flex-1 h-4 bg-earth-brown/10 rounded' />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Error state ─────────────────────────────────────────
  if (error) {
    return (
      <div className='text-center py-6'>
        <BsExclamationCircle className='w-8 h-8 text-red-400 mx-auto mb-2' />
        <p className='text-sm text-earth-brown/70'>{error}</p>
        <button
          onClick={() => fetchSuggestions()} // ✅ now works
          className='mt-2 text-xs text-earth-brown/50 hover:text-earth-brown underline'>
          تلاش مجدد
        </button>
      </div>
    );
  }

  // ─── Empty state ─────────────────────────────────────────
  if (!products.length) {
    return (
      <div className='text-center py-6'>
        <BsSearch className='w-8 h-8 text-earth-brown/20 mx-auto mb-2' />
        <p className='text-sm text-earth-brown/50'>هیچ پیشنهادی موجود نیست</p>
      </div>
    );
  }

  // ─── Success state ──────────────────────────────────────
  return (
    <div>
      <h3 className='text-xs font-semibold text-earth-brown/50 uppercase tracking-wider mb-3'>
        پیشنهادات ویژه
      </h3>

      <div className='grid md:grid-cols-2 gap-2'>
        {products.map((item) => {
          const imageSrc =
            item.image[0] instanceof File
              ? URL.createObjectURL(item.image[0])
              : item.image[0];
          return (
            <Link
              href={`/${item._id}`}
              key={item._id}
              onClick={() => onSearch(item.name)}
              className='group flex items-center gap-2 px-3 py-2.5 bg-earth-brown/5 hover:bg-earth-brown/10 rounded-lg transition-colors text-right'>
              {item.image && (
                <Image
                  src={imageSrc}
                  alt={item.name}
                  className='w-8 h-8 rounded object-cover shrink-0'
                  width={32}
                  height={32}
                />
              )}
              <span className='flex-1 truncate text-sm text-earth-brown'>
                {item.name}
              </span>
              <BsArrowRight className='w-3.5 h-3.5 text-earth-brown/20 group-hover:text-earth-brown/50 transition-colors shrink-0' />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
