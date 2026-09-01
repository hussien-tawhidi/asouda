import { User } from "lucide-react";

export default function StatCard({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof User;
  title: string;
  value: string;
}) {
  return (
    <div className='md:rounded-2xl rounded md:p-5 p-1.5 shadow-sm ring-1 bg-espresso-clay/10 ring-espresso-clay/5'>
      <div className='md:mb-4 mb-2 flex md:h-10 h-6 md:w-10 w-6 items-center justify-center rounded-xl bg-espresso-clay/10 text-espresso-clay'>
        <Icon strokeWidth={1.7} className="md:w-8 md:h-8 w-4 h-4"/>
      </div>

      <p className='sm:text-xs text-[10px] text-nowrap text-espresso-clay/55'>{title}</p>

      <p className='md:mt-1 md:text-xl text-lg font-bold text-espresso-clay'>{value}</p>
    </div>
  );
}
