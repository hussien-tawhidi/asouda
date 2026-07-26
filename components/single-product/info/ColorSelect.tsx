"use client";

import { useId } from "react";
import { Check } from "lucide-react";

interface Color {
  name: string;
  value: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: number;
  onChange: (index: number) => void;
  /** Show color names below each swatch (default: false) */
  showColorNames?: boolean;
  /** Size of swatches: 'sm' | 'md' | 'lg' (default: 'md') */
  size?: "sm" | "md" | "lg";
}

export default function ColorSelector({
  colors,
  selectedColor,
  onChange,
  showColorNames = false,
  size = "md",
}: ColorSelectorProps) {
  const id = useId();

  if (!colors?.length) return null;

  // Map size to dimensions
  const sizeMap = {
    sm: { swatch: "h-8 w-8", dot: "h-6 w-6", check: 14, text: "text-xs" },
    md: { swatch: "h-10 w-10", dot: "h-8 w-8", check: 18, text: "text-sm" },
    lg: { swatch: "h-12 w-12", dot: "h-10 w-10", check: 22, text: "text-base" },
  };

  const { swatch, dot, text } = sizeMap[size];

  const selectedColorObj = colors[selectedColor];

  return (
    <div className='space-y-3'>
      {/* Label + selected color chip */}
      <div className='flex flex-wrap items-center gap-2'>
        <span className='font-medium text-gray-700'>رنگ:</span>
        <span
          className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium'
          style={{
            backgroundColor: selectedColorObj.value,
            color: isLight(selectedColorObj.value) ? "#1a1a1a" : "#ffffff",
          }}>
          <span
            className='inline-block h-3 w-3 rounded-full border border-black/10'
            style={{ backgroundColor: selectedColorObj.value }}
          />
          {selectedColorObj.name}
        </span>
      </div>

      {/* Swatch grid */}
      <div
        role='radiogroup'
        aria-label='انتخاب رنگ'
        className='flex flex-wrap gap-3'>
        {colors.map((color, index) => {
          const isActive = selectedColor === index;

          return (
            <button
              key={index}
              role='radio'
              aria-checked={isActive}
              aria-labelledby={`${id}-label-${index}`}
              onClick={() => onChange(index)}
              className={`
                group relative flex items-center justify-center rounded-full
                transition-all duration-200 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-espresso-clay focus-visible:ring-offset-2
                ${swatch}
                ${isActive ? "scale-105" : "hover:scale-110"}
              `}
              title={color.name}>
              {/* Color swatch */}
              <span
                className={`
                  rounded-full border border-gray-200/50 transition-all
                  ${dot}
                  ${isActive ? "ring-2 ring-espresso-clay ring-offset-2" : "group-hover:shadow-md"}
                `}
                style={{ backgroundColor: color.value }}
              />

              {/* Checkmark overlay when selected */}
              {isActive && (
                <span
                  className='absolute inset-0 flex items-center justify-center rounded-full'
                  style={{
                    // Semi‑transparent overlay for better checkmark visibility on light colors
                    background: `radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, transparent 70%)`,
                  }}>
                  <Check
                    size={sizeMap[size].check}
                    className='drop-shadow-sm'
                    style={{
                      color: isLight(color.value) ? "#1a1a1a" : "#ffffff",
                    }}
                    strokeWidth={3}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Optional color names under swatches */}
      {showColorNames && (
        <div className='flex flex-wrap gap-3'>
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-10 text-center ${text} text-gray-600`}
              style={{
                width:
                  size === "sm" ? "2rem" : size === "md" ? "2.5rem" : "3rem",
              }}>
              {color.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ----- Helper to determine if a color is light (for text contrast) -----
function isLight(hex: string): boolean {
  // Remove # if present
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}
