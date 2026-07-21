"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Quote, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { aboutUsTestimonials } from "@/constant/home-data";

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % aboutUsTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const current = aboutUsTestimonials[index];

  return (
    <section className='py-16 bg-espresso-clay/5 md:py-20'>
      <div className='container mx-auto max-w-4xl px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className='mb-10 text-center'>
          <h2 className='text-3xl font-bold text-espresso-clay md:text-4xl'>
            نظر <span className='text-earth-brown'>مشتریان</span>
          </h2>
          <div className='mx-auto mt-3 h-1 w-20 rounded-full bg-earth-brown' />
        </motion.div>

        <div className='relative overflow-hidden rounded-2xl md:p-8 p-4 shadow-lg border border-espresso-clay/10'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className='text-center'>
              <Quote className='mx-auto md:h-12 md:w-12 w-8 h-8 text-espresso-clay/20' />
              <p className='mt-4 md:text-lg text-xs leading-relaxed text-espresso-clay/80'>
                {current.content}
              </p>
              <div className='mt-4 flex items-center justify-center gap-2'>
                <div className='flex gap-0.5'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className='fill-amber-400 text-amber-400'
                    />
                  ))}
                </div>
              </div>
              <div className='mt-4'>
                <p className='font-bold text-espresso-clay'>{current.name}</p>
                <p className='text-sm text-espresso-clay/60'>{current.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className='mt-6 flex items-center justify-center gap-4'>
            <button
              onClick={() =>
                setIndex((prev) =>
                  prev === 0 ? aboutUsTestimonials.length - 1 : prev - 1,
                )
              }
              className='rounded-full border border-espresso-clay/20 p-2 transition hover:bg-espresso-clay/5'>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className='rounded-full border border-espresso-clay/20 px-4 py-1.5 text-xs font-medium transition hover:bg-espresso-clay/5'>
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              onClick={() =>
                setIndex((prev) =>
                  prev === aboutUsTestimonials.length - 1 ? 0 : prev + 1,
                )
              }
              className='rounded-full border border-espresso-clay/20 p-2 transition hover:bg-espresso-clay/5'>
              <ArrowLeft size={18} />
            </button>
          </div>

          <div className='mt-4 flex justify-center gap-1.5'>
            {aboutUsTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === index
                    ? "w-8 bg-espresso-clay"
                    : "w-2 bg-espresso-clay/20 hover:bg-espresso-clay/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
