"use client";

import { Plus, Trash2 } from "lucide-react";
import { useId } from "react";

interface Color {
  name: string;
  value: string;
}

interface AddColorProps {
  /** Label for the section */
  label: string;
  /** Current array of colors */
  value: Color[];
  /** Callback when the array changes */
  onChange: (newColors: Color[]) => void;
  /** Text on the add button (default: "افزودن رنگ") */
  addLabel?: string;
  /** Minimum number of color entries (default: 1) */
  minItems?: number;
  /** Default color value for new items (default: "#000000") */
  defaultColor?: string;
}

export default function AddColor({
  label,
  value,
  onChange,
  addLabel = "افزودن رنگ",
  minItems = 1,
  defaultColor = "#000000",
}: AddColorProps) {
  const id = useId();

  const addColor = () => {
    onChange([...value, { name: "", value: defaultColor }]);
  };

  const removeColor = (index: number) => {
    if (value.length <= minItems) return;
    onChange(value.filter((_, i) => i !== index));
  };

  const updateColor = (
    index: number,
    field: "name" | "value",
    newValue: string,
  ) => {
    onChange(
      value.map((color, i) =>
        i === index ? { ...color, [field]: newValue } : color,
      ),
    );
  };

  // Trigger color picker by clicking the swatch
  const handleSwatchClick = (index: number) => {
    const input = document.getElementById(
      `${id}-colorpicker-${index}`,
    ) as HTMLInputElement;
    if (input) input.click();
  };

  return (
    <section className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-700'>{label}</h3>
        <button
          type='button'
          onClick={addColor}
          className='flex items-center gap-1 rounded-lg bg-espresso-clay/10 px-3 py-1.5 text-sm font-medium text-espresso-clay transition hover:bg-espresso-clay/20'>
          <Plus size={16} />
          {addLabel}
        </button>
      </div>

      {/* Color preview list (optional) */}
      {value.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {value.map((color, idx) => (
            <div
              key={idx}
              className='h-6 w-6 rounded-full border border-gray-200 shadow-sm'
              style={{ backgroundColor: color.value }}
              title={color.name || "بدون نام"}
            />
          ))}
        </div>
      )}

      {/* Color entries */}
      <div className='space-y-3 grid grid-cols-3 gap-4'>
        {value.map((color, index) => (
          <div
            key={`${id}-color-${index}`}
            className='flex items-center gap-3 rounded-xl border border-espresso-clay/30 px-10 p-3 shadow-sm transition hover:shadow-md'>
            {/* Color swatch (clickable) */}
            <button
              type='button'
              onClick={() => handleSwatchClick(index)}
              className='h-8 w-8 shrink-0 rounded-full border-2 border-gray-200 shadow-sm transition hover:scale-110'
              style={{ backgroundColor: color.value }}
              aria-label={`تغییر رنگ ${color.name || index + 1}`}
            />

            {/* Color name input */}
            <input
              type='text'
              value={color.name}
              onChange={(e) => updateColor(index, "name", e.target.value)}
              className='flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-espresso-clay focus:outline-none focus:ring-2 focus:ring-espresso-clay/30'
              placeholder={`نام رنگ ${index + 1}`}
            />

            {/* Hidden color picker (triggered by swatch click) */}
            <input
              id={`${id}-colorpicker-${index}`}
              type='color'
              value={color.value}
              onChange={(e) => updateColor(index, "value", e.target.value)}
              className='h-0 w-0 overflow-hidden border-0 p-0 opacity-0'
              aria-label={`انتخاب رنگ برای ${color.name || index + 1}`}
            />

            {/* Delete button */}
            {value.length > minItems && (
              <button
                type='button'
                onClick={() => removeColor(index)}
                className='rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500'
                aria-label='حذف رنگ'>
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
