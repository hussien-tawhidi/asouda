"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface FullscreenGalleryProps {
  open: boolean;
  images: string[];
  selectedImage: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export default function FullscreenGallery({
  open,
  images,
  selectedImage,
  onClose,
  onPrevious,
  onNext,
  onSelect,
}: FullscreenGalleryProps) {
  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/90'
      onClick={onClose}>
      {/* Close */}
      <button
        onClick={onClose}
        className='absolute right-6 top-6 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20'>
        <X size={24} />
      </button>

      {/* Counter */}
      <div className='absolute left-6 top-6 z-20 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur'>
        {selectedImage + 1} / {images.length}
      </div>

      {/* Previous */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className='absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20'>
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className='absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20'>
          <ChevronRight size={28} />
        </button>
      )}

      {/* Image */}
      <div
        className='relative h-[85vh] w-[90vw] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}>
        <div className='flex min-h-full items-center justify-center p-4'>
          <img
            src={images[selectedImage]}
            alt={`تصویر ${selectedImage + 1}`}
            className='h-auto max-w-full object-contain'
            style={{ maxHeight: "none" }}
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className='absolute bottom-6 left-1/2 z-20 flex max-w-[90vw] -translate-x-1/2 gap-3 overflow-x-auto rounded-2xl bg-black/40 p-3 backdrop-blur'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(index);
              }}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                selectedImage === index
                  ? "scale-105 ring-2 ring-white"
                  : "opacity-70 hover:opacity-100"
              }`}>
              <Image
                src={image}
                alt={`تصویر ${index + 1}`}
                fill
                sizes='64px'
                className='object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
