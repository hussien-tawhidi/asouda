"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function MobileHero({ images }: { images: string[] }) {
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
        {images.map((item, i) => (
          <SwiperSlide key={`${item}-${i}`}>
            <div className='relative w-full aspect-square'>
              <Image
                src={item}
                alt={`Hero banner ${i + 1}`}
                width={400}
                height={400}
                priority={i === 0}
                className='object-cover w-auto h-full'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
