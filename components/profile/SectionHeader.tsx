import Link from "next/link";

export default function SectionHeader({
  title,
  href,
  action,
}: {
  title: string;
  href: string;
  action: string;
}) {
  return (
    <div className='flex items-center justify-between gap-4'>
      <h2 className='text-lg font-bold text-espresso-clay'>{title}</h2>

      <Link
        href={href}
        className='text-xs font-medium text-earth-brown transition hover:underline'>
        {action}
      </Link>
    </div>
  );
}
