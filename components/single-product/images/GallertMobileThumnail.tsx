"use client";

import Image from "next/image";

interface GalleryMobileThumbnailsProps {
  images: string[];
  selectedImage: number;
  onSelect: (index: number) => void;
  onOpenGallery: () => void;
}

export default function GalleryMobileThumbnails({
  images,
  selectedImage,
  onSelect,
  onOpenGallery,
}: GalleryMobileThumbnailsProps) {
  if (images.length <= 1) return null;

  return (
    <div className='mt-4 md:hidden'>
      <div className='flex gap-3 overflow-x-auto no-scrollbar p-2'>
        {images.slice(0, 4).map((image, index) => {
          const active = selectedImage === index;

          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`group relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl transition-all duration-300 ${
                active
                  ? "scale-105 ring-2 ring-espresso-clay ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}>
              <Image
                src={image}
                alt={`تصویر ${index + 1}`}
                fill
                sizes='64px'
                className='object-cover transition-transform duration-300 group-hover:scale-110'
              />

              {/* Overlay on last visible image */}
              {index === 3 && images.length > 4 && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenGallery();
                  }}
                  className='absolute inset-0 flex items-center justify-center bg-espresso-clay/30 text-lg font-bold text-bone-white backdrop-blur-sm'>
                  +{images.length - 4}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Counter */}
      <div className='mt-3 flex items-center justify-center'>
        <span className='rounded-full bg-espresso-clay/10 px-3 py-1 text-xs font-medium'>
          {selectedImage + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
