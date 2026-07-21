"use client";

import { Check, ChevronDown } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { BiSortDown } from "react-icons/bi";

export const sortOptions = [
  { value: "default", label: "پیش‌فرض" },
  { value: "newest", label: "جدیدترین" },
  { value: "cheap", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "discount", label: "بیشترین تخفیف" },
  { value: "popular", label: "محبوب‌ترین" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

interface SortControlProps {
  sortBy: SortValue;
  setSortBy: React.Dispatch<React.SetStateAction<SortValue>>;
}

export default function SortControl({ sortBy, setSortBy }: SortControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [sliderStyle, setSliderStyle] = useState<{
    left: number;
    width: number;
    top: number;
    height: number;
  } | null>(null);

  // Mobile dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ---- Slider logic (unchanged) ----
  const updateSlider = useCallback(() => {
    const activeButton = buttonRefs.current.get(sortBy);
    const container = containerRef.current;
    if (!activeButton || !container) return;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    setSliderStyle({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
      top: buttonRect.top - containerRect.top,
      height: buttonRect.height,
    });
  }, [sortBy]);

  useEffect(() => {
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]);

  // Keyboard nav for the button group
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const currentIndex = sortOptions.findIndex(
          (opt) => opt.value === sortBy,
        );
        let newIndex = currentIndex;
        if (e.key === "ArrowLeft") {
          newIndex = Math.max(0, currentIndex - 1);
        } else {
          newIndex = Math.min(sortOptions.length - 1, currentIndex + 1);
        }
        if (newIndex !== currentIndex) {
          setSortBy(sortOptions[newIndex].value);
          setIsOpen(false);
        }
      }
    },
    [sortBy, setSortBy],
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---- Compute current label (used both for dropdown toggle and screen reader) ----
  const currentLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "";

  return (
    <div className='relative'>
      {/* ----- Mobile Dropdown (visible only on small screens) ----- */}
      <div className='sm:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          className='flex items-center justify-between gap-2 rounded-full border border-espresso-clay/30 bg-bone-white px-4 py-2 text-xs font-medium text-espresso-clay shadow-sm transition hover:bg-espresso-clay/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso-clay/60'>
          <BiSortDown className='w-5 h-5' />
          <span>مرتب‌سازی: {currentLabel}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            className='absolute right-0 z-50 mt-1 w-48 rounded-lg border border-espresso-clay/10 bg-bone-white py-1 shadow-xl'
            role='listbox'
            aria-label='گزینه‌های مرتب‌سازی'>
            {sortOptions.map((item) => {
              const isActive = sortBy === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => {
                    setSortBy(item.value);
                    setIsOpen(false);
                  }}
                  role='option'
                  aria-selected={isActive}
                  className={`flex w-full items-center justify-between px-4 py-2 text-right text-xs transition hover:bg-espresso-clay/5 ${
                    isActive
                      ? "font-semibold text-espresso-clay"
                      : "text-espresso-clay/80"
                  }`}>
                  <span>{item.label}</span>
                  {isActive && (
                    <Check
                      size={14}
                      className='text-espresso-clay'
                      strokeWidth={2}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ----- Desktop/Tablet Button Group (hidden on mobile) ----- */}
      <div
        ref={containerRef}
        className='relative hidden sm:flex sm:flex-wrap sm:items-center sm:gap-2'
        role='radiogroup'
        aria-label='مرتب‌سازی محصولات'
        onKeyDown={handleKeyDown}>
        {/* Sliding pill */}
        {sliderStyle && (
          <div
            className='pointer-events-none absolute rounded-full bg-espresso-clay shadow-md transition-all duration-300 ease-out'
            style={{
              left: sliderStyle.left,
              width: sliderStyle.width,
              top: sliderStyle.top,
              height: sliderStyle.height,
            }}
          />
        )}

        <span className='relative flex items-center gap-1.5 z-10 ml-1 text-sm font-semibold'>
          <BiSortDown className='w-6 h-6' /> مرتب‌سازی:
        </span>

        {sortOptions.map((item) => {
          const isActive = sortBy === item.value;
          return (
            <button
              key={item.value}
              ref={(el) => {
                if (el) {
                  buttonRefs.current.set(item.value, el);
                } else {
                  buttonRefs.current.delete(item.value);
                }
              }}
              onClick={() => setSortBy(item.value)}
              role='radio'
              aria-checked={isActive}
              className={`
                relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium
                transition-colors duration-200 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso-clay/60 focus-visible:ring-offset-2
                ${
                  isActive
                    ? "text-bone-white hover:text-bone-white/90"
                    : "text-espresso-clay/80 hover:bg-espresso-clay/10 hover:text-espresso-clay"
                }
              `}>
              {isActive && (
                <Check
                  size={12}
                  className='text-bone-white'
                  strokeWidth={2.5}
                />
              )}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Screen reader announcement – now computed directly without useState/useEffect */}
      <div className='sr-only' aria-live='polite' aria-atomic='true'>
        مرتب‌سازی بر اساس {currentLabel}
      </div>
    </div>
  );
}
