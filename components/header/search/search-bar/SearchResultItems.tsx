"use client";

import React from "react";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { MostSellProductType } from "@/types";
import Link from "next/link";

type Props = {
  item: MostSellProductType;
  index: number;
  selected: boolean;
  query: string;
  onClick: (name: string) => void;
  highlightMatch: (text: string | undefined, search: string) => React.ReactNode;
};

export default function SearchResultItem({
  item,
  selected,
  query,
  onClick,
  highlightMatch,
}: Props) {
  const imageSrc =
    item.image?.[0] instanceof File
      ? URL.createObjectURL(item.image[0])
      : item.image?.[0];

  return (
    <Link
      href={item._id}
      role='option'
      aria-selected={selected}
      tabIndex={-1}
      onClick={() => onClick(item.name)}
      className={`
        w-full text-right px-3 py-2.5 rounded-lg transition-all
        flex items-center justify-between gap-3
        ${
          selected
            ? "bg-earth-brown/10 ring-1 ring-earth-brown/20"
            : "hover:bg-earth-brown/5"
        }
      `}>
      <div className='flex items-center gap-3 min-w-0'>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={item.name}
            className='w-8 h-8 rounded object-cover shrink-0'
            width={32}
            height={32}
          />
        )}

        <div className='flex flex-col items-start overflow-hidden'>
          <span className='text-earth-brown text-sm truncate w-full'>
            {highlightMatch(item.name, query)}
          </span>

          {item.description && (
            <span className='text-xs text-earth-brown/40 truncate w-full'>
              {highlightMatch(item.description, query)}
            </span>
          )}
        </div>
      </div>

      <BsArrowRight
        className={`
          w-4 h-4 shrink-0 transition-colors
          ${
            selected
              ? "text-earth-brown/70"
              : "text-earth-brown/20 group-hover:text-earth-brown/50"
          }
        `}
      />
    </Link>
  );
}
