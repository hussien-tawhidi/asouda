"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

const FALLBACK_IMAGE = "/images/placeholder.jpg";

export default function MobileHero({ images }: { images: string[] }) {
  // ✅ sanitize images
  const safeImages = images.filter(
    (img): img is string => typeof img === "string" && img.trim() !== "",
  );

  // ✅ prevent rendering empty swiper
  if (safeImages.length === 0) return null;

  return (
    <div className='block md:hidden'>
      <Swiper
        effect='fade'
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (_, className) =>
            `<span class="${className} custom-bullet"></span>`,
        }}
        modules={[EffectFade, Pagination, Autoplay]}
        className='mobileHeroSwiper'>
        {safeImages.map((item, i) => (
          <SwiperSlide key={`${item}-${i}`}>
            <div className='relative w-full'>
              <Image
                src={item || FALLBACK_IMAGE} // ✅ never empty
                alt={`Hero banner ${i + 1}`}
                width={400} height={400}
                // fill // ✅ better than width/height here
                priority={i === 0} // ✅ only first image eager
                sizes='100vw'
                className='object-cover h-full w-full'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
