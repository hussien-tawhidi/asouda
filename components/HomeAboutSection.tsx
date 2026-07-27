"use client";

import Image from "next/image";
import { CheckCircle, Gem, Ruler, Shield } from "lucide-react";
import Link from "next/link";

export default function HomeAboutSection() {
  // List of core values for the "چرا آسوده" section
  const values = [
    {
      icon: Gem,
      title: "کیفیت برتر",
      desc: "انتخاب دقیق مواد اولیه و کنترل کیفیت در تمام مراحل تولید",
    },
    {
      icon: Ruler,
      title: "طراحی بی‌نظیر",
      desc: "تلفیق هنر و مهندسی برای خلق محصولاتی زیبا و کاربردی",
    },
    {
      icon: Shield,
      title: "دوام و استحکام",
      desc: "ساخت با استانداردهای روز دنیا برای ماندگاری طولانی",
    },
    {
      icon: CheckCircle,
      title: "پشتیبانی همراه",
      desc: "خدمات پس از فروش و پاسخگویی صادقانه در تمام مراحل",
    },
  ];

  return (
    <section className='relative py-16 lg:py-24 overflow-hidden'>
      <div className='container relative mx-auto max-w-5xl px-4'>
        {/* ----- HEADER ----- */}
        <div className='mb-12 text-center md:mb-16'>
          <span className='inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary'>
            درباره ما
          </span>
          <h1 className='mt-4 text-3xl font-extrabold md:text-5xl lg:text-6xl'>
            درباره{" "}
            <span className='bg-linear-to-r from-mushroom-beige to-espresso-clay bg-clip-text text-transparent'>
              آسوده
            </span>
          </h1>
          <div className='mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r from-bone-white to-espresso-clay' />
          <p className='mx-auto mt-4 max-w-2xl text-base text-espresso-clay/80 md:text-lg'>
            آرامش، کیفیت و زیبایی را به خانه‌تان هدیه می‌دهیم
          </p>
        </div>

        {/* ===== IMAGE + TEXT SPLIT LAYOUT (NEW) ===== */}
        <div className='grid gap-8 md:grid-cols-2 md:gap-12 items-center'>
          {/* Image - left side on desktop */}
          <div className='relative overflow-hidden rounded-2xl shadow-lg order-1 md:order-1'>
            <Image
              src='/about.jpg' // ← Replace with your actual image path
              alt='سرویس خواب آسوده - آرامش و کیفیت'
              width={400}
              height={400}
              className='object-cover transition-transform duration-700 hover:scale-105 w-full h-full'
            />
            {/* Subtle linear overlay for depth */}
            <div className='absolute inset-0 bg-linear-to-t from-black/10 to-transparent' />
          </div>

          {/* Text - right side on desktop */}
          <div className='space-y-6 order-2 md:order-2'>
            <div>
              <h2 className='text-xl font-bold md:text-2xl'>
                رسالت و داستان ما
              </h2>
              <div className='mt-2 h-1 w-12 rounded-full bg-primary' />
            </div>
            <p className='text-justify leading-8 text-espresso-clay/90'>
              در آسوده، باور داریم که اتاق خواب تنها بخشی از خانه نیست؛ بلکه
              فضایی برای آرامش، آسودگی و آغاز هر روزی تازه است. به همین دلیل،
              رسالت خود را فراتر از تولید یک محصول می‌دانیم و تلاش می‌کنیم با
              خلق سرویس‌های خواب باکیفیت، تجربه‌ای از زیبایی، آرامش و ماندگاری
              را به خانه‌های ایرانی هدیه دهیم.
            </p>
            <p className='text-justify leading-8 text-espresso-clay/90'>
              آسوده با تکیه بر دانش، تجربه و عشق به هنر تولید، فعالیت خود را در
              زمینه طراحی و ساخت انواع سرویس خواب آغاز کرده است. از همان روز
              نخست، هدف ما ارائه محصولاتی بوده که علاوه بر زیبایی ظاهری، از نظر
              کیفیت ساخت، استحکام و دوام نیز در بالاترین سطح قرار داشته باشند.
            </p>
          </div>
        </div>

        {/* ----- PULL QUOTE ----- */}
        <div className='my-12 border-r-4 border-primary/30 bg-primary/5 px-6 py-4 text-right md:my-16 md:px-10 md:py-6'>
          <p className='text-lg font-medium italic md:text-xl'>
            «کیفیت واقعی در جزئیات شکل می‌گیرد؛ از انتخاب دقیق مواد اولیه تا
            ظرافت در طراحی و کنترل کیفیت نهایی.»
          </p>
        </div>

        {/* ----- REMAINING PARAGRAPHS (with visual separators) ----- */}
        <div className='space-y-8'>
          {[
            "تمام محصولات آسوده با دقت و وسواس فراوان تولید می‌شوند تا پاسخگوی نیاز خانواده‌هایی باشند که به کیفیت، زیبایی و دوام اهمیت می‌دهند. ما در فرآیند تولید از متریال باکیفیت و روش‌های استاندارد بهره می‌بریم و هر محصول پیش از رسیدن به دست مشتری، مراحل مختلف بررسی و کنترل کیفیت را پشت سر می‌گذارد.",
            "ما مجموعه‌ای از سرویس‌های خواب مدرن، کلاسیک و نئوکلاسیک را تولید می‌کنیم تا پاسخگوی سلیقه‌های مختلف باشیم. همچنین امکان انتخاب رنگ، ابعاد و برخی جزئیات محصولات برای بسیاری از مدل‌ها فراهم شده است تا هر مشتری بتواند محصولی متناسب با فضای منزل خود انتخاب کند.",
            "در آسوده، رابطه ما با مشتری تنها به خرید ختم نمی‌شود. ما این ارتباط را بر پایه اعتماد، احترام و مسئولیت‌پذیری بنا کرده‌ایم و همواره تلاش می‌کنیم با ارائه خدمات مناسب، پاسخگویی صادقانه و همراهی در تمامی مراحل خرید، تجربه‌ای مطمئن و رضایت‌بخش ایجاد کنیم.",
          ].map((text, idx) => (
            <div key={idx} className='relative'>
              {/* Small decorative line */}
              <div className='absolute -top-4 right-0 h-0.5 w-12 bg-linear-to-l from-primary to-transparent' />
              <p className='text-justify leading-8 text-espresso-clay/90'>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* ----- VALUES GRID (چرا آسوده) ----- */}
        <div className='mt-16'>
          <h2 className='mb-8 text-center text-2xl font-bold md:text-3xl'>
            چرا <span className='text-primary'>آسوده</span>؟
          </h2>
          <div className='grid  md:gap-6 gap-3 grid-cols-2 lg:grid-cols-4'>
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className='group rounded-2xl border border-espresso-clay/10 p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5'>
                <div className='mx-auto md:mb-4 mb-2 flex md:h-14 md:w-14 h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white'>
                  <Icon size={28} />
                </div>
                <h3 className='mb-1 md:text-lg text-xs font-bold'>{title}</h3>
                <p className='md:text-sm text-[10px] text-espresso-clay/90'>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ----- CLOSING CTA CARD ----- */}
        <div className='mt-16 rounded-2xl p-8 text-center shadow-sm md:mt-20 md:p-12'>
          <h3 className='text-2xl font-bold md:text-3xl'>
            <span className='bg-linear-to-r from-mushroom-beige to-espresso-clay bg-clip-text text-transparent'>
              آسوده
            </span>
            ؛ آرامش، کیفیت و زیبایی، در کنار هم.
          </h3>
          <p className='mx-auto mt-3 max-w-2xl text-espresso-clay/80'>
            امروز آسوده با افتخار در کنار خانواده‌های ایرانی قرار دارد و تلاش
            می‌کند با تولید سرویس‌های خواب باکیفیت، سهمی در ایجاد خانه‌هایی
            آرام‌تر، زیباتر و دلنشین‌تر داشته باشد. اعتماد شما ارزشمندترین
            سرمایه ماست.
          </p>
          <div className='mt-6 flex flex-wrap items-center justify-center gap-4'>
            <Link
              href='/products'
              className='inline-flex items-center rounded-full bg-espresso-clay text-bone-white px-6 py-3 text-sm font-medium transition'>
              مشاهده محصولات
            </Link>
            <Link
              href='/contact'
              className='inline-flex items-center rounded-full border border-primary/20 px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary/5'>
              تماس با ما
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
