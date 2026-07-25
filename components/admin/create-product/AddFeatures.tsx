"use client";

import { useMemo } from "react";

interface AddFeaturesProps {
  label: string;
  value: string[];
  onChange: (features: string[]) => void;
  placeholder?: string;
}

export default function AddFeatures({
  label,
  value,
  onChange,
  placeholder = `هر ویژگی را در یک خط بنویسید...
مثال:
• ساخته شده از MDF درجه یک
• دارای آینه بزرگ
• کشوهای جادار`,
}: AddFeaturesProps) {
  const text = useMemo(() => value.join("\n"), [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value
      .split("\n")
      .map((item) =>
        item
          .replace(/^[•\-\*]\s*/, "") // Remove • - *
          .trim(),
      )
      .filter(Boolean);

    onChange(features);
  };

  return (
    <section>
      <h3 className='mb-3 text-lg font-semibold text-gray-700'>{label}</h3>

      <textarea
        rows={10}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className='w-full rounded-xl border border-gray-300 p-4 leading-8 text-sm outline-none transition focus:border-espresso-clay focus:ring-4 focus:ring-espresso-clay/20'
      />

      <p className='mt-2 text-xs text-gray-500'>
        هر ویژگی را در یک خط جدید بنویسید. علامت • یا - به صورت خودکار حذف
        می‌شود.
      </p>
    </section>
  );
}
