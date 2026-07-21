"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Heart,
  Share2,
  X,
} from "lucide-react";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const previous = () =>
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const next = () =>
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (!fullscreen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") previous();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen, next, previous]);

  if (!images.length) {
    return (
      <div className='flex aspect-square items-center justify-center rounded-3xl border bg-gray-100 text-gray-500'>
        تصویری برای این محصول وجود ندارد.
      </div>
    );
  }
  return (
    <>
      <div className='w-[90%] mx-auto'>
        {/* Main Image */}
        <div className='group relative overflow-hidden rounded-3xl'>
          {/* Action Buttons */}
          <div className='absolute right-4 top-4 z-20 flex flex-col gap-2'>
            <button className='rounded-full bg-white/90 md:p-2 p-1 shadow transition hover:scale-105'>
              <Heart className="md:w-5 md:h-5 w-3 h-3" />
            </button>

            <button className='rounded-full bg-white/90 md:p-2 p-1 shadow transition hover:scale-105'>
              <Share2 className="md:w-5 md:h-5 w-3 h-3" />
            </button>

            <button
              onClick={() => setFullscreen(true)}
              className='rounded-full bg-white/90 md:p-2 p-1 shadow transition hover:scale-105'>
              <Expand className="md:w-5 md:h-5 w-3 h-3" />
            </button>
          </div>

          {/* Previous */}
          {images.length > 1 && (
            <button
              onClick={previous}
              className='absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow opacity-0 transition group-hover:opacity-100'>
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={next}
              className='absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow opacity-0 transition group-hover:opacity-100'>
              <ChevronRight size={20} />
            </button>
          )}

          <button
            onClick={() => setFullscreen(true)}
            className='relative block aspect-auto mb-2 w-full h-full cursor-zoom-in'>
            <Image
              src={images[selectedImage]}
              alt={`تصویر ${selectedImage + 1}`}
              width={500}
              height={500}
              className='object-cover w-full h-full transition duration-500 group-hover:scale-110'
            />
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className='flex gap-3 overflow-x-auto p-2'>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl transition-all ${
                  selectedImage === index
                    ? "ring-1 ring-espresso-clay ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}>
                <Image
                  src={image}
                  alt={`تصویر ${index + 1}`}
                  fill
                  className='object-cover'
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen */}
      {fullscreen && (
        <div
          className='fixed inset-0 z-9999 flex items-center justify-center bg-black/90'
          onClick={() => setFullscreen(false)}>
          <button
            onClick={() => setFullscreen(false)}
            className='absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20'>
            <X />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              previous();
            }}
            className='absolute left-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20'>
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className='absolute right-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20'>
            <ChevronRight size={28} />
          </button>

          <div
            className='relative h-[85vh] w-[90vw]'
            onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedImage]}
              alt={`تصویر ${selectedImage + 1}`}
              fill
              className='object-contain'
            />
          </div>

          <div className='absolute top-6 left-6 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur'>
            {selectedImage + 1} / {images.length}
          </div>

          <div className='absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 overflow-x-auto rounded-2xl bg-black/40 p-3 backdrop-blur'>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 ${
                  selectedImage === index
                    ? "border-white"
                    : "border-transparent"
                }`}>
                <Image
                  src={image}
                  alt={`تصویر ${index + 1}`}
                  fill
                  className='object-cover'
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
