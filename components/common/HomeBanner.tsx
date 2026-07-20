"use client";

import Image from "next/image";
import Link from "next/link";

interface HomeBannerProps {
  image: string;
  link: string;
  alt?: string;
  priority?: boolean;
}

export default function HomeBanner({
  image,
  link,
  alt = "Home Banner",
  priority = false,
}: HomeBannerProps) {
  return (
    <Link
      href={link}
      className='group relative block overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl'>
      <div className='relative w-full'>
        <Image
          src={image}
          alt={alt}
          width={400}
          height={400}
          className='object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, 1200px'
        />

        {/* Optional overlay */}
        <div className='absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/10' />
      </div>
    </Link>
  );
}
