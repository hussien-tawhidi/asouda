// نمونه دیتا برای محصولات (می‌توانید از API یا فایل جداگانه بیاورید)
const products = [
  {
    id: 1,
    name: "سرویس خواب سلطنتی",
    description: "چوب گردو با روکش براق، تشک طبی رویال",
    price: "۳۲,۵۰۰,۰۰۰ تومان",
    badge: "پرفروش",
    image: "/images/bed-1.jpg", // مسیر تصویر را جایگزین کنید
  },
  {
    id: 2,
    name: "سرویس خواب مدرن",
    description: "ام‌دی‌اف با روکش مات، تشک ارتوپد",
    price: "۱۸,۹۰۰,۰۰۰ تومان",
    badge: "تخفیف ویژه",
    image: "/images/bed-2.jpg",
  },
  {
    id: 3,
    name: "سرویس خواب کلاسیک",
    description: "چوب راش با کنده‌کاری، تشک مموری‌فوم",
    price: "۴۵,۲۰۰,۰۰۰ تومان",
    badge: "لوکس",
    image: "/images/bed-3.jpg",
  },
  {
    id: 4,
    name: "سرویس خواب مینیمال",
    description: "فلز و چوب، تشک فنری با رویه هیبریدی",
    price: "۲۸,۷۵۰,۰۰۰ تومان",
    badge: "جدید",
    image: "/images/bed-4.jpg",
  },
];

export default function beddingSet() {
  return (
    <div className='min-h-screen overflow-x-hidden'>
      {/* بخش Hero */}
      <section className='container mx-auto px-4 pt-8 pb-12 md:pt-16 md:pb-20'>
        <div className='flex flex-col lg:flex-row items-center gap-12'>
          <div className='flex-1 text-right space-y-6'>
            <div className='inline-block bg-amber-100/80 text-amber-800 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-amber-200/30'>
              ✨ ویژه‌ی جهیزیه عروس
            </div>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-stone-800'>
              <span className='text-amber-700'>سرویس خواب</span> رویایی
              <br />
              برای شروع زندگی
            </h2>
            <p className='text-stone-600 text-lg max-w-xl leading-relaxed'>
              با بهترین متریال و طراحی‌های به‌روز، آرامش و زیبایی را به اتاق
              خوابتان هدیه دهید. مناسب برای جهیزیه و هر سلیقه‌ای.
            </p>
            <div className='flex flex-wrap gap-4 pt-2'>
              <button className='bg-amber-700 text-white px-8 py-3.5 rounded-full text-lg font-semibold shadow-lg shadow-amber-700/20 hover:shadow-amber-700/30 hover:bg-amber-800 transition-all'>
                مشاهده همه
              </button>
              <button className='bg-white text-stone-700 px-8 py-3.5 rounded-full text-lg font-semibold shadow-md border border-stone-200 hover:border-amber-300 hover:text-amber-800 transition-all'>
                مشاوره رایگان
              </button>
            </div>
            <div className='flex items-center gap-6 text-sm text-stone-500 pt-4'>
              <span className='flex items-center gap-1'>
                <span className='w-2 h-2 bg-emerald-500 rounded-full inline-block'></span>
                ارسال رایگان
              </span>
              <span className='flex items-center gap-1'>
                <span className='w-2 h-2 bg-emerald-500 rounded-full inline-block'></span>
                ضمانت ۵ ساله
              </span>
              <span className='flex items-center gap-1'>
                <span className='w-2 h-2 bg-emerald-500 rounded-full inline-block'></span>
                نصب در منزل
              </span>
            </div>
          </div>

          <div className='flex-1 relative flex justify-center'>
            <div className='relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/10 border-4 border-white/50 backdrop-blur-sm'>
              {/* جایگزین با تصویر واقعی */}
              <div className='w-full h-full bg-gradient-to-br from-amber-200/60 to-stone-300/60 flex items-center justify-center text-stone-600 text-lg font-light'>
                <span className='bg-white/40 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/40'>
                  تصویر سرویس خواب
                </span>
              </div>
            </div>
            {/* دکوراسیون */}
            <div className='absolute -bottom-6 -left-6 w-24 h-24 bg-amber-300/20 rounded-full blur-3xl'></div>
            <div className='absolute -top-6 -right-6 w-32 h-32 bg-stone-300/20 rounded-full blur-3xl'></div>
          </div>
        </div>
      </section>

      {/* بخش محصولات */}
      <section className='container mx-auto px-4 py-12'>
        <div className='flex justify-between items-end mb-8'>
          <div>
            <span className='text-amber-700 font-semibold text-sm tracking-wider'>
              —— مجموعه
            </span>
            <h3 className='text-3xl md:text-4xl font-bold text-stone-800 mt-1'>
              سرویس‌های خواب ویژه جهزیه
            </h3>
          </div>
          <button className='text-amber-700 font-medium hover:underline hidden sm:block'>
            مشاهده همه <span className='mr-1'>←</span>
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-amber-200/40 overflow-hidden'>
              <div className='relative aspect-[4/3] bg-stone-100/70 overflow-hidden'>
                {/* جایگزین با Image از Next.js */}
                <div className='w-full h-full flex items-center justify-center text-stone-400 bg-gradient-to-br from-stone-50 to-stone-200/50'>
                  <span className='text-sm'>تصویر</span>
                </div>
                {product.badge && (
                  <span className='absolute top-3 right-3 bg-amber-700 text-white text-xs px-3 py-1 rounded-full shadow-md'>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className='p-4 text-right'>
                <h4 className='text-lg font-bold text-stone-800 group-hover:text-amber-800 transition'>
                  {product.name}
                </h4>
                <p className='text-stone-500 text-sm mt-1 leading-relaxed'>
                  {product.description}
                </p>
                <div className='flex items-center justify-between mt-3'>
                  <span className='text-amber-800 font-bold text-lg'>
                    {product.price}
                  </span>
                  <button className='bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-100 transition border border-amber-200/30'>
                    افزودن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* بخش مزایا */}
      <section className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/70 shadow-sm text-center'>
            <div className='text-4xl mb-4'>🛋️</div>
            <h5 className='text-xl font-bold text-stone-800'>
              طراحی ارگونومیک
            </h5>
            <p className='text-stone-500 mt-2'>
              متناسب با استانداردهای سلامت خواب
            </p>
          </div>
          <div className='bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/70 shadow-sm text-center'>
            <div className='text-4xl mb-4'>🌿</div>
            <h5 className='text-xl font-bold text-stone-800'>
              مواد اولیه مرغوب
            </h5>
            <p className='text-stone-500 mt-2'>
              چوب طبیعی، پارچه‌های تنفسی و فنرهای باکیفیت
            </p>
          </div>
          <div className='bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/70 shadow-sm text-center'>
            <div className='text-4xl mb-4'>🎁</div>
            <h5 className='text-xl font-bold text-stone-800'>
              بسته‌های ویژه جهزیه
            </h5>
            <p className='text-stone-500 mt-2'>
              تخفیف ویژه و هدایای تکمیلی برای عروس‌ها
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
