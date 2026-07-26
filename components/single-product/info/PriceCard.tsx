"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

interface Props {
  price: number;
  discount?: number;
  phone: string;
  whatsapp: string;
}

export default function PriceCard({
  price,
  discount = 0,
  phone,
  whatsapp,
}: Props) {
  const [open, setOpen] = useState(false);

  const hasDiscount = discount > 0;

  const discountedPrice = hasDiscount
    ? price - (price * discount) / 100
    : price;

  return (
    <>
      <div className='shadow-3xl border border-espresso-clay/10 rounded-2xl overflow-hidden bg-warm-putty shadow-2xl mb-10'>
        <div className='p-6 flex justify-between items-center'>
          {hasDiscount ? (
            <div className='flex flex-col md:flex-row gap-2 items-center'>
              <span className='bg-warm-putty px-2 py-1 rounded-full text-xs font-bold'>
                %{discount}
              </span>
              <span className='line-through text-sm opacity-70'>
                {price.toLocaleString("fa-IR")}
              </span>
            </div>
          ) : (
            <div />
          )}

          <div className='text-xl md:text-3xl font-bold flex gap-1'>
            {discountedPrice.toLocaleString("fa-IR")}
            <span className='text-sm mt-1 opacity-70'>تومان</span>
          </div>
        </div>

        <hr className='w-[85%] mx-auto h-0.5 bg-linear-to-r from-transparent via-espresso-clay to-transparent border-0' />

        <button
          onClick={() => setOpen(true)}
          className='w-full py-4 font-bold hover:shadow-lg transition'>
          ثبت سفارش
        </button>
      </div>

      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        phone={phone}
        whatsapp={whatsapp}
      />
    </>
  );
}
