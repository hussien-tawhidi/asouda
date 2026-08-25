"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number; // optional – for summary
  totalItems?: number; // optional – for summary
  showSummary?: boolean; // default true
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0,
  showSummary = true,
}: PaginationProps) {
  // --- Page number generator with ellipsis (unchanged logic) ---
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const delta = 2;
    const range = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    let prev: number | null = null;
    for (const num of range) {
      if (prev !== null && num - prev > 1) {
        pages.push("…");
      }
      pages.push(num);
      prev = num;
    }
    return pages;
  }, [currentPage, totalPages]);

  // --- Compute displayed range ---
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  // --- Handlers ---
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // --- Mobile‑friendly: show only current page, prev/next ---
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  // (You can also use a CSS class to hide extra buttons on small screens)

  return (
    <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-between'>
      {/* Summary (optional) */}
      {showSummary && totalItems > 0 && (
        <p className='text-sm text-gray-600'>
          نمایش {start} – {end} از {totalItems} مورد
        </p>
      )}

      <nav
        role='navigation'
        aria-label='صفحه‌بندی'
        className='flex items-center gap-1'>
        {/* First page */}
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          aria-label='رفتن به صفحه اول'
          className='hidden rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:shadow-sm disabled:opacity-30 sm:inline-flex'>
          <ChevronRight className='h-4 w-4' />
          <ChevronRight className='-ml-2 h-4 w-4' />
        </button>

        {/* Previous */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label='صفحه قبلی'
          className='rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:shadow-sm disabled:opacity-30'>
          <ChevronRight className='h-4 w-4' />
        </button>

        {/* Page numbers */}
        <div className='flex items-center gap-1'>
          {pageNumbers.map((page, index) =>
            typeof page === "string" ? (
              <span
                key={`ellipsis-${index}`}
                className='px-2 text-gray-400 select-none'>
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`
                  min-w-9 rounded-full px-3 py-1 text-sm font-medium transition-all
                  ${
                    page === currentPage
                      ? "bg-primary-600 text-white shadow-md hover:bg-primary-700"
                      : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
                `}>
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label='صفحه بعدی'
          className='rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:shadow-sm disabled:opacity-30'>
          <ChevronLeft className='h-4 w-4' />
        </button>

        {/* Last page */}
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          aria-label='رفتن به صفحه آخر'
          className='hidden rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:shadow-sm disabled:opacity-30 sm:inline-flex'>
          <ChevronLeft className='h-4 w-4' />
          <ChevronLeft className='-ml-2 h-4 w-4' />
        </button>
      </nav>
    </div>
  );
}
