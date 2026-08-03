interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: "blue" | "green" | "purple" | "orange";
  trend?: string;
}

export default function AdminStatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  const trendColor = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };

  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-gray-500'>{title}</p>
          <p className='text-2xl font-bold text-gray-800'>{value}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      {trend && (
        <p className={`mt-2 text-xs font-medium ${trendColor[color]}`}>
          {trend} نسبت به ماه قبل
        </p>
      )}
    </div>
  );
}
