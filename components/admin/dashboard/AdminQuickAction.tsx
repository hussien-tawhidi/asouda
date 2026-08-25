import Link from "next/link";

interface QuickActionProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

export default function AdminQuickAction({ href, icon: Icon, label }: QuickActionProps) {
  return (
    <Link
      href={href}
      className='flex flex-col items-center gap-2 rounded-xl bg-light-lavender p-4 transition hover:border-espresso-clay hover:bg-light-mode'>
      <Icon size={24} className='text-dark-bg' />
      <span className='text-xs font-medium text-dark-bg'>{label}</span>
    </Link>
  );
}