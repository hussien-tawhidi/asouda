export default function OrderRow({
  order,
  date,
  price,
  status,
}: {
  order: string;
  date: string;
  price: string;
  status: string;
}) {
  return (
    <div className='grid gap-3 border-t border-espresso-clay/10 px-5 py-5 text-sm first:border-t-0 sm:grid-cols-4 sm:items-center'>
      <div>
        <span className='text-xs text-espresso-clay/50 sm:hidden'>
          شماره سفارش:{" "}
        </span>

        <span className='font-medium text-espresso-clay'>{order}</span>
      </div>

      <div className='text-espresso-clay/60'>
        <span className='text-xs sm:hidden'>تاریخ: </span>
        {date}
      </div>

      <div className='font-medium text-espresso-clay'>
        <span className='text-xs font-normal text-espresso-clay/50 sm:hidden'>
          مبلغ:{" "}
        </span>
        {price}
      </div>

      <div>
        <span className='inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700'>
          {status}
        </span>
      </div>
    </div>
  );
}
