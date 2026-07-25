"use client";

import { SelectHTMLAttributes, useId } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
  placeholder?: string;
}

export default function Select({
  label,
  options,
  error,
  placeholder = "انتخاب کنید",
  className = "",
  ...props
}: SelectProps) {
  const id = useId();

  return (
    <div className='w-full space-y-2'>
      <label htmlFor={id} className='block text-sm font-semibold text-gray-700'>
        {label}
      </label>

      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          w-full rounded-xl border bg-bone-white px-4 py-3 text-sm text-gray-800
          shadow-sm transition-all duration-200

          focus:border-espresso-clay
          focus:outline-none
          focus:ring-4
          focus:ring-espresso-clay/10

          disabled:cursor-not-allowed
          disabled:bg-gray-100

          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : "border-gray-300 hover:border-gray-400"
          }

          ${className}
        `}
        {...props}>
        <option value='' disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={`${id}-error`} className='text-xs font-medium text-red-500'>
          {error}
        </p>
      )}
    </div>
  );
}
