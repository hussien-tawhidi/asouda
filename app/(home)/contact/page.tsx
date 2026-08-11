"use client";

import SocialIconsContact from "@/components/common/SocialIconsContact";
import ContactForm from "@/components/contact/ContactForm";
import { contactInfo } from "@/constant/home-data";
import Link from "next/link";
import { BiMap } from "react-icons/bi";

export default function ContactPage() {
  return (
    <div className='min-h-screen py-12 md:py-20'>
      <div className='container mx-auto max-w-6xl px-4'>
        {/* ===== HEADER ===== */}
        <div className='mb-12 text-center'>
          <span className='inline-block rounded-full bg-espresso-clay/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-espresso-clay'>
            ارتباط با ما
          </span>
          <h1 className='mt-4 text-3xl font-bold text-espresso-clay md:text-4xl lg:text-5xl'>
            تماس با <span className='text-earth-brown'>آسوده</span>
          </h1>
          <div className='mx-auto mt-3 h-1 w-20 rounded-full bg-linear-to-r from-espresso-clay to-earth-brown' />
          <p className='mx-auto mt-4 max-w-2xl text-base text-espresso-clay/70 md:text-lg'>
            ما همواره در کنار شما هستیم. سوالات، پیشنهادات و نظرات خود را با ما
            در میان بگذارید.
          </p>
        </div>

        {/* ===== CONTACT INFO CARDS ===== */}
        <div className='mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4'>
          {contactInfo.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className='group rounded-2xl border border-espresso-clay/10 md:p-6 p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-espresso-clay/20 hover:shadow-lg'>
                <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-espresso-clay/10 text-espresso-clay transition-colors group-hover:bg-espresso-clay group-hover:text-bone-white'>
                  <Icon size={22} />
                </div>
                <h3 className='text-sm font-semibold text-espresso-clay'>
                  {item.title}
                </h3>
                {item.link ? (
                  <Link
                    dir={
                      typeof item.value === "string" &&
                      /^[+\d\s()-]+$/.test(item.value)
                        ? "ltr"
                        : undefined
                    }
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel='noopener noreferrer'
                    className='mt-1 block md:text-sm text-[10px] text-espresso-clay/70 transition hover:text-earth-brown'>
                    {item.value}
                  </Link>
                ) : (
                  <>
                    <p className='mt-1 md:text-sm text-[10px] text-espresso-clay/70'>
                      {item.value}
                    </p>
                    {item.subtitle && (
                      <p className='md:text-xs text-[9px] text-espresso-clay/50'>
                        {item.subtitle}
                      </p>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ===== FORM + MAP SECTION ===== */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-5'>
          {/* Contact Form */}
          <div className='lg:col-span-3'>
            <div className='rounded-2xl border border-espresso-clay/10 p-6 shadow-sm md:p-8'>
              <h2 className='mb-6 text-xl font-bold text-espresso-clay'>
                ارسال پیام
              </h2>

              <ContactForm />
            </div>
          </div>

          {/* Map & Social */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Map Placeholder */}
            <div className='overflow-hidden rounded-2xl border border-espresso-clay/10 bg-white shadow-sm'>
              <div className='relative h-48 w-full bg-espresso-clay/5 md:h-56'>
                {/* Replace with actual map component if needed */}
                <div className='flex h-full items-center justify-center'>
                  <div className='text-center'>
                    <BiMap
                      size={40}
                      className='mx-auto text-espresso-clay/30'
                    />
                    <p className='mt-2 text-sm text-espresso-clay/50'>
                      نقشه گوگل (Placeholder)
                    </p>
                    <p className='text-xs text-espresso-clay/30'>
                      تهران، خیابان آزادی
                    </p>
                  </div>
                </div>
                {/* You can embed Google Maps iframe here */}
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3239.4635752815307!2d51.878834942935946!3d35.71481597649133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQyJzUzLjMiTiA1McKwNTInNTIuNCJF!5e0!3m2!1sen!2snl!4v1786435140487!5m2!1sen!2snl'
                  className='absolute inset-0 h-full w-full'
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className='rounded-2xl border border-espresso-clay/10 p-6 shadow-sm'>
              <h3 className='mb-4 text-lg font-bold text-espresso-clay'>
                ما را دنبال کنید
              </h3>
              <SocialIconsContact />
              <p className='mt-4 text-xs text-espresso-clay/50'>
                پاسخگویی همه روزه از ساعت ۹ صبح تا ۹ شب
              </p>
            </div>
          </div>
        </div>

        {/* ===== FAQ / ADDITIONAL INFO ===== */}
        <div className='mt-12 rounded-2xl border border-espresso-clay/10 p-6 shadow-sm md:p-8'>
          <h3 className='text-center text-lg font-bold text-espresso-clay'>
            سوالات متداول
          </h3>
          <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='rounded-xl bg-bone-white/50 p-4'>
              <h4 className='font-semibold text-espresso-clay'>
                چگونه می‌توانم سفارش خود را پیگیری کنم؟
              </h4>
              <p className='mt-1 text-sm text-espresso-clay/70'>
                پس از ثبت سفارش، کد رهگیری برای شما ارسال می‌شود. همچنین
                می‌توانید از طریق پنل کاربری خود سفارش را پیگیری کنید.
              </p>
            </div>
            <div className='rounded-xl bg-bone-white/50 p-4'>
              <h4 className='font-semibold text-espresso-clay'>
                هزینه ارسال چگونه محاسبه می‌شود؟
              </h4>
              <p className='mt-1 text-sm text-espresso-clay/70'>
                هزینه ارسال بر اساس وزن محصول و آدرس تحویل محاسبه می‌شود. برای
                خرید‌های بالای ۵ میلیون تومان، ارسال رایگان است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
