"use client";

import { ArrowUp } from "lucide-react";

interface Types {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ExploreBtn({ title, onClick }: Types) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='group relative isolate mx-auto flex items-center justify-center gap-2 overflow-hidden rounded-full bg-espresso-clay md:px-5 px-3 md:py-2.5 py-1.5 text-nowrap text-xs text-bone-white shadow-xl transition-all duration-300 md:text-lg lg:font-semibold'>
      {title}

      <span className='flex md:h-9 md:w-9 h-5 w-5 items-center justify-center rounded-full border border-bone-white transition-all duration-300 group-hover:rotate-90 group-hover:bg-bone-white'>
        <ArrowUp className='md:h-5 md:w-5 h-3 w-3 rotate-45 transition-colors duration-300 group-hover:text-espresso-clay' />
      </span>
    </button>
  );
}
