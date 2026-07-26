"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Heart, Share2 } from "lucide-react";

interface GalleryMainImageProps {
  images: string[];
  selectedImage: number;
  onPrevious: () => void;
  onNext: () => void;
  onOpenFullscreen: () => void;
  onWishlist?: () => void;
  onShare?: () => void;
}

export default function GalleryMainImage({
  images,
  selectedImage,
  onPrevious,
  onNext,
  onOpenFullscreen,
  onWishlist,
  onShare,
}: GalleryMainImageProps) {
  return (
    <div className='group relative overflow-hidden rounded-3xl bg-warm-putty'>
      {/* Image Counter */}
      <div className='absolute bottom-4 left-4 z-20 rounded-full bg-espresso-clay/50 px-3 py-1 text-xs font-medium text-bone-white backdrop-blur-md'>
        {selectedImage + 1} / {images.length}
      </div>

      {/* Action Buttons */}
      <div className='absolute right-4 top-4 z-20 flex flex-col gap-2'>
        <ActionButton
          icon={<Heart className='h-4 w-4 md:h-5 md:w-5' />}
          onClick={onWishlist}
          label='افزودن به علاقه‌مندی‌ها'
        />

        <ActionButton
          icon={<Share2 className='h-4 w-4 md:h-5 md:w-5' />}
          onClick={onShare}
          label='اشتراک‌گذاری'
        />

        <ActionButton
          icon={<Expand className='h-4 w-4 md:h-5 md:w-5' />}
          onClick={onOpenFullscreen}
          label='نمایش تمام صفحه'
        />
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <NavigationButton direction='left' onClick={onPrevious} />

          <NavigationButton direction='right' onClick={onNext} />
        </>
      )}

      {/* Main Image */}
      <button
        onClick={onOpenFullscreen}
        className='relative block w-full cursor-zoom-in overflow-hidden'>
        <Image
          src={images[selectedImage]}
          alt={`تصویر ${selectedImage + 1}`}
          width={900}
          height={900}
          priority
          className='aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </button>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  label: string;
}

function ActionButton({ icon, onClick, label }: ActionButtonProps) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className='rounded-full bg-bone-white/90 p-2 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-bone-white'>
      {icon}
    </button>
  );
}

interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  const position = direction === "left" ? "left-4" : "right-4";

  return (
    <button
      onClick={onClick}
      className={`absolute ${position} top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-bone-white/90 p-3 shadow-xl opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 hover:scale-110 lg:flex`}>
      <Icon size={20} />
    </button>
  );
}
