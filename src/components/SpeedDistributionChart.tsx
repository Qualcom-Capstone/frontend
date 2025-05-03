import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SpeedDistributionChartProps {
  speedData: {
    range: string;
    count: number;
    color: string;
  }[];
}

const SpeedDistributionChart: React.FC<SpeedDistributionChartProps> = ({ speedData }) => {
  const total = speedData.reduce((sum, data) => sum + data.count, 0);
  
  return (
    <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-white">속도 분포도</h3>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={speedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {speedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color.replace('bg-', '')} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-gray-300">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-3">
        {speedData.map((data, index) => (
          <div key={index} className="flex items-center space-x-2 bg-gray-900/50 p-2 rounded-lg">
            <div className={`w-3 h-3 rounded-sm ${data.color}`} />
            <div>
              <p className="text-xs text-gray-400">{data.range}</p>
              <p className="text-sm font-medium text-white">
                {data.count}건 ({((data.count / total) * 100).toFixed(0)}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeedDistributionChart;