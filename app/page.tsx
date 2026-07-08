import { HeroCollage } from "@/components/hero/Hero";
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
    <div className='w-full'>
      <HeroCollage
        title='خوابی رویایی با آسوده'
        subtitle='با بهترین متریال‌ها و طراحی‌های مدرن، آرامش را به خانه‌تان بیاورید.'
        images={images}
        ctaText='مشاهده محصولات'
        ctaLink='/products'
        className='min-h-screen'
      />
    </div>
  );
}
