"use client";

import Image from "next/image";
import { ChangeEvent, DragEvent, useState, useRef } from "react";
import { Plus, Trash2, Loader2, UploadCloud, X } from "lucide-react";

interface AddImageProps {
  value: string[];
  onUpload: (files: FileList) => Promise<void>;
  onRemove: (index: number) => void;
  isUploading?: boolean;
}

export default function AddImage({
  value,
  onUpload,
  onRemove,
  isUploading = false,
}: AddImageProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection (click)
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    await uploadFiles(files);
    e.target.value = ""; // reset
  };

  // Handle drag events
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files?.length) {
      await uploadFiles(files);
    }
  };

  // Core upload function
  const uploadFiles = async (files: FileList) => {
    setUploadError(null);
    try {
      await onUpload(files);
    } catch (error) {
      setUploadError("آپلود تصاویر با خطا مواجه شد");
      console.error(error);
    }
  };

  // Clear all images
  const clearAll = () => {
    if (value.length === 0) return;
    // Remove all from last to first to avoid index shifting
    for (let i = value.length - 1; i >= 0; i--) {
      onRemove(i);
    }
  };

  return (
    <section className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-gray-800'>تصاویر محصول</h3>
          <p className='text-sm text-gray-500'>
            {value.length} تصویر{" "}
            {value.length !== 1 ? "آپلود شده" : "آپلود شده"}
          </p>
        </div>

        <div className='flex items-center gap-2'>
          {value.length > 0 && (
            <button
              type='button'
              onClick={clearAll}
              className='rounded-lg px-3 py-1.5 text-sm text-red-500 transition hover:bg-red-50'
              aria-label='حذف همه تصاویر'>
              حذف همه
            </button>
          )}
          <label
            className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white transition ${
              isUploading ? "bg-gray-400" : "bg-espresso-clay hover:opacity-90"
            }`}>
            {isUploading ? (
              <Loader2 size={18} className='animate-spin' />
            ) : (
              <Plus size={18} />
            )}
            {isUploading ? "در حال آپلود..." : "افزودن تصویر"}
            <input
              ref={fileInputRef}
              type='file'
              multiple
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* Drop zone (visible when no images or when dragging) */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition ${
          dragActive
            ? "border-espresso-clay bg-espresso-clay/5"
            : "border-gray-300 bg-gray-50"
        } ${value.length > 0 ? "hidden" : "block"}`}>
        <div className='flex flex-col items-center gap-2'>
          <UploadCloud
            size={48}
            className={dragActive ? "text-espresso-clay" : "text-gray-400"}
          />
          <p className='text-sm font-medium text-gray-700'>
            {dragActive
              ? "فایل‌ها را رها کنید"
              : "تصاویر را بکشید و رها کنید یا کلیک کنید"}
          </p>
          <p className='text-xs text-gray-400'>فرمت‌های مجاز: JPG, PNG, WebP</p>
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className='rounded-lg bg-espresso-clay px-4 py-2 text-sm text-white hover:opacity-90'
            disabled={isUploading}>
            انتخاب تصاویر
          </button>
        </div>
      </div>

      {/* Error message */}
      {uploadError && (
        <div className='flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600'>
          <X size={16} />
          {uploadError}
        </div>
      )}

      {/* Thumbnail grid */}
      {value.length > 0 && (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          {value.map((image, index) => (
            <div
              key={index}
              className='group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm transition hover:shadow-md'>
              <Image
                src={image}
                alt={`تصویر ${index + 1}`}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 50vw, 25vw'
              />
              {/* Delete button – always visible on mobile, on hover on desktop */}
              <button
                type='button'
                onClick={() => onRemove(index)}
                className={`absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow transition ${
                  isUploading
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-red-600"
                } md:opacity-0 md:group-hover:opacity-100`}
                disabled={isUploading}
                aria-label={`حذف تصویر ${index + 1}`}>
                <Trash2 size={16} />
              </button>
              {/* Uploading overlay (global, but we can show per‑image if we had progress) */}
              {isUploading && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
                  <Loader2 size={28} className='animate-spin text-white' />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
