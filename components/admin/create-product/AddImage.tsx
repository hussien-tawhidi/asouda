"use client";

import { Plus, Trash2 } from "lucide-react";
import { useId } from "react";

interface ImageListInputProps {
  /** Current array of image URLs */
  value: string[];
  /** Callback when the array changes */
  onChange: (newImages: string[]) => void;
  /** Minimum number of images (default: 1) */
  minItems?: number;
  /** Text on the add button (default: "افزودن تصویر") */
  addLabel?: string;
}

export default function AddImage({
  value,
  onChange,
  minItems = 1,
  addLabel = "افزودن تصویر",
}: ImageListInputProps) {
  const id = useId();

  const addImage = () => {
    onChange([...value, ""]);
  };

  const removeImage = (index: number) => {
    if (value.length <= minItems) return;
    onChange(value.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, newUrl: string) => {
    onChange(value.map((url, i) => (i === index ? newUrl : url)));
  };

  return (
    <section>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-700'>تصاویر</h3>
        <button
          type='button'
          onClick={addImage}
          className='flex items-center gap-1 rounded-lg bg-espresso-clay/10 px-3 py-1.5 text-sm font-medium text-espresso-clay transition hover:bg-espresso-clay/20'>
          <Plus size={16} />
          {addLabel}
        </button>
      </div>
      <div className='mt-3 space-y-2'>
        {value.map((url, index) => (
          <div key={`${id}-image-${index}`} className='flex items-center gap-2'>
            <input
              type='text'
              value={url}
              onChange={(e) => updateImage(index, e.target.value)}
              className='flex-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:border-espresso-clay focus:outline-none focus:ring-2 focus:ring-espresso-clay/30'
              placeholder={`آدرس تصویر ${index + 1}`}
            />
            {value.length > minItems && (
              <button
                type='button'
                onClick={() => removeImage(index)}
                className='rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500'
                aria-label='حذف تصویر'>
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
