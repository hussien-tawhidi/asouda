"use client";

import { Truck, ShieldCheck, PackageCheck, Check } from "lucide-react";

interface ProductFeaturesProps {
  warranty?: string;
}

export default function ProductFeatures({ warranty }: ProductFeaturesProps) {
  const features = [
    {
      icon: Truck,
      label: "ارسال سریع",
      color: "text-espresso-clay",
    },
    {
      icon: ShieldCheck,
      label: "ضمانت کیفیت",
      color: "text-espresso-clay",
    },
    {
      icon: PackageCheck,
      label: "بسته‌بندی ایمن",
      color: "text-espresso-clay",
    },
    {
      icon: Check,
      label: warranty ?? "گارانتی معتبر",
      color: "text-green-600",
    },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      {features.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className='flex items-center gap-3 rounded-2xl border p-3 transition-all duration-200 hover:shadow-md hover:-translate-y-1'>
            <Icon className={`${item.color}`} size={20} />
            <span className='text-xs'>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
