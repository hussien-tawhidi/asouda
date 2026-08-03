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
      className='flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-espresso-clay hover:bg-espresso-clay/5'>
      <Icon size={24} className='text-espresso-clay' />
      <span className='text-xs font-medium text-gray-700'>{label}</span>
    </Link>
  );
}