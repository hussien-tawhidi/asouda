"use client";

import { InputHTMLAttributes, useId } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  const id = useId();

  return (
    <div className='space-y-1.5 w-full'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>

      <input
        id={id}
        {...props}
        className={` w-full
          "w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-all duration-200",
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
