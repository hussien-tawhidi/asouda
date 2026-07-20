"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NextArrow = ({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className='absolute -right-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-black hover:text-white'>
    <ChevronRight />
  </button>
);

export const PrevArrow = ({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className='absolute -left-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-black hover:text-white'>
    <ChevronLeft />
  </button>
);

export const mostSellsSliderSetting = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3500,
  arrows: false,
  pauseOnHover: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
 
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
