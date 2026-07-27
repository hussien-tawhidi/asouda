"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import axios from "axios";
import { ChevronLeft, Info } from "lucide-react";

import ProductGallery from "@/components/single-product/images/ProductGallery";
import ProductInfo from "@/components/single-product/info/ProductInfo";
import ProductSpecifications from "@/components/single-product/ProductSpecifications";
import ProductSlider from "@/components/common/ProductSlider";

import { MostSellProductType } from "@/types";
import Loader from "@/components/common/Loader";

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<MostSellProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<MostSellProductType[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const fetchData = await axios.get(`/api/products/${productId}`);
        const { data } = await axios.get("/api/products", {
          params: {
            category: product?.category,
          },
        });
        console.log("🚀 ~ fetchProduct ~ fetchData:", data);
        setProduct(fetchData.data.product);
        setRelatedProducts(data.products);
      } catch (error) {
        console.error(error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, product?.category]);

  if (loading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className='container mx-auto w-[90%] overflow-hidden px-4 py-8'>
      {/* Breadcrumb */}
      <nav className='mb-8 flex items-center gap-2 text-nowrap text-[10px] text-espresso-clay/70 md:text-sm'>
        <Link href='/'>خانه</Link>
        <ChevronLeft size={16} />
        <Link href={`/category/${product.category}`}>{product.category}</Link>
        <ChevronLeft size={16} />
        <span className='text-espresso-clay'>{product.name}</span>
      </nav>

      <div className='grid md:gap-10 lg:grid-cols-2'>
        <ProductGallery
          images={product.image.map((img) =>
            typeof img === "string" ? img : URL.createObjectURL(img),
          )}
        />
        <ProductInfo product={product} />
      </div>

      <div className='mt-5 flex gap-3 rounded-2xl bg-espresso-clay/10 p-4'>
        <Info className='mt-0.5 h-5 w-5 shrink-0' />

        <p className='text-xs leading-7 md:text-sm'>
          درخواست مرجوع کردن کالا با دلیل
          <span className='font-bold'> انصراف از خرید </span>
          تنها در صورتی قابل تایید است که کالا در شرایط اولیه باشد.
        </p>
      </div>

      <ProductSpecifications product={product} />

      <section className='mt-14'>
        <h2 className='mb-5 text-2xl font-bold'>توضیحات محصول</h2>

        <p className='whitespace-pre-line leading-8 text-espresso-clay/80 text-sm'>
          {product.description}
        </p>
      </section>

      {relatedProducts && (
        <ProductSlider products={relatedProducts} title='محصولات مشابه' />
      )}
    </div>
  );
}
