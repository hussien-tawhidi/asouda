import { BiSearch } from "react-icons/bi";

export default function SearchEmpty() {
  return (
    <div className='text-center py-10'>
      <div className='w-16 h-16 bg-earth-brown/5 rounded-full flex items-center justify-center mx-auto mb-4'>
        <BiSearch className='w-6 h-6 text-earth-brown/30' />
      </div>
      <p className='text-earth-brown/70'>نتیجه‌ای یافت نشد</p>
    </div>
  );
}
