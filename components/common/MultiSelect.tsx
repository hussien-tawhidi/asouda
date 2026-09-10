"use client";

import { useState, useRef, useEffect, useId, KeyboardEvent } from "react";
import { ChevronDown, X, Search, Plus } from "lucide-react";
import Input from "./Input";

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  creatable?: boolean;
  disabled?: boolean;
  error?: string;
}

export default function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید یا تایپ کنید...",
  className = "",
  creatable = true,
  disabled = false,
  error,
}: MultiSelectProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Toggle selection
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  // Remove a pill
  const removePill = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== option));
  };

  // Add custom value (creatable)
  const addCustom = () => {
    const trimmed = searchTerm.trim();
    if (trimmed && !value.includes(trimmed) && !options.includes(trimmed)) {
      onChange([...value, trimmed]);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (creatable && searchTerm.trim()) {
        addCustom();
      } else if (filteredOptions.length > 0) {
        if (highlightedIndex >= 0) {
          toggleOption(filteredOptions[highlightedIndex]);
        } else {
          toggleOption(filteredOptions[0]);
        }
      }
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div className={`w-full space-y-2 ${className}`} ref={containerRef}>
      <div className='relative'>
        {/* Label */}
        <label
          htmlFor={id}
          className='block text-sm font-medium text-espresso-clay mb-1'>
          {label}
        </label>

        {/* Main trigger / input area */}
        <div
          className={`
            relative w-full rounded-xl border bg-espresso-clay/5 px-3 py-2 min-h-12
            transition-all duration-200 flex flex-wrap items-center gap-1.5
            focus-within:border-espresso-clay focus-within:ring-4 focus-within:ring-espresso-clay/10
            ${error ? "border-red-500" : "border-espresso-clay/15"}
            ${disabled ? "cursor-not-allowed bg-gray-50 opacity-60" : "cursor-text"}
          `}
          onClick={() => {
            if (!disabled) {
              inputRef.current?.focus();
              setIsOpen(true);
            }
          }}>
          {/* Selected pills */}
          {value.map((item) => (
            <span
              key={item}
              className='inline-flex items-center gap-1 rounded-full bg-espresso-clay/10 px-2.5 py-1 text-xs font-medium text-espresso-clay'>
              {item}
              <X
                className='h-3 w-3 cursor-pointer hover:text-red-500 transition-colors'
                onClick={(e) => removePill(item, e)}
                aria-label={`حذف ${item}`}
              />
            </span>
          ))}

          {/* Input for search / new entries */}
          <input
            ref={inputRef}
            id={id}
            type='text'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ""}
            disabled={disabled}
            className='flex-1 min-w-20 bg-transparent text-sm outline-none placeholder:text-espresso-clay/40'
          />

          {/* Dropdown toggle icon */}
          <button
            ref={buttonRef}
            type='button'
            onClick={() => setIsOpen((prev) => !prev)}
            disabled={disabled}
            className='ml-auto flex items-center justify-center h-6 w-6 rounded-full hover:bg-gray-100/50 transition-colors'>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div
            ref={dropdownRef}
            className='absolute z-20 mt-1 w-full rounded-xl border border-espresso-clay/15 bg-bone-white shadow-lg overflow-hidden animate-slideDown'>
            {/* Search bar inside dropdown */}
            <div className='relative border-b border-espresso-clay/10 p-2'>
              <Input
                ref={inputRef}
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // placeholder='Search...'
                label=''
                placeholder='جستجو ...'
              />
              <Search className='absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-espresso-clay/80' />
            </div>

            <ul className='max-h-48 overflow-y-auto py-1'>
              {filteredOptions.length === 0 && !creatable && (
                <li className='px-4 py-2 text-sm text-gray-500 text-center'>
                  گزینه‌ای یافت نشد
                </li>
              )}

              {filteredOptions.map((option, index) => {
                const isSelected = value.includes(option);
                return (
                  <li
                    key={option}
                    className={`
                      px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                      flex items-center gap-2
                      ${isSelected ? "bg-espresso-clay/10" : "hover:bg-gray-50"}
                      ${highlightedIndex === index ? "bg-espresso-clay/20" : ""}
                    `}
                    onClick={() => toggleOption(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}>
                    {/* Custom checkbox */}
                    <div
                      className={`
                        h-4 w-4 rounded border-2 flex items-center justify-center shrink-0
                        transition-colors
                        ${
                          isSelected
                            ? "bg-espresso-clay border-espresso-clay"
                            : "border-espresso-clay/30 hover:border-espresso-clay/60"
                        }
                      `}>
                      {isSelected && (
                        <svg
                          className='h-3 w-3 text-white'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth={2.5}>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      )}
                    </div>
                    <span>{option}</span>
                  </li>
                );
              })}

              {/* Creatable: show add option */}
              {creatable && searchTerm.trim() && (
                <li
                  className='px-4 py-2 text-sm text-espresso-clay cursor-pointer hover:bg-gray-50 flex items-center gap-2 border-t border-espresso-clay/10'
                  onClick={addCustom}>
                  <Plus className='h-4 w-4' />
                  <span>افزودن {searchTerm.trim()}</span>
                </li>
              )}

              {creatable &&
                filteredOptions.length === 0 &&
                !searchTerm.trim() && (
                  <li className='px-4 py-2 text-sm text-gray-500 text-center'>
                    برای افزودن گزینه جدید، تایپ کنید و Enter بزنید
                  </li>
                )}
            </ul>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className='text-xs font-medium text-red-500 mt-1'>{error}</p>
        )}
      </div>
    </div>
  );
}

// Add to your global CSS:
// @keyframes slideDown {
//   from { opacity: 0; transform: translateY(-6px) scale(0.98); }
//   to { opacity: 1; transform: translateY(0) scale(1); }
// }
// .animate-slideDown {
//   animation: slideDown 0.15s ease-out forwards;
// }
