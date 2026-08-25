import Link from "next/link";
import { StoreIcon } from "lucide-react";

interface LinkButtonProps {
  title: string;
  href: string;
  prem?: boolean;
  classVar?: string;
  icon?: React.ElementType; // optional custom icon
  onClick?: () => void; // <-- new prop for click handler
  role?: string; // <-- new prop for ARIA role (defaults to "menuitem")
}

const LinkButton = ({
  title,
  href,
  prem = false,
  classVar = "",
  icon,
  onClick,
  role = "menuitem", // default role
}: LinkButtonProps) => {
  const Icon = icon || StoreIcon;

  return (
    <Link
      href={href}
      role={role} // applied here
      onClick={onClick} // applied here
      className={`${prem ? classVar : "text-light-mode border-light-mode/10"}
        flex items-center gap-2 rounded-xl border
        px-5 py-2.5 text-sm font-semibold
        shadow-md transition-all
        hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg`}>
      <Icon size={18} />
      {title}
    </Link>
  );
};

export default LinkButton;
