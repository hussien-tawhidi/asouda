"use client";

import { motion } from "framer-motion";
import { aboutUdValues } from "@/constant/home-data";

export default function CoreValues() {
  return (
    <section className='py-16 md:py-20'>
      <div className='container mx-auto max-w-6xl px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className='mb-12 text-center'>
          <h2 className='text-3xl font-bold text-espresso-clay md:text-4xl'>
            ارزش‌های <span className='text-earth-brown'>ما</span>
          </h2>
          <div className='mx-auto mt-3 h-1 w-20 rounded-full bg-earth-brown' />
          <p className='mt-3 text-espresso-clay/70'>
            اصولی که در تمام مراحل کار ما نقش دارند
          </p>
        </motion.div>

        <div className='grid md:gap-6 gap-2 grid-cols-2 lg:grid-cols-4'>
          {aboutUdValues.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className='group relative overflow-hidden rounded-2xl border border-espresso-clay/10 backdrop-blur-sm md:p-6 p-2 text-center shadow-sm transition-all duration-500 hover:border-espresso-clay/20 hover:shadow-xl'>
              <div className='absolute inset-0 bg-linear-to-br from-espresso-clay/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
              <div className='relative'>
                <div className='mx-auto md:mb-4 mb-2 flex md:h-14 md:w-14 h-10 w-10 items-center justify-center rounded-full bg-espresso-clay/10 text-espresso-clay transition-all duration-500 group-hover:scale-110 group-hover:bg-espresso-clay group-hover:text-bone-white'>
                  <Icon className="md:w-8 md:h-8 w-6 h-6"/>
                </div>
                <h3 className='md:text-lg text-xs font-bold text-espresso-clay'>
                  {title}
                </h3>
                <p className='mt-1 md:text-sm text-[10px] text-espresso-clay/70'>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
