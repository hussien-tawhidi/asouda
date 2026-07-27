"use client";

import { useRouter } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";

export default function SearchHeader({
  count,
  query,
  onSearch,
}: {
  count: number;
  query: string;
  onSearch: (q: string) => void;
}) {
  const router = useRouter();

  const handleSeeAll = () => {
    // Navigate to the search results page
    router.push(`/search?q=${encodeURIComponent(query)}`);
    // Also call the parent callback (e.g., to close the dropdown)
    onSearch(query);
  };

  return (
    <div className='flex items-center justify-between px-1 py-1.5'>
      <span className='text-xs text-earth-brown/50'>
        {count} نتیجه برای {query}
      </span>

      <button
        onClick={handleSeeAll}
        className='text-xs text-earth-brown/60 hover:text-earth-brown flex items-center gap-1'>
        مشاهده همه
        <BsArrowRight className='w-3 h-3' />
      </button>
    </div>
  );
}
