import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div>
      <label className='mb-2 block text-sm font-medium text-espresso-clay'>
        {label}
      </label>

      <div className='relative'>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required
          className='w-full appearance-none rounded-xl border border-espresso-clay/15 bg-white/60 px-4 py-3 pl-10 text-sm text-espresso-clay outline-none transition focus:border-espresso-clay'>
          <option value=''>انتخاب کنید</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-espresso-clay/50'
        />
      </div>
    </div>
  );
}
