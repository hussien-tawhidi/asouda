"use client";

import { useState, useEffect, useRef } from "react";
import {  useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className='text-2xl font-bold md:text-5xl'>
      {count}
      {suffix}
    </span>
  );
}
