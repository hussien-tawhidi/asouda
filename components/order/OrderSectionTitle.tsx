import { Star } from "lucide-react";

export default function OrderSectionTitle({
  number,
  title,
  need = true,
}: {
  number: string;
  title: string;
  need?: boolean;
}) {
  return (
    <div className='mb-4 flex items-center gap-3 relative'>
      <span className='flex h-8 w-8 items-center justify-center rounded-full bg-espresso-clay text-xs font-bold text-white'>
        {number}
      </span>

      <h3 className='font-bold text-espresso-clay'>{title}</h3>
      {need && (
        <span className='text-red-700 top-0 right-2'>
          <Star size={12} />
        </span>
      )}
    </div>
  );
}
