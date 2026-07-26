"use client";

import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { BiInfoCircle, BiPhone } from "react-icons/bi";
import Link from "next/link";

interface HeaderActionsProps {
  instagramUrl?: string;
  whatsappUrl?: string;
  telegramUrl?: string;
  phoneNumber?: string;
  aboutInfo?: boolean;
}

export default function SocialIconsContact({
  instagramUrl = "https://instagram.com/asouda.design",
  whatsappUrl = "https://wa.me/+989030931288",
  phoneNumber = "+98 919 389 7119",
  aboutInfo = false,
}: HeaderActionsProps) {
  return (
    <div className='mr-2 flex shrink-0 items-center gap-2'>
      {aboutInfo && (
        <Link
          href='/about'
          aria-label='درباره ما'
          className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white flex items-center gap-1.5'>
          <BiInfoCircle size={18} />
          <span dir='ltr' className='md:flex hidden'>
            درباره ما
          </span>
        </Link>
      )}
      <Link
        href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
        className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white flex items-center'>
        <BiPhone size={18} />
        <span dir='ltr' className='md:flex hidden'>
          {phoneNumber}
        </span>
      </Link>

      <Link
        href={instagramUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='اینستاگرام'
        className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white'>
        <BsInstagram size={18} />
      </Link>

      <Link
        href={whatsappUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='واتساپ'
        className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white'>
        <BsWhatsapp size={18} />
      </Link>
    </div>
  );
}
