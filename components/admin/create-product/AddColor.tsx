"use client";

import { Plus, Trash2 } from "lucide-react";
import { useId } from "react";

interface Color {
  name: string;
  value: string;
}

interface ColorListInputProps {
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
}: ColorListInputProps) {
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

  return (
    <section>
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
      <div className='mt-3 space-y-2'>
        {value.map((color, index) => (
          <div key={`${id}-color-${index}`} className='flex items-center gap-2'>
            <input
              type='text'
              value={color.name}
              onChange={(e) => updateColor(index, "name", e.target.value)}
              className='flex-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:border-espresso-clay focus:outline-none focus:ring-2 focus:ring-espresso-clay/30'
              placeholder='نام رنگ'
            />
            <input
              type='color'
              value={color.value}
              onChange={(e) => updateColor(index, "value", e.target.value)}
              className='h-10 w-12 cursor-pointer rounded border border-gray-300 p-0.5'
            />
            {value.length > minItems && (
              <button
                type='button'
                onClick={() => removeColor(index)}
                className='rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500'
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
