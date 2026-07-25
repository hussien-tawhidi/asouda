"use client";

import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  PlusCircle,
  List,
  BarChart3,
  Settings,
} from "lucide-react";
import AdminQuickAction from "@/components/admin/AdminQuickAction";
import AdminStatCard from "@/components/admin/AdminStatAction";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "@/components/admin/ProductTable";
import { MostSellProductType } from "@/types";

export default function DashboardHomePage() {
  const [products, setProducts] = useState<MostSellProductType[]>([]);
  const [loading, setLoading] = useState(false);
  // In a real app, you'd fetch these from your database
  const stats = {
    products: 24,
    orders: 147,
    users: 89,
    revenue: 12_450_000,
  };
  // Format currency in Persian
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("fa-IR") + " تومان";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data.products);
      } catch (error) {
        console.log("🚀 ~ DashboardHomePage ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='space-y-8 w-[95%] px-[5%] mt-10 mx-auto'>
      {/* --- Header --- */}
      <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 md:text-3xl'>
            👋 خوش آمدید!
          </h1>
          <p className='text-sm text-gray-500'>
            امروز چه کاری می‌خواهید انجام دهید؟
          </p>
        </div>
        <Link
          href='/dashboard/create-product'
          className='flex items-center gap-2 rounded-xl bg-espresso-clay px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 hover:shadow-lg'>
          <PlusCircle size={18} />
          ثبت محصول جدید
        </Link>
      </div>

      {/* --- Stats Grid --- */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <AdminStatCard
          title='محصولات'
          value={stats.products}
          icon={Package}
          color='blue'
          trend='+12%'
        />
        <AdminStatCard
          title='سفارش‌ها'
          value={stats.orders}
          icon={ShoppingBag}
          color='green'
          trend='+8%'
        />
        <AdminStatCard
          title='کاربران'
          value={stats.users}
          icon={Users}
          color='purple'
          trend='+5%'
        />
        <AdminStatCard
          title='درآمد'
          value={formatCurrency(stats.revenue)}
          icon={TrendingUp}
          color='orange'
          trend='+18%'
        />
      </div>

      {/* --- Quick Actions --- */}
      <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='mb-4 text-lg font-semibold text-gray-700'>
          اقدامات سریع
        </h2>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
          <AdminQuickAction
            href='/dashboard/create-product'
            icon={PlusCircle}
            label='ثبت محصول جدید'
          />
          <AdminQuickAction
            href='/dashboard/products'
            icon={List}
            label='مدیریت محصولات'
          />
          <AdminQuickAction
            href='/dashboard/analytics'
            icon={BarChart3}
            label='گزارش‌ها و آمار'
          />
          <AdminQuickAction
            href='/dashboard/settings'
            icon={Settings}
            label='تنظیمات'
          />
        </div>
      </div>

      <div className=' mx-auto'>
        <ProductsGrid
          products={products}
          loading={loading}
          setData={setProducts}
        />
      </div>
    </div>
  );
}
