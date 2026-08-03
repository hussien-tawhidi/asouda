"use client";

import { Package, ShoppingBag, TrendingUp, Users } from "lucide-react";
import AdminStatCard from "./AdminStatAction";

interface DashboardStatsProps {
  stats: {
    products: number;
    orders: number;
    users: number;
    revenue: number;
  };
  formatCurrency: (value: number) => string;
}

export default function DashboardStats({
  stats,
  formatCurrency,
}: DashboardStatsProps) {
  const statCards = [
    {
      title: "محصولات",
      value: stats.products,
      icon: Package,
      color: "blue" as const,
      trend: "+12%",
    },
    {
      title: "سفارش‌ها",
      value: stats.orders,
      icon: ShoppingBag,
      color: "green" as const,
      trend: "+8%",
    },
    {
      title: "کاربران",
      value: stats.users,
      icon: Users,
      color: "purple" as const,
      trend: "+5%",
    },
    {
      title: "درآمد",
      value: formatCurrency(stats.revenue),
      icon: TrendingUp,
      color: "orange" as const,
      trend: "+18%",
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {statCards.map((card) => (
        <AdminStatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
          trend={card.trend}
        />
      ))}
    </div>
  );
}
