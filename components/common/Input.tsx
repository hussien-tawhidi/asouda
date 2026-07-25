"use client";

import { InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  placeHolderText?: string;
}

export default function Input({
  label,
  error,
  placeHolderText,
  className = "",
  ...props
}: InputProps) {
  const id = useId();

  return (
    <div className='w-full space-y-2'>
      <label htmlFor={id} className='block text-sm font-semibold text-gray-700'>
        {label}
      </label>

      <input
        id={id}
        placeholder={placeHolderText}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        className={`
          w-full rounded-xl border px-4 py-3 text-sm text-gray-800
          placeholder:text-gray-400
          shadow-sm
          transition-all duration-200

          focus:outline-none
          focus:ring-4
          focus:ring-espresso-clay/10
          focus:border-espresso-clay

          disabled:cursor-not-allowed
          disabled:bg-gray-100
          disabled:text-gray-400

          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : "border-gray-300 hover:border-gray-400"
          }

          ${className}
        `}
      />

      {error && (
        <p
          id={`${id}-error`}
          className='flex items-center gap-1 text-xs font-medium text-red-500'>
          {error}
        </p>
      )}
    </div>
  );
}
