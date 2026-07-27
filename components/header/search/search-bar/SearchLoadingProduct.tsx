import React from 'react'

export default function SearchLoadingProduct() {
  return (
    <div
      className='py-4 space-y-3'
      role='status'
      aria-label='در حال بارگذاری نتایج'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='flex items-center gap-3 animate-pulse'>
          <div className='w-10 h-10 bg-earth-brown/10 rounded-lg' />
          <div className='flex-1'>
            <div className='h-4 bg-earth-brown/10 rounded w-3/4' />
            <div className='h-3 bg-earth-brown/5 rounded w-1/2 mt-1' />
          </div>
        </div>
      ))}
    </div>
  );
}
