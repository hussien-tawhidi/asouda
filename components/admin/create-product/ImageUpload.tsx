"use client";

import { MultipleImageUploadType } from "@/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { FiUploadCloud } from "react-icons/fi";

export default function ImageUploadInput({
  images = [],
  setImages,
  maxImages = 10,
  required = false,
}: MultipleImageUploadType) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addImages(files);
  };

  const addImages = (newFiles: File[]) => {
    // Check total count
    if (images.length + newFiles.length > maxImages) {
      setError(`حداکثر ${maxImages} تصویر می‌توانید آپلود کنید`);
      return;
    }

    // Validate file types and sizes
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    newFiles.forEach((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

      if (!isValidType) {
        invalidFiles.push(`${file.name} - فرمت نامعتبر`);
      } else if (!isValidSize) {
        invalidFiles.push(`${file.name} - حجم بیش از ۵ مگابایت`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`فایل‌های نامعتبر: ${invalidFiles.join("، ")}`);
    }

    if (validFiles.length === 0) return;

    const updatedImages = [...images, ...validFiles];
    setImages(updatedImages);

    // Create previews for new files
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);

    // Clear error if files were added successfully
    if (validFiles.length > 0) {
      setError(null);
    }

    // Reset file input to allow selecting same files again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // Revoke the object URL to prevent memory leaks
    const removedPreview = previews[index];
    URL.revokeObjectURL(removedPreview);

    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);

    // Clear error when removing images
    setError(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    addImages(files);
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    setImages(newImages);

    const newPreviews = [...previews];
    const [removedPreview] = newPreviews.splice(fromIndex, 1);
    newPreviews.splice(toIndex, 0, removedPreview);
    setPreviews(newPreviews);
  };

  return (
    <div className='w-full space-y-4'>
      {/* Upload Area */}
      {images.length < maxImages && (
        <div>
          <label
            htmlFor='images'
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className='relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-secondary-color rounded-lg cursor-pointer hover:bg-main-black/70 transition group'>
            <div className='flex flex-col items-center gap-2 text-light-color'>
              <FiUploadCloud className='w-8 h-8 group-hover:scale-110 transition-transform' />
              <span className='text-sm font-medium'>
                تصاویر را بکشید یا کلیک کنید
              </span>
              <span className='text-xs text-center'>
                فرمت‌های مجاز: JPG, PNG, WebP
                <br />
                حداکثر حجم: ۵ مگابایت
                <br />
                حداکثر تعداد: {maxImages} تصویر
              </span>
            </div>
            <input
              ref={fileInputRef}
              id='images'
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              multiple
              required={required && images.length === 0}
              className='hidden'
            />
          </label>

          {/* Counter */}
          <div className='flex justify-between items-center mt-2 px-2'>
            <span className='text-sm text-secondary-color'>
              {images.length} از {maxImages} تصویر انتخاب شده
            </span>
            {images.length > 0 && (
              <button
                type='button'
                onClick={() => {
                  setImages([]);
                  previews.forEach((preview) => URL.revokeObjectURL(preview));
                  setPreviews([]);
                  setError(null);
                }}
                className='text-sm text-red-500 hover:text-red-400 transition'>
                حذف همه
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className='p-3 bg-red-500/10 border border-red-500/30 rounded-lg'>
          <p className='text-sm text-red-400'>{error}</p>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h4 className='text-sm font-medium text-light-color'>
              تصاویر انتخاب شده ({images.length})
            </h4>
            <div className='text-xs text-secondary-color'>
              اولین تصویر به عنوان تصویر اصلی نمایش داده می‌شود
            </div>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
            {images.map((image, index) => (
              <div
                key={`${image.name}-${index}`}
                className='relative group aspect-square'>
                {/* Image Preview */}
                <div
                  className={`relative w-full h-full rounded-lg overflow-hidden border-2 ${
                    index === 0
                      ? "border-main-color shadow-lg"
                      : "border-light-color/20"
                  }`}>
                  <Image
                    src={previews[index] || "/placeholder.jpg"}
                    alt={`تصویر ${index + 1}`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
                  />

                  {/* Main Image Badge */}
                  {index === 0 && (
                    <div className='absolute top-2 left-2'>
                      <span className='px-2 py-1 bg-main-color text-light-color text-xs rounded-full'>
                        اصلی
                      </span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    type='button'
                    onClick={() => removeImage(index)}
                    className='absolute top-2 right-2 bg-red-500 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'>
                    <BiX className='w-3.5 h-3.5 text-light-color' />
                  </button>

                  {/* Image Number */}
                  <div className='absolute bottom-2 right-2'>
                    <span className='px-2 py-1 bg-black/70 text-white text-xs rounded-full'>
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Reorder Controls */}
                <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2'>
                  {index > 0 && (
                    <button
                      type='button'
                      onClick={() => reorderImages(index, index - 1)}
                      className='p-2 bg-main-color rounded-full hover:bg-main-color/80 transition'>
                      <svg
                        className='w-4 h-4 text-light-color rotate-90'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type='button'
                      onClick={() => reorderImages(index, index + 1)}
                      className='p-2 bg-main-color rounded-full hover:bg-main-color/80 transition'>
                      <svg
                        className='w-4 h-4 text-light-color -rotate-90'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Image Info */}
                <div className='mt-1 text-xs truncate'>
                  <p className='text-light-color truncate'>{image.name}</p>
                  <p className='text-secondary-color'>
                    {(image.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Drag & Drop Hint */}
          <div className='flex items-center justify-center gap-2 text-xs text-secondary-color'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
              />
            </svg>
            <span>
              برای تغییر ترتیب، تصاویر را با دکمه‌های بالا جابه‌جا کنید
            </span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className='text-center flex justify-center items-center gap-3 text-secondary-color py-8 border border-light-color/10 rounded-lg'>
          <CiImageOn className='w-8 h-8' />
          <div className=''>
            <p>هنوز تصویری انتخاب نکرده‌اید</p>
            <p className='text-sm mt-1'>تصاویر محصول را اینجا آپلود کنید</p>
          </div>
        </div>
      )}
    </div>
  );
}
