export default function ProductsLoading() {
  return (
    <div className='rounded-2xl p-6 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='h-7 w-40 animate-pulse rounded bg-espresso-clay/10' />
        <div className='h-5 w-24 animate-pulse rounded bg-espresso-clay/10' />
      </div>

      <div className='mt-6 space-y-4'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className='flex animate-pulse items-center gap-4 rounded-lg border border-gray-100 p-3'>
            <div className='h-12 w-12 rounded-lg bg-espresso-clay/10' />

            <div className='flex-1 space-y-2'>
              <div className='h-4 w-1/3 rounded bg-espresso-clay/10' />
              <div className='h-3 w-1/4 rounded bg-espresso-clay/10' />
            </div>

            <div className='h-8 w-16 rounded bg-espresso-clay/10' />

            <div className='flex gap-2'>
              <div className='h-8 w-8 rounded bg-espresso-clay/10' />
              <div className='h-8 w-8 rounded bg-espresso-clay/10' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
