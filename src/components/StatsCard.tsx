import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bgClass: string;
  borderClass: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, bgClass, borderClass }) => {
  return (
    <div className={`rounded-xl border ${borderClass} ${bgClass} p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="rounded-full p-2">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;