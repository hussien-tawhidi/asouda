"use client";

import { motion } from "framer-motion";
import { Gem, ShieldCheck, Factory, Truck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "کیفیت و ماندگاری بالا",
    desc: "استفاده از متریال مرغوب و باکیفیت در تولید تمامی محصولات",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
  },
  {
    icon: ShieldCheck,
    title: "۱۸ الی ۲۴ ماه ضمانت",
    desc: "ضمانت ۱۸ ماه تا ۲۴ ماه برای تمامی محصولات ",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Factory,
    title: "خرید مستقیم از کارخانه",
    desc: "خرید با بهترین قیمت به صورت مستقیم و بدون واسطه",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
  },
  {
    icon: Truck,
    title: "ارسال به سراسر کشور",
    desc: "ارسال محصولات با باربری مطمئن به سراسر کشور",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSection() {
  return (
    <section className='w-full py-8 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* گرید ویژگی‌ها */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-50px" }}
          className='flex justify-between md:w-[80%] mx-auto items-center gap-2 md:gap-8'>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                // @ts-expect-error this is not important
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className='group relative flex flex-col items-center text-center p-2 md:p-4 bg-bone-white backdrop-blur-sm rounded-2xl border border-earth-brown/10 shadow-lg transition-all duration-300 hover:border-earth-brown/20'>
                {/* افکت گرادیان پس‌زمینه هنگام هاور */}
                <div className='absolute inset-0 rounded-2xl bg-linear-to-br from-earth-brown/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

         

                {/* آیکون با حلقه‌های متحدالمرکز */}
                <div className='relative md:mb-5'>
                  <div className='relative flex items-center justify-center md:w-20 md:h-20 w-14 h-14 rounded-full bg-linear-to-br from-earth-brown/10 to-earth-brown/5 group-hover:scale-110 transition-transform duration-300'>
                    <div className='flex items-center justify-center md:w-14 md:h-14 w-10 h-10 rounded-full bg-bone-white shadow-md group-hover:shadow-lg transition-shadow duration-300'>
                      <Icon
                        className='md:w-7 md:h-7 w-4 h-4 text-earth-brown'
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>
                </div>

                {/* عنوان */}
                <h3 className='md:text-sm text-[10px] font-bold text-earth-brown mb-2 group-hover:text-earth-brown/90 transition-colors'>
                  {feature.title}
                </h3>

                {/* خط تزئینی پایین */}
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-earth-brown/30 group-hover:w-12 transition-all duration-500 rounded-full' />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
