import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LaneViolationChartProps {
  laneData: {
    lane: number;
    count: number;
    avgSpeed: number;
  }[];
}

const LaneViolationChart: React.FC<LaneViolationChartProps> = ({ laneData }) => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
      <h3 className="text-lg font-semibold mb-6 text-white">차선별 위반 현황</h3>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={laneData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="lane" 
              stroke="#9CA3AF"
              label={{ value: '차선', position: 'insideBottom', offset: -10, fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              label={{ value: '위반 건수', angle: -90, position: 'insideLeft', offset: 10, fill: '#9CA3AF' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#9CA3AF' }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Bar 
              dataKey="count" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
              name="위반 건수"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        {laneData.map((data) => (
          <div key={data.lane} className="bg-gray-900/50 p-3 rounded-lg">
            <div className="text-sm text-gray-400">차선 {data.lane}</div>
            <div className="text-lg font-semibold text-white">{data.count}건</div>
            <div className="text-sm text-blue-400">{data.avgSpeed} km/h</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaneViolationChart;