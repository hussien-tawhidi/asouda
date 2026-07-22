"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { BiMenu, BiX } from "react-icons/bi";
import { CgMenuHotdog } from "react-icons/cg";
import { PiListHeartLight } from "react-icons/pi";

interface NavItem {
  name: string;
  href: string;
  icon: IconType;
}

interface MobileBottomNavProps {
  navItems: NavItem[];
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export default function MobileBottomNav({
  navItems,
  isMenuOpen,
  onToggleMenu,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  return (
    <section className='fixed bottom-0 left-0 z-50 w-full border-t border-earth-brown/20 bg-bone-white/90 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] backdrop-blur-md'>
      <nav className='mx-auto flex max-w-7xl items-center justify-around'>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`
                relative flex min-h-15 w-full flex-col items-center justify-center
                px-3 py-2 transition-all duration-200
                active:scale-95 hover:bg-earth-brown/5
                ${
                  isActive
                    ? "bg-earth-brown/10 font-medium text-earth-brown"
                    : "text-earth-brown/70"
                }
              `}>
              <Icon
                size={22}
                className={`transition-transform duration-300 ${
                  isActive ? "scale-110" : ""
                }`}
              />

              <span className='mt-1 text-[11px]'>{item.name}</span>

              {isActive && (
                <span className='absolute bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-earth-brown' />
              )}
            </Link>
          );
        })}
        <div className='flex w-full items-center justify-center'>
          <button
            onClick={onToggleMenu}
            className={`
      flex flex-col items-center justify-center
      rounded-2xl px-4 py-2
      transition-all duration-300
      ${
        isMenuOpen
          ? "bg-earth-brown text-white shadow-lg"
          : "text-earth-brown hover:bg-earth-brown/10"
      }
    `}>
            {isMenuOpen ? <BiX size={24} /> : <PiListHeartLight size={24} />}
            <span className='mt-1 text-[11px]'>لیست‌ها</span>
          </button>
        </div>
      </nav>
    </section>
  );
}
