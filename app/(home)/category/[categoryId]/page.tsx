"use client";

import { useMemo, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { categories, mostSellsProduct } from "@/constant/home-data";
import Card from "@/components/most-sells/Card";
import SortControl, { SortValue } from "@/components/common/SortControl";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  // Find category by slug
  const category = categories.find(
    (cat) => cat.href.split("/").pop() === categoryId,
  );

  if (!category) {
    notFound();
  }

  // Sort state
  const [sortBy, setSortBy] = useState<SortValue>("default");
  // Like state
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  // Filter & Sort products
  const products = useMemo(() => {
    const filtered = mostSellsProduct.filter(
      (product) => product.category === category.name,
    );

    switch (sortBy) {
      case "cheap":
        return [...filtered].sort((a, b) => a.price - b.price);

      case "expensive":
        return [...filtered].sort((a, b) => b.price - a.price);

      case "discount":
        return [...filtered].sort((a, b) => b.discount - a.discount);

      case "popular":
        return [...filtered].sort((a, b) => b.rating - a.rating);

      case "newest":
        return [...filtered].sort((a, b) => b._id.localeCompare(a._id));
      
      case "default":
      default:
        return filtered;
    }
  }, [category.name, sortBy]);

  const toggleLike = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <nav className='mb-6 md:text-sm text-[10px]' aria-label='مسیر'>
        <span>خانه</span>
        <span className='mx-2'>/</span>
        <span className='font-medium text-espresso-clay'>{category.name}</span>
      </nav>

      {/* Header */}
      <div className='md:mb-8 mb-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <h1 className='md:text-3xl text-xl font-bold text-espresso-clay'>
            {category.name}
          </h1>

          <p className='mt-2 md:text-sm text-[10px]'>{products.length} محصول</p>
        </div>
        {/* Sort */}
        {products.length !== 0 && (
          <SortControl setSortBy={setSortBy} sortBy={sortBy} />
        )}
      </div>
      <div className='mb-10 h-px bg-linear-to-r from-transparent via-espresso-clay to-transparent' />

      {/* Products */}
      {products.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <p className='text-lg font-semibold text-gray-700'>
            هیچ محصولی در این دسته‌بندی یافت نشد.
          </p>

          <p className='mt-2 text-sm text-gray-500'>
            ممکن است این دسته خالی باشد یا محصولات جدید به‌زودی اضافه شوند.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6'>
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
                toggleLike={toggleLike}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
