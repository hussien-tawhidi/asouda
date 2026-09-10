import { Check } from "lucide-react";

interface Props {
  onCancel?: () => void;
}

export default function OrderActions({ onCancel }: Props) {
  return (
    <div className='flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end'>
      <button
        type='button'
        onClick={onCancel}
        className='
          rounded-xl
          border
          border-espresso-clay/20
          px-6
          py-3
          text-sm
          font-semibold
          text-espresso-clay
          transition
          hover:bg-espresso-clay/5
        '>
        انصراف
      </button>

      <button
        type='submit'
        className='
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-espresso-clay
          px-7
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:opacity-90
        '>
        <Check size={18} />
        ثبت درخواست سفارش
      </button>
    </div>
  );
}
