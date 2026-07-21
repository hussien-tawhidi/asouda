"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, Star } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 8, label: "سال تجربه", icon: Award, suffix: "+" },
  { value: 500, label: "محصولات", icon: Star, suffix: "+" },
  { value: 1000, label: "مشتری راضی", icon: Users, suffix: "+" },
  { value: 24, label: "پشتیبانی", icon: Clock, suffix: "/۷" },
];

export default function StatsSection() {
  return (
    <section className='relative -mt-8 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <div className='grid grid-cols-2 gap-4 rounded-2xl bg-bone-white/90 backdrop-blur-sm shadow-xl border border-espresso-clay/10 p-6 md:grid-cols-4 md:p-8'>
          {stats.map(({ value, label, icon: Icon, suffix }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className='flex flex-col items-center text-center'>
              <div className='mb-2 rounded-full bg-espresso-clay/10 p-3 text-espresso-clay'>
                <Icon size={24} />
              </div>
              <AnimatedCounter target={value} suffix={suffix} />
              <span className='text-sm text-espresso-clay/70'>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
