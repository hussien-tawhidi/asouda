"use client";

import Link from "next/link";
import {
  ChevronLeft,
  Heart,
  Home,
  LogOut,
  MapPin,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import StatCard from "@/components/profile/StatCard";
import SectionHeader from "@/components/profile/SectionHeader";
import InfoItem from "@/components/profile/InfoItem";
import OrderRow from "@/components/profile/OrderRow";
import { profileMenuItems } from "@/constant/home-data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();
  console.log("🚀 ~ ProfilePage ~ session:", session)
  const router = useRouter();

  if (!session) {
    return router.push("/signin");
    }
    
  return (
    <main
      dir='rtl'
      className='min-h-screen bg-bone-white/40 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        {/* Page heading */}
        <div className='mb-8'>
          <p className='mb-2 text-sm text-espresso-clay/60'>حساب کاربری</p>

          <h1 className='text-2xl font-bold text-espresso-clay sm:text-3xl'>
            پروفایل من
          </h1>
        </div>

        <div className='grid gap-6 lg:grid-cols-[260px_1fr]'>
          {/* Sidebar */}
          <aside className='h-fit rounded-3xl border border-espresso-clay/10 p-3 shadow-sm'>
            {/* User */}
            <div className='mb-3 rounded-2xl bg-espresso-clay px-4 py-5 text-bone-white'>
              <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bone-white/15'>
                <User size={26} strokeWidth={1.5} />
              </div>

              <h2 className='font-semibold'>خادم توحیدی</h2>

              <p className='mt-1 text-xs text-bone-white/60'>حساب کاربری شما</p>
            </div>

            {/* Navigation */}
            <nav className='space-y-1'>
              {profileMenuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-espresso-clay/70 transition hover:bg-espresso-clay/5 hover:text-espresso-clay'>
                    <div className='flex items-center gap-3'>
                      <Icon
                        size={18}
                        strokeWidth={1.7}
                        className='transition group-hover:scale-105'
                      />

                      <span>{item.label}</span>
                    </div>

                    <ChevronLeft
                      size={15}
                      className='opacity-0 transition group-hover:opacity-50'
                    />
                  </Link>
                );
              })}
            </nav>

            <div className='my-3 h-px bg-espresso-clay/10' />

            {/* Logout */}
            <button className='flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 transition hover:bg-red-50'>
              <LogOut size={18} strokeWidth={1.7} />

              <span>خروج از حساب</span>
            </button>
          </aside>

          {/* Main content */}
          <section className='space-y-6'>
            {/* Welcome */}
            <div className='rounded-3xl p-6 shadow-sm ring-1 ring-espresso-clay/5 sm:p-8'>
              <p className='text-sm text-espresso-clay/60'>سلام خادم 👋</p>

              <h2 className='mt-2 text-2xl font-bold text-espresso-clay'>
                به حساب کاربری آسوده خوش آمدید
              </h2>

              <p className='mt-2 text-sm leading-7 text-espresso-clay/60'>
                از این قسمت می‌توانید سفارش‌ها، اطلاعات شخصی و علاقه‌مندی‌های
                خود را مدیریت کنید.
              </p>
            </div>

            {/* Stats */}
            <div className='grid md:gap-4 gap-2 grid-cols-4'>
              <StatCard icon={ShoppingBag} title='سفارش‌ها' value='۱۲' />

              <StatCard icon={Heart} title='علاقه‌مندی‌ها' value='۵' />

              <StatCard icon={Package} title='در حال پردازش' value='۲' />

              <StatCard icon={Home} title='تکمیل شده' value='۸' />
            </div>

            {/* Personal information */}
            <section className='rounded-3xl p-6 shadow-sm ring-1 ring-espresso-clay/5 sm:p-8'>
              <SectionHeader
                title='اطلاعات شخصی'
                href='/profile/edit'
                action='ویرایش اطلاعات'
              />

              <div className='mt-6 grid gap-px overflow-hidden rounded-2xl bg-espresso-clay/10 sm:grid-cols-2'>
                <InfoItem label='نام و نام خانوادگی' value='خادم توحیدی' />

                <InfoItem label='شماره تلفن' value='۰۹۱۲۱۲۳۴۵۶۷' />

                <InfoItem label='ایمیل' value='example@email.com' />

                <InfoItem label='تاریخ عضویت' value='۱۴۰۴/۰۵/۱۲' />
              </div>
            </section>

            {/* Address */}
            <section className='rounded-3xl p-6 shadow-sm ring-1 ring-espresso-clay/5 sm:p-8'>
              <SectionHeader
                title='آدرس پیش‌فرض'
                href='/profile/addresses'
                action='مدیریت آدرس‌ها'
              />

              <div className='mt-5 flex gap-4 rounded-2xl bg-bone-white/60 p-5'>
                <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso-clay/10 text-espresso-clay'>
                  <MapPin size={20} />
                </div>

                <div>
                  <p className='font-semibold text-espresso-clay'>آدرس منزل</p>

                  <p className='mt-2 text-sm leading-7 text-espresso-clay/60'>
                    تهران، خیابان ولیعصر، کوچه نمونه، پلاک ۱۲
                  </p>
                </div>
              </div>
            </section>

            {/* Recent orders */}
            <section className='rounded-3xl p-6 shadow-sm ring-1 ring-espresso-clay/5 sm:p-8'>
              <SectionHeader
                title='آخرین سفارش‌ها'
                href='/profile/orders'
                action='مشاهده همه'
              />

              <div className='mt-5 overflow-hidden rounded-2xl border border-espresso-clay/10'>
                <div className='hidden grid-cols-4 bg-bone-white/60 px-5 py-4 text-xs font-semibold text-espresso-clay/60 sm:grid'>
                  <span>شماره سفارش</span>
                  <span>تاریخ</span>
                  <span>مبلغ</span>
                  <span>وضعیت</span>
                </div>

                <OrderRow
                  order='#AS-1024'
                  date='۲۸ مرداد ۱۴۰۵'
                  price='۱۲,۵۰۰,۰۰۰ تومان'
                  status='تحویل شده'
                />

                <OrderRow
                  order='#AS-1018'
                  date='۲۰ مرداد ۱۴۰۵'
                  price='۸,۹۰۰,۰۰۰ تومان'
                  status='در حال پردازش'
                />
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
