"use client";

import { BsInstagram, BsTelegram, BsWhatsapp } from "react-icons/bs";
import { BiInfoCircle, BiPhone } from "react-icons/bi";

interface HeaderActionsProps {
  instagramUrl?: string;
  whatsappUrl?: string;
  telegramUrl?: string;
  phoneNumber?: string;
  aboutInfo?: boolean;
}

export default function SocialIconsContact({
  instagramUrl = "https://instagram.com/yourpage",
  whatsappUrl = "https://wa.me/93700000000",
  telegramUrl = "https://t.me/yourchannel",
  phoneNumber = "+93 700 000 000",
  aboutInfo=false
}: HeaderActionsProps) {
  return (
    <div className='mr-2 flex shrink-0 items-center gap-2'>
      {aboutInfo && (
        <a
          href='/about'
          aria-label='درباره ما'
          className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white flex items-center gap-1.5'>
          <BiInfoCircle size={18} />
          <span dir='ltr' className='md:flex hidden'>
            درباره ما
          </span>
        </a>
      )}
      <a
        href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
        className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white flex items-center'>
        <BiPhone size={18} />
        <span dir='ltr' className='md:flex hidden'>
          {phoneNumber}
        </span>
      </a>

      <a
        href={instagramUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='اینستاگرام'
        className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white'>
        <BsInstagram size={18} />
      </a>

      <a
        href={whatsappUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='واتساپ'
        className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white'>
        <BsWhatsapp size={18} />
      </a>

      <a
        href={telegramUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='تلگرام'
        className='rounded-full bg-espresso-clay/5 p-2.5 text-espresso-clay transition hover:bg-espresso-clay hover:text-bone-white'>
        <BsTelegram size={18} />
      </a>
    </div>
  );
}
