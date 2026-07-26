"use client";

import Loader from "@/components/common/Loader";

export default function loading() {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <Loader />
    </div>
  );
}
