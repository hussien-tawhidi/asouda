import HomeBanner from "@/components/common/HomeBanner";
import ProductSlider from "@/components/common/ProductSlider";
import FeaturesSection from "@/components/Features";
import { HeroCollage } from "@/components/hero/Hero";
import Category from "@/components/home-cate/Category";
import HomeAboutSection from "@/components/HomeAboutSection";
import { mostSellsProduct } from "@/constant/home-data";
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
  const images = [
    "/images/hero/1.jpg",
    "/images/hero/2.jpg",
    "/images/hero/3.jpg",
    "/images/hero/4.jpg",
    "/images/hero/5.jpg",
    "/images/hero/6.jpg",
    "/images/hero/7.jpg",
  ];
  return (
    <div className='w-full overflow-hidden pb-20'>
      <HeroCollage
        title='خوابی رویایی با آسوده'
        subtitle='با بهترین متریال‌ها و طراحی‌های مدرن، آرامش را به خانه‌تان بیاورید.'
        images={images}
        ctaText='مشاهده محصولات'
        ctaLink='/products'
        className='min-h-screen'
      />
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
          products={mostSellsProduct}
          exploreTitle='مشاهده همه محصولات'
        />
      </div>
      <ProductSlider
        title='پرفروش‌ترین سرویس‌ها'
        description='جدیدترین و محبوب‌ترین محصولات با بهترین کیفیت'
        products={mostSellsProduct}
        exploreTitle='مشاهده همه محصولات'
      />
      <hr className='border-espresso-clay/30 my-3 w-[90%] mx-auto' />
      <ProductSlider
        title='شیک ترین میز ارایشی'
        description='محصولات تازه اضافه شده'
        products={mostSellsProduct}
        exploreTitle='مشاهده بیشتر'
      />
      <Category />
      <div className='my-8 h-px bg-linear-to-r from-transparent via-espresso-clay to-transparent md:my-10' />

      <HomeAboutSection />
    </div>
  );
}
