import Link from "next/link";

export default function ProductsEmpty() {
  return (
    <div className='rounded-2xl border border-espresso-clay/10 p-6 shadow-sm'>
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <div className='mb-4 text-6xl'>🛏️</div>

        <h3 className='text-lg font-bold'>هیچ محصولی ثبت نشده است</h3>

        <p className='mt-1 text-sm text-espresso-clay/80'>
          اولین محصول خود را ثبت کنید تا در فروشگاه نمایش داده شود.
        </p>

        <Link
          href='/dashboard/create-product'
          className='mt-4 inline-flex items-center gap-2 rounded-xl bg-espresso-clay px-5 py-2.5 text-sm font-medium text-bone-white transition hover:opacity-90'>
          ثبت محصول جدید
        </Link>
      </div>
    </div>
  );
}
