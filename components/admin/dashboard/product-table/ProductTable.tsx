"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { MostSellProductType } from "@/types";

import ProductRow from "./ProductRow";
import Pagination from "./Pagination";

interface ProductsTableProps {
  products: MostSellProductType[];
  setData: Dispatch<SetStateAction<MostSellProductType[]>>;
}

const ITEMS_PER_PAGE = 10;

export default function ProductsTable({
  products,
  setData,
}: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Prevent an invalid page after deleting products
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, safeCurrentPage]);

  return (
    <div className='mt-4'>
      {/* Table */}
      <div className='overflow-x-auto px-5'>
        <table className='w-full min-w-162.5 text-sm'>
          <thead className="border-b border-light-lavender">
            <tr>
              {[
                { label: "تصویر", className: "pr-0" },
                { label: "نام" },
                { label: "قیمت" },
                { label: "دسته" },
                { label: "عملیات", className: "text-center" },
              ].map((header) => (
                <th
                  key={header.label}
                  className={`px-3 pb-3 font-medium text-light-lavender text-right ${
                    header.className ?? ""
                  }`}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                setData={setData}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-5 flex justify-center px-5 pb-5'>
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
