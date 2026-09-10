"use client";

import { useState, useRef, useEffect, useId, KeyboardEvent } from "react";
import { ChevronDown, X, AlertCircle, Search } from "lucide-react";
import Input from "./Input";

interface Option {
  label: string;
  value: string;
}

interface AdvancedSelectProps {
  label: string;
  options: Option[];
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // 👈 standard React event
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  clearable?: boolean;
  searchable?: boolean;
}

export default function AdvancedSelect({
  label,
  options,
  value,
  onChange,
  name,
  error,
  placeholder = "",
  disabled = false,
  loading = false,
  className = "",
  clearable = true,
  searchable = true,
}: AdvancedSelectProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
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

  // Helper to create a synthetic change event
  const createChangeEvent = (
    value: string,
  ): React.ChangeEvent<HTMLSelectElement> => {
    return {
      target: { name, value },
      currentTarget: { name, value },
      // Minimal required for type compatibility
    } as React.ChangeEvent<HTMLSelectElement>;
  };

  const handleSelect = (option: Option) => {
    onChange?.(createChangeEvent(option.value));
    setIsOpen(false);
    setSearchTerm("");
    buttonRef.current?.focus();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(createChangeEvent(""));
    setSearchTerm("");
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  return (
    <div className={`w-full space-y-2 ${className}`} ref={containerRef}>
      <div className='relative'>
        {/* Floating label */}
        <label
          htmlFor={id}
          className={`
            absolute right-3 transition-all duration-200 pointer-events-none
            ${
              isOpen || value || searchTerm
                ? "top-1 text-xs text-espresso-clay/80"
                : "top-3.5 text-sm text-espresso-clay/70"
            }
          `}>
          {label}
        </label>

        {/* Main trigger button */}
        <button
          ref={buttonRef}
          id={id}
          type='button'
          disabled={disabled || loading}
          onClick={() => !disabled && !loading && setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            w-full rounded-xl border border-espresso-clay/30 bg-espresso-clay/5 px-3 pt-5 pb-2 text-right text-sm
            transition-all duration-200
            flex items-center justify-between
            focus:outline-none focus:ring-4
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                : "border-gray-300 hover:border-gray-400 focus:border-espresso-clay focus:ring-espresso-clay/10"
            }
            ${disabled ? "cursor-not-allowed bg-gray-50 text-gray-400" : "cursor-pointer"}
            ${loading ? "cursor-wait" : ""}
          `}>
          <span className='truncate'>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <span className='flex items-center gap-1'>
            {clearable && selectedOption && !disabled && (
              <X
                className='h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors'
                onClick={handleClear}
                role='button'
                tabIndex={-1}
                aria-label='Clear selection'
              />
            )}
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>

        {/* Dropdown */}
        {isOpen && !disabled && !loading && (
          <div
            ref={dropdownRef}
            className='absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-bone-white shadow-lg overflow-hidden animate-slideDown'
            role='listbox'
            aria-labelledby={id}>
            {/* Search input */}
            {searchable && (
              <div className='relative border-b border-espresso-clay/20 p-2'>
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
            )}

            <ul className='max-h-60 overflow-y-auto py-1'>
              {filteredOptions.length === 0 ? (
                <li className='px-4 py-2 text-sm text-gray-500 text-center'>
                  پیدا نشد ...
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    role='option'
                    aria-selected={option.value === value}
                    className={`
                      px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                      flex items-center justify-between
                      ${
                        option.value === value
                          ? "bg-espresso-clay/10 text-espresso-clay font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                      ${
                        highlightedIndex === index
                          ? "bg-espresso-clay/20 outline-none"
                          : ""
                      }
                    `}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}>
                    {option.label}
                    {option.value === value && (
                      <span className='text-espresso-clay'>✓</span>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className='absolute left-3 top-1/2 -translate-y-1/2'>
            <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-espresso-clay' />
          </div>
        )}
      </div>

      {error && (
        <div
          className='flex items-center gap-1 text-xs font-medium text-red-500'
          id={`${id}-error`}>
          <AlertCircle className='h-3.5 w-3.5' />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
