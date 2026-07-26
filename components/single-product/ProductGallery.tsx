"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import FullscreenGallery from "./FullScreenGallery";
import GalleryMainImage from "./GalleryMainImage";
import GalleryMobileThumbnails from "./GallertMobileThumnail";
import GalleryThumbnails from "./GalleryThumnail";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  /* ---------------- Navigation ---------------- */

  const previous = useCallback(() => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  /* ---------------- Fullscreen ---------------- */

  const openFullscreen = useCallback(() => {
    setFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreen(false);
  }, []);

  /* ---------------- Thumbnail Scroll ---------------- */

  const scrollThumbnails = useCallback((direction: "left" | "right") => {
    if (!thumbnailContainerRef.current) return;

    thumbnailContainerRef.current.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });
  }, []);

  /* ---------------- Auto Center Active Thumbnail ---------------- */

  useEffect(() => {
    if (!thumbnailContainerRef.current || images.length <= 1) return;

    const selected = thumbnailContainerRef.current.children[
      selectedImage
    ] as HTMLElement | null;

    selected?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedImage, images.length]);

  /* ---------------- Keyboard ---------------- */

  useEffect(() => {
    if (!fullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeFullscreen();
          break;

        case "ArrowLeft":
          previous();
          break;

        case "ArrowRight":
          next();
          break;
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullscreen, previous, next, closeFullscreen]);

  /* ---------------- Empty State ---------------- */

  if (images.length === 0) {
    return (
      <div className='flex aspect-square items-center justify-center rounded-3xl border bg-gray-100 text-gray-500'>
        تصویری برای این محصول وجود ندارد.
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <>
      <div className='mx-auto w-[98%] space-y-5'>
        <GalleryMainImage
          images={images}
          selectedImage={selectedImage}
          onPrevious={previous}
          onNext={next}
          onOpenFullscreen={openFullscreen}
          onWishlist={() => {}}
          onShare={() => {}}
        />

        <GalleryMobileThumbnails
          images={images}
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
          onOpenGallery={openFullscreen}
        />

        <GalleryThumbnails
          images={images}
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
          onScroll={scrollThumbnails}
          thumbnailContainerRef={thumbnailContainerRef}
        />
      </div>

      <FullscreenGallery
        open={fullscreen}
        images={images}
        selectedImage={selectedImage}
        onClose={closeFullscreen}
        onPrevious={previous}
        onNext={next}
        onSelect={setSelectedImage}
      />
    </>
  );
}
