"use client";

import { Plus, Trash2 } from "lucide-react";
import { useId } from "react";

interface StringArrayInputProps {
  /** Label / title for the section */
  label: string;
  /** Current array of strings */
  value: string[];
  /** Callback when array changes */
  onChange: (newArray: string[]) => void;
  /** Placeholder text for each input (default: "مقدار") */
  placeholder?: string;
  /** Text on the add button (default: "افزودن") */
  addLabel?: string;
  /** Minimum number of items (default: 1) */
  minItems?: number;
}

export default function AddFeatures({
  label,
  value,
  onChange,
  placeholder = "مقدار",
  addLabel = "افزودن",
  minItems = 1,
}: StringArrayInputProps) {
  const id = useId();

  const addItem = () => {
    onChange([...value, ""]);
  };

  const removeItem = (index: number) => {
    if (value.length <= minItems) return;
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, newValue: string) => {
    onChange(value.map((item, i) => (i === index ? newValue : item)));
  };

  return (
    <section>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-700'>{label}</h3>
        <button
          type='button'
          onClick={addItem}
          className='flex items-center gap-1 rounded-lg bg-espresso-clay/10 px-3 py-1.5 text-sm font-medium text-espresso-clay transition hover:bg-espresso-clay/20'>
          <Plus size={16} />
          {addLabel}
        </button>
      </div>
      <div className='mt-3 space-y-2'>
        {value.map((item, index) => (
          <div key={`${id}-item-${index}`} className='flex items-center gap-2'>
            <input
              type='text'
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className='flex-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:border-espresso-clay focus:outline-none focus:ring-2 focus:ring-espresso-clay/30'
              placeholder={`${placeholder} ${index + 1}`}
            />
            {value.length > minItems && (
              <button
                type='button'
                onClick={() => removeItem(index)}
                className='rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500'
                aria-label='حذف'>
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
