"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, notFound } from "next/navigation";
import axios from "axios";

import { categories } from "@/constant/home-data";
import Card from "@/components/most-sells/Card";
import SortControl, { SortValue } from "@/components/common/SortControl";
import { MostSellProductType } from "@/types";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  // Find category by slug
  const category = categories.find(
    (cat) => cat.href.split("/").pop() === categoryId,
  );
  console.log("🚀 ~ CategoryPage ~ category:", category);

  if (!category) {
    notFound();
  }

  const [products, setProducts] = useState<MostSellProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState<SortValue>("default");
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get("/api/products", {
          params: {
            category: category.name,
          },
        });

        // Change this if your API returns a different shape
        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت محصولات");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category.slug]);

  const filteredProducts = useMemo(() => {
    switch (sortBy) {
      case "cheap":
        return [...products].sort((a, b) => a.price - b.price);

      case "expensive":
        return [...products].sort((a, b) => b.price - a.price);

      case "discount":
        return [...products].sort((a, b) => b.discount - a.discount);

      case "popular":
        return [...products].sort((a, b) => b.rating - a.rating);

      case "newest":
        return [...products].sort((a, b) => b._id.localeCompare(a._id));

      default:
        return products;
    }
  }, [products, sortBy]);

  const toggleLike = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-20 w-full h-full'>
        <div className='loading'>
          <svg width='64px' height='48px'>
            <polyline
              points='0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24'
              id='back'></polyline>
            <polyline
              points='0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24'
              id='front'></polyline>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto py-20 text-center text-red-500'>
        {error}
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <nav className='mb-6 text-[10px] md:text-sm' aria-label='مسیر'>
        <span>خانه</span>
        <span className='mx-2'>/</span>
        <span className='font-medium text-espresso-clay'>{category.name}</span>
      </nav>

      {/* Header */}
      <div className='mb-4 flex flex-col gap-5 lg:mb-8 lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <h1 className='text-xl font-bold text-espresso-clay md:text-3xl'>
            {category.name}
          </h1>

          <p className='mt-2 text-[10px] md:text-sm'>
            {filteredProducts.length} محصول
          </p>
        </div>

        {filteredProducts.length > 0 && (
          <SortControl sortBy={sortBy} setSortBy={setSortBy} />
        )}
      </div>

      <div className='mb-10 h-px bg-linear-to-r from-transparent via-espresso-clay to-transparent' />

      {filteredProducts.length === 0 ? (
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
          {filteredProducts.map((product) => {
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
