"use client";

import { PlusCircle, List, BarChart3, Settings } from "lucide-react";
import AdminQuickAction from "@/components/admin/dashboard/AdminQuickAction";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "@/components/admin/dashboard/ProductTable";
import { MostSellProductType } from "@/types";
import Loader from "@/components/common/Loader";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeaader";
import DashboardStats from "@/components/admin/dashboard/DashboardStat";

export default function DashboardHomePage() {
  const [products, setProducts] = useState<MostSellProductType[]>([]);
  const [loading, setLoading] = useState(false);
  // In a real app, you'd fetch these from your database
  const stats = {
    products: products.length,
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

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }


    return (
      <div className='space-y-8 w-[95%] px-[5%] mt-10 mx-auto'>
        {/* --- Header --- */}
        <DashboardHeader
          title='مدیریت محصولات'
          description='در این بخش می‌توانید محصولات فروشگاه را مدیریت کنید.'
        />

        {/* --- Stats Grid --- */}
        <DashboardStats stats={stats} formatCurrency={formatCurrency} />

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
