"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

const FALLBACK_IMAGE = "/images/placeholder.jpg";

export default function MobileHero({
  banner,
}: {
  banner: {
    image: string;
    link: string;
  }[];
}) {
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
        {banner.map((item, i) => (
          <SwiperSlide key={`${item}-${i}`}>
            <Link href={item.link} className='relative w-full'>
              <Image
                src={item.image || FALLBACK_IMAGE}
                alt={`Hero banner ${i + 1}`}
                width={400}
                height={400}
                priority={i === 0}
                sizes='100vw'
                className='object-cover h-full w-full'
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
