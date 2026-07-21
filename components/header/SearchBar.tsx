"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { BsArrowRight, BsClock } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

// نمونه داده برای پیشنهادات و نتایج
const POPULAR_SUGGESTIONS = [
  "کالکشن تابستانی",
  "روتختی ساتن",
  "سرویس خواب کودک",
  "ملحفه نخی",
  "بالش طبی",
];

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

  // نتیجه‌های ساختگی بر اساس query
  const getFilteredResults = () => {
    if (!query.trim()) return [];
    const allItems = [
      "سرویس خواب رویایی",
      "روتختی مخمل",
      "ملحفه ۱۰۰٪ پنبه",
      "بالش ارگونومیک",
      "سرویس خواب نخی",
      "روبالشی ساتن",
    ];
    return allItems.filter((item) => item.includes(query));
  };

  const filteredResults = getFilteredResults();

  return (
    <>
      {/* دکمه بازکننده */}
      <button
        onClick={openSearch}
        className='p-2 rounded-full hover:bg-earth-brown/10 transition-colors duration-200'
        aria-label='جستجو'>
        <BiSearch className='w-5 h-5' />
      </button>

      {/* اورلی جستجو */}
      {isOpen && (
        <div
          ref={overlayRef}
          className='fixed inset-0 z-9999 h-screen bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 animate-in fade-in duration-300'
          onClick={handleOverlayClick}>
          <div className='w-full max-w-2xl bg-bone-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-10 duration-300'>
            {/* نوار بالا */}
            <div className='flex items-center gap-3 p-4 border-b border-earth-brown/10'>
              {/* دکمه بستن */}
              <button
                onClick={closeSearch}
                className='p-2 -ml-2 rounded-full hover:bg-earth-brown/10 transition-colors'
                aria-label='بستن جستجو'>
                <CgClose className='w-5 h-5 text-earth-brown' />
              </button>

              {/* فیلد ورودی */}
              <div className='relative flex-1'>
                <BiSearch className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-brown/40' />
                <input
                  ref={inputRef}
                  type='text'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(query);
                    }
                  }}
                  placeholder='جستجو در سرویس خواب...'
                  className='w-full pr-10 pl-10 py-2.5 bg-earth-brown/5 rounded-xl text-earth-brown placeholder:text-earth-brown/40 outline-none focus:ring-2 focus:ring-earth-brown/20 transition-all'
                  dir='rtl'
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className='absolute left-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-earth-brown/10 transition-colors'
                    aria-label='پاک کردن متن'>
                    <CgClose className='w-4 h-4 text-earth-brown/50' />
                  </button>
                )}
              </div>

              {/* دکمه جستجو */}
              <button
                onClick={() => handleSearch(query)}
                className='px-4 py-2 bg-earth-brown text-white rounded-xl hover:bg-earth-brown/90 transition-colors text-sm font-medium whitespace-nowrap'>
                جستجو
              </button>
            </div>

            {/* محتوای پایین */}
            <div className='p-4 max-h-[70vh] overflow-y-auto'>
              {!query ? (
                // حالت پیش‌فرض (تاریخچه و محبوب‌ها)
                <div className='space-y-6'>
                  {/* تاریخچه جستجو */}
                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className='text-xs font-semibold text-earth-brown/50 uppercase tracking-wider mb-3 flex items-center gap-2'>
                        <BsClock className='w-3.5 h-3.5' />
                        جستجوهای اخیر
                      </h3>
                      <div className='flex flex-wrap gap-2'>
                        {recentSearches.map((item) => (
                          <button
                            key={item}
                            onClick={() => handleSearch(item)}
                            className='px-3 py-1.5 bg-earth-brown/5 hover:bg-earth-brown/10 rounded-full text-sm text-earth-brown transition-colors flex items-center gap-1.5'>
                            <BsClock className='w-3 h-3' />
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* پیشنهادات محبوب */}
                  <div>
                    <h3 className='text-xs font-semibold text-earth-brown/50 uppercase tracking-wider mb-3'>
                      پیشنهادات ویژه
                    </h3>
                    <div className='grid grid-cols-2 gap-2'>
                      {POPULAR_SUGGESTIONS.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleSearch(item)}
                          className='text-right px-3 py-2 bg-earth-brown/5 hover:bg-earth-brown/10 rounded-lg text-sm text-earth-brown transition-colors flex items-center justify-between group'>
                          <span>{item}</span>
                          <BsArrowRight className='w-3.5 h-3.5 text-earth-brown/30 group-hover:text-earth-brown/60 transition-colors' />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // نتایج جستجو
                <div>
                  {filteredResults.length > 0 ? (
                    <div className='space-y-1'>
                      <p className='text-xs text-earth-brown/50 mb-2'>
                        {filteredResults.length} نتیجه برای {query}
                      </p>
                      {filteredResults.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleSearch(item)}
                          className='w-full text-right px-3 py-2.5 hover:bg-earth-brown/5 rounded-lg transition-colors flex items-center justify-between group'>
                          <span className='text-earth-brown'>{item}</span>
                          <BsArrowRight className='w-4 h-4 text-earth-brown/20 group-hover:text-earth-brown/50 transition-colors' />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className='text-center py-10'>
                      <div className='w-16 h-16 bg-earth-brown/5 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <BiSearch className='w-6 h-6 text-earth-brown/30' />
                      </div>
                      <p className='text-earth-brown/70 font-medium'>
                        نتیجه‌ای یافت نشد
                      </p>
                      <p className='text-sm text-earth-brown/40 mt-1'>
                        عبارت دیگری را امتحان کنید یا از پیشنهادات استفاده کنید.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
