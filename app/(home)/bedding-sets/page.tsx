"use client";

import BeddingSetsHero from "@/components/bedding-sets/BeddingSetsHero";
import Loader from "@/components/common/Loader";
import Card from "@/components/most-sells/Card";
import { MostSellProductType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BeddingSet() {
  const [products, setProducts] = useState<MostSellProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const fetchData = await axios.get(`/api/products/home`);
        setProducts(fetchData.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const beddings = products.filter((item) =>
    [
      "سرویس خواب مدرن",
      "سرویس خواب دو نفره",
      "سرویس خواب باکس‌دار",
      "سرویس خواب سلطنتی",
    ].includes(item.category),
  );

  if (loading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader />
      </div>
    );
  }
  return (
    <div className='min-h-screen overflow-x-hidden'>
      {/* بخش Hero */}
      <BeddingSetsHero />

      {/* بخش محصولات */}
      <section className='container mx-auto px-4 py-12'>
        <div className='flex justify-between items-end mb-8'>
          <div>
            <span className='text-amber-700 font-semibold text-sm tracking-wider'>
              —— مجموعه
            </span>
            <h3 className='text-2xl md:text-4xl font-bold text-stone-800 mt-1'>
              سرویس‌های خواب ویژه جهزیه
            </h3>
          </div>
          <button className='text-amber-700 font-medium hover:underline hidden sm:block'>
            مشاهده همه <span className='mr-1'>←</span>
          </button>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
          {beddings.map((product) => {
            const hasDiscount = product.discount > 0;
            const discountedPrice = hasDiscount
              ? Math.round(product.price * (1 - product.discount / 100))
              : product.price;

            return (
              <Card
                isLiked={true}
                key={product._id}
                product={product}
                discountedPrice={discountedPrice}
                hasDiscount={hasDiscount}
                toggleLike={() => {}}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
