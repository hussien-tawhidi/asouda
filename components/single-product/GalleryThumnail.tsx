"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RefObject } from "react";

interface GalleryThumbnailsProps {
  images: string[];
  selectedImage: number;
  onSelect: (index: number) => void;
  onScroll: (direction: "left" | "right") => void;
  thumbnailContainerRef: RefObject<HTMLDivElement | null>;
}

export default function GalleryThumbnails({
  images,
  selectedImage,
  onSelect,
  onScroll,
  thumbnailContainerRef,
}: GalleryThumbnailsProps) {
  if (images.length <= 1) return null;

  return (
    <div className='relative mt-6 md:block hidden'>
      {/* Left Gradient */}
      <div className='pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-linear-to-r from-white to-transparent' />

      {/* Right Gradient */}
      <div className='pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-linear-to-l from-white to-transparent' />

      {/* Scroll Left */}
      <button
        onClick={() => onScroll("left")}
        aria-label='Previous thumbnails'
        className='absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur transition-all hover:scale-110 hover:shadow-xl md:flex'>
        <ChevronRight size={18} />
      </button>

      {/* Thumbnails */}
      <div
        ref={thumbnailContainerRef}
        className='flex gap-4 overflow-x-auto scroll-smooth px-4 py-3 md:px-14 no-scrollbar'>
        {images.map((image, index) => {
          const active = selectedImage === index;

          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`group relative shrink-0 transition-all duration-300 ${
                active ? "scale-105" : "hover:-translate-y-1 hover:scale-105"
              }`}>
              <div
                className={`relative h-16 w-16 overflow-hidden rounded-2xl md:h-20 md:w-20 transition-all duration-300 ${
                  active
                    ? "ring-2 ring-espresso-clay ring-offset-2 shadow-xl"
                    : "border border-gray-200 opacity-70 hover:opacity-100 hover:shadow-lg"
                }`}>
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  sizes='80px'
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                />

                {!active && (
                  <div className='absolute inset-0 bg-black/10 transition group-hover:bg-transparent' />
                )}

                {active && (
                  <div className='absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-700 shadow'>
                    {index + 1}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Scroll Right */}
      <button
        onClick={() => onScroll("right")}
        aria-label='Next thumbnails'
        className='absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur transition-all hover:scale-110 hover:shadow-xl md:flex'>
        <ChevronLeft size={18} />
      </button>

      {/* Counter */}
      <div className='mt-3 flex items-center justify-center'>
        <span className='rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600'>
          {selectedImage + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
