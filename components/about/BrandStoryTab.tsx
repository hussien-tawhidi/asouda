"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aboutUsStoryTabs } from "@/constant/home-data";

export default function BrandStoryTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className='py-20'>
      <div className='container mx-auto max-w-6xl px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className='text-center'>
          <span className='inline-block rounded-full bg-espresso-clay/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-espresso-clay'>
            داستان برند
          </span>
          <h2 className='mt-4 text-2xl font-bold text-espresso-clay md:text-4xl'>
            روایت <span className='text-earth-brown'>آسوده</span>
          </h2>
        </motion.div>

        <div className='md:mt-8 mt-3'>
          <div className='flex flex-wrap justify-center gap-2 rounded-xl bg-espresso-clay/5 p-2'>
            {aboutUsStoryTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`rounded-lg px-6 py-2.5 md:text-sm text-xs font-medium transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-espresso-clay text-bone-white shadow-lg"
                    : "text-espresso-clay/70 hover:bg-espresso-clay/10"
                }`}>
                {tab.title}
              </button>
            ))}
          </div>

          <div className='md:mt-6 mt-3 rounded-2xl bg-espresso-clay text-bone-white p-8 shadow-sm border border-espresso-clay/10'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='text-center'>
                <p className='md:text-lg text-[10px] leading-relaxed'>
                  {aboutUsStoryTabs[activeTab].content}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
