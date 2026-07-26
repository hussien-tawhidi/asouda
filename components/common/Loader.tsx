"use client";
export default function Loader() {
  return (
    <div className='loading flex flex-col gap-2'>
      <svg width='64px' height='48px'>
        <polyline
          points='0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24'
          id='back'></polyline>
        <polyline
          points='0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24'
          id='front'></polyline>
      </svg>
      <p className="text-xs mt-3">لطفا صبر کنید...</p>
    </div>
  );
}
