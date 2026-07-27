"use client";

import Link from "next/link";
import { Mail } from "lucide-react"; // ← new icons
import {
  footerContactInfo,
  footerQuickLinks,
  socialLinks,
} from "@/constant/home-data";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <>
      <footer className='mt-20 border-t border-espresso-clay/20'>
        <div className='container mx-auto px-4 py-12 md:py-16'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-10'>
            {/* ===== BRAND ===== */}
            <div>
              <h2 className='mb-3 text-2xl font-bold md:text-3xl'>
                <span>سرویس خواب اسوده</span>
              </h2>
              <p className='text-sm leading-7 text-espresso-clay/80 md:text-base'>
                ما در مبل رویایی با تمرکز بر طراحی و تولید سرویس خواب، محصولاتی
                با کیفیت، دوام بالا و طراحی زیبا ارائه می‌دهیم تا اتاق خواب شما
                به فضایی آرام و دلنشین تبدیل شود.
              </p>
            </div>

            {/* ===== QUICK LINKS ===== */}
            <div>
              <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider md:text-base'>
                دسترسی سریع
              </h3>
              <ul className='space-y-2.5 text-sm md:text-base'>
                {footerQuickLinks.map(({ title, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className='relative inline-block text-espresso-clay/80 hover:underline underline-offset-4'>
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== CONTACT INFO ===== */}
            <div>
              <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider md:text-base'>
                اطلاعات تماس
              </h3>
              <div className='space-y-3 text-sm md:text-base'>
                {footerContactInfo.map(
                  ({
                    icon: Icon,
                    value,
                    className = "items-center",
                    iconClassName = "",
                  }) => (
                    <div
                      key={value}
                      className={`flex items-start gap-3 ${className} text-espresso-clay/80`}>
                      <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full'>
                        <Icon size={16} className={iconClassName} />
                      </span>
                      <span className='leading-relaxed'>{value}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* ===== SOCIAL + NEWSLETTER ===== */}
            <div>
              <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider md:text-base'>
                ما را دنبال کنید
              </h3>
              <div className='mb-4 flex flex-wrap gap-3'>
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className='group flex h-11 w-11 items-center justify-center rounded-full text-espresso-clay/80'>
                    <Icon
                      size={20}
                      className='transition-transform duration-300 group-hover:scale-110'
                    />
                  </Link>
                ))}
              </div>

              {/* --- NEWSLETTER SIGNUP (新增) --- */}
              <NewsletterSignup />

              {/* Support text */}
              <p className='mt-4 text-sm text-espresso-clay/70'>
                پشتیبانی همه روزه از ساعت ۹ صبح تا ۹ شب
              </p>
            </div>
          </div>

          {/* ===== DIVIDER ===== */}
          <div className='my-8 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800 md:my-10' />

          {/* ===== BOTTOM BAR ===== */}
          <div className='flex flex-col items-center justify-between gap-4 text-center text-xs md:flex-row md:text-sm'>
            <p className='text-espresso-clay/50'>
              © ۱۴۰۴ تمامی حقوق این وب‌سایت محفوظ است.
            </p>
            <div className='flex gap-6 text-espresso-clay/50'>
              <Link
                href='/privacy'
                className='transition-colors hover:underline'>
                حریم خصوصی
              </Link>
              <Link href='/terms' className='transition-colors hover:underline'>
                قوانین سایت
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
