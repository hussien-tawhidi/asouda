"use client";

import { TextareaHTMLAttributes, useId } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className,
  ...props
}: TextareaProps) {
  const id = useId();

  return (
    <div className='space-y-1.5'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>

      <textarea
        id={id}
        {...props}
        className={`
          "min-h-32 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200",
          "placeholder:text-gray-400",
          "focus:border-espresso-clay focus:outline-none focus:ring-4 focus:ring-espresso-clay/10",
          ${error ? "border-red-400" : "border-gray-300"},
          ${className},
        `}
      />

      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}
