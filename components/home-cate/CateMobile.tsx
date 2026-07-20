"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/constant/home-data";
import CateCard from "./CateCard";

export default function CateMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // detect center card
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.offsetWidth / 2;

    let closest = 0;
    let closestDistance = Infinity;

    const children = Array.from(container.children);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children.forEach((child: any, i) => {
      const boxCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - boxCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });

    setActive(closest - 1); // because of spacer
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='md:hidden relative'>
      {/* Fade edges */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-bone-white to-transparent z-10' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-bone-white to-transparent z-10' />

      <div
        ref={containerRef}
        className='flex gap-5 overflow-x-auto px-6 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing'>
        {/* Left spacer */}
        <div className='min-w-[10%]' />

        {categories.map((item, i) => {
          const isActive = i === active;

          return (
            <motion.div
              key={i}
              className='min-w-[80%] snap-center'
              animate={{
                scale: isActive ? 1 : 0.92,
                opacity: isActive ? 1 : 0.6,
              }}
              transition={{ duration: 0.35 }}>
              <CateCard item={item} big />
            </motion.div>
          );
        })}

        {/* Right spacer */}
        <div className='min-w-[10%]' />
      </div>
    </div>
  );
}
