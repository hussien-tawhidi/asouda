"use client";

import { SearchInputProps } from "@/types";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

export default function SearchInput({
  query,
  setQuery,
  onClose,
  onSearch,
}: SearchInputProps) {
  const router = useRouter();
  const handleSeeAll = () => {
    // Navigate to the search results page
    router.push(`/search?q=${encodeURIComponent(query)}`);
    // Also call the parent callback (e.g., to close the dropdown)
    onSearch(query);
  };
  return (
    <div className='flex items-center gap-3 p-4 border-b border-earth-brown/10'>
      {/* دکمه بستن */}
      <button
        onClick={onClose}
        className='p-2 -ml-2 rounded-full hover:bg-earth-brown/10 transition-colors'
        aria-label='بستن جستجو'>
        <CgClose className='w-5 h-5 text-earth-brown' />
      </button>

      {/* فیلد ورودی */}
      <div className='relative flex-1'>
        <BiSearch
          className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-brown/40'
          onClick={handleSeeAll}
        />
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(query);
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
    </div>
  );
}
