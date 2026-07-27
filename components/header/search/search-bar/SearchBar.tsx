"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef, useCallback } from "react";
import SearchTriggerButton from "../SearchTriggerButton";
import SearchInput from "../SearchInput";
import SearchSuggestions from "../SearchSuggestions";
import SearchResults from "../SearchResults";
import { BsClock } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const RECENT_SEARCHES_KEY = "recentSearches";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // بارگذاری تاریخچه جستجو از localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  // ذخیره تاریخچه در localStorage
  const saveRecentSearch = useCallback(
    (term: string) => {
      if (!term.trim()) return;
      const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(
        0,
        5,
      );
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    },
    [recentSearches],
  );

  // باز کردن و فوکوس
  const openSearch = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
  };

  // مدیریت کلید ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // جلوگیری از اسکرول پس‌زمینه هنگام باز بودن
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // کلیک روی overlay برای بستن (به جز روی کارت جستجو)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeSearch();
    }
  };

  // اجرای جستجو
  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    saveRecentSearch(term);
    // اینجا می‌توانید به صفحه نتایج هدایت کنید یا API را فراخوانی کنید
    console.log("جستجو برای:", term);
    // مثال: router.push(`/search?q=${encodeURIComponent(term)}`);
    closeSearch();
  };
  const clearRecentSearches = () => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSearches([]);
  };
  const removeRecentSearch = (term: string) => {
    const updated = recentSearches.filter((item) => item !== term);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };
  return (
    <>
      {/* دکمه بازکننده */}
      <SearchTriggerButton onClick={openSearch} />

      {/* اورلی جستجو */}
      {isOpen && (
        <div
          ref={overlayRef}
          className='fixed inset-0 z-9999 h-screen bg-espresso-clay/50 backdrop-blur-sm flex items-start justify-center p-4 animate-in fade-in duration-300'
          onClick={handleOverlayClick}>
          <div className='w-full max-w-2xl bg-bone-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-10 duration-300'>
            {/* نوار بالا */}
            <SearchInput
              onClose={closeSearch}
              onSearch={handleSearch}
              query={query}
              setQuery={setQuery}
            />

            {/* محتوای پایین */}
            <div className='p-4 max-h-[70vh] overflow-y-auto'>
              {!query ? (
                // حالت پیش‌فرض (تاریخچه و محبوب‌ها)
                <div className='space-y-6'>
                  {/* تاریخچه جستجو */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className='flex items-center justify-between mb-3'>
                        <h3 className='text-xs font-semibold text-earth-brown/50 uppercase tracking-wider flex items-center gap-2'>
                          <BsClock className='w-3.5 h-3.5' />
                          جستجوهای اخیر
                        </h3>

                        {/* ✅ Clear button */}
                        <button
                          onClick={clearRecentSearches}
                          className='text-xs flex items-center gap-1 text-red-700 hover:underline'>
                          حذف تاریخچه <AiOutlineDelete />
                        </button>
                      </div>

                      <div className='flex flex-wrap gap-2'>
                        {recentSearches.map((item) => (
                          <div key={item} className='relative group'>
                            <button
                              onClick={() => handleSearch(item)}
                              className='px-3 py-1.5 bg-earth-brown/5 hover:bg-earth-brown/10 rounded-full text-sm text-earth-brown transition-colors flex items-center gap-1.5'>
                              <BsClock className='w-3 h-3' />
                              {item}
                            </button>

                            {/* 🔥 Optional remove single */}
                            <button
                              onClick={() => removeRecentSearch(item)}
                              className='absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] hidden group-hover:flex items-center justify-center'>
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* پیشنهادات محبوب */}
                  <SearchSuggestions
                    onSearch={handleSearch}
                    recentSearches={recentSearches}
                  />
                </div>
              ) : (
                // نتایج جستجو
                <SearchResults onSearch={handleSearch} query={query} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
