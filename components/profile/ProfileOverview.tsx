import { Heart, Home, MapPin, Package, ShoppingBag } from "lucide-react";
import SectionHeader from "./SectionHeader";
import StatCard from "./StatCard";
import InfoItem from "./InfoItem";
import OrderRow from "./OrderRow";

export default function ProfileOverview() {
  return (
    <section className='space-y-6'>
      {/* Welcome */}
      <div className='rounded-3xl p-6 shadow-sm ring-1 ring-espresso-clay/5 sm:p-8'>
        <p className='text-sm text-espresso-clay/60'>سلام خادم 👋</p>

        <h2 className='mt-2 text-2xl font-bold text-espresso-clay'>
          به حساب کاربری آسوده خوش آمدید
        </h2>

        <p className='mt-2 text-sm leading-7 text-espresso-clay/60'>
          از این قسمت می‌توانید سفارش‌ها، اطلاعات شخصی و علاقه‌مندی‌های خود را
          مدیریت کنید.
        </p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
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

          <div className='min-w-0'>
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
          {/* Desktop header */}
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
  );
}
