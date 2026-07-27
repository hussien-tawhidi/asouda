"use client";

import HomeBanner from "@/components/common/HomeBanner";
import Loader from "@/components/common/Loader";
import ProductSlider from "@/components/common/ProductSlider";
import FeaturesSection from "@/components/Features";
import MobileHero from "@/components/hero/MobileHero";
import HomeAboutSection from "@/components/HomeAboutSection";
import { MostSellProductType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const banners = [
  {
    image: "/banners/1.png",
    link: "/products",
  },
  {
    image: "/banners/2.png",
    link: "/offers",
  },
];
export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<MostSellProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get("/api/products/home");
        // console.log("🚀 ~ fetchProducts ~ data:", data.data)

        // Change this if your API returns a different shape
        setProducts(data.data);
      } catch (err) {
        console.error(err);
        toast.error("خطای دریافت محصول");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center py-10'>
        <Loader />
      </div>
    );
  }

  const heroImages = () =>
    products
      .filter((item) => item.category === "سرویس خواب دو نفره")
      .map((item) => item.image?.[0])
      .filter((img): img is string => typeof img === "string") // ✅ type-safe
      .slice(0, 7);

  return (
    <div className='w-full overflow-hidden pb-20 pt-2'>
      <MobileHero images={["/banners/hero.png","/banners/1.png"]} />
      <div className='md:block hidden w-[85%] mx-auto mt-10'>
        <HomeBanner image={"/banners/hero.png"} link={banners[0].link} />
      </div>
      <FeaturesSection />

      <div className='flex flex-col gap-10 md:w-[90%] w-[95%] my-10 mx-auto'>
        <div className='md:w-[70%] w-[95%] ml-auto'>
          <HomeBanner image={banners[0].image} link={banners[0].link} />
        </div>
        <div className='md:w-[70%] w-[95%] mr-auto'>
          <HomeBanner image={banners[1].image} link={banners[1].link} />
        </div>
      </div>

      <div className='bg-warm-putty'>
        <ProductSlider
          title='محصولات ویژه'
          description='جدیدترین و محبوب‌ترین محصولات با بهترین کیفیت'
          products={products.filter(
            (item) => item.category === "سرویس خواب دو نفره",
          )}
          exploreTitle='مشاهده همه محصولات'
        />
      </div>
      <ProductSlider
        title='پرفروش‌ترین سرویس‌ها'
        description='جدیدترین و محبوب‌ترین محصولات با بهترین کیفیت'
        products={products.filter((item) =>
          [
            "سرویس خواب مدرن",
            "سرویس خواب یک نفره",
            "سرویس خواب کودک / نوجوان",
          ].includes(item.category),
        )}
        exploreTitle='مشاهده همه محصولات'
      />
      <hr className='border-espresso-clay/30 my-3 w-[90%] mx-auto' />
      <ProductSlider
        title='شیک ترین میز ارایشی'
        description='محصولات تازه اضافه شده'
        products={products.filter((item) => item.category === "میزد ارایش")}
        exploreTitle='مشاهده بیشتر'
      />
      <div className='my-8 h-px bg-linear-to-r from-transparent via-espresso-clay to-transparent md:my-10' />

      <HomeAboutSection />
    </div>
  );
}
