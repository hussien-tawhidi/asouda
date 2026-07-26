"use client";

import { useEffect } from "react";
import { BiCloset } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  phone: string;
  whatsapp: string;
}

export default function ContactModal({
  open,
  onClose,
  phone,
  whatsapp,
}: ContactModalProps) {
  // close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      onClick={onClose}>
      {/* backdrop */}
      <div className='absolute inset-0 h-screen bg-espresso-clay/40 backdrop-blur-sm animate-fadeIn' />

      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative bg-bone-white w-[90%] max-w-sm rounded-2xl p-6 shadow-2xl text-center space-y-5 animate-scaleIn'>
        <h2 className='text-lg font-bold'>تماس برای سفارش</h2>

        <p className='text-sm text-espresso-clay/80'>
          یکی از روش‌های زیر را انتخاب کنید
        </p>

        {/* phone */}
        <a
          href={`tel:${phone}`}
          className='flex items-center justify-center gap-2 w-full border rounded-xl py-3 font-semibold hover:bg-gray-50 transition'>
          <FaPhone />
          {phone}
        </a>

        {/* whatsapp */}
        <a
          href={`https://wa.me/${whatsapp}`}
          target='_blank'
          className='flex items-center justify-center gap-2 w-full bg-green-700 text-bone-white rounded-xl py-3 font-semibold hover:bg-green-600 transition'>
          <FaWhatsapp />
          واتساپ
        </a>

        {/* close */}
        <button
          onClick={onClose}
          className='text-xs text-espresso-clay/80 hover:text-black'>
          <CgClose />
        </button>
      </div>
    </div>
  );
}
