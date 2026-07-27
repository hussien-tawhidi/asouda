import { BiSearch } from "react-icons/bi";

export default function SearchTriggerButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white flex items-center gap-1.5'
      aria-label='جستجو'>
      <BiSearch className='w-5 h-5' />
    </button>
  );
}
