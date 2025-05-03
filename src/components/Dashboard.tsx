import React from 'react';
import StatsCard from './StatsCard';
import ViolationsTable from './ViolationsTable';
import { Violation, StatsData } from '../types';
import { AlertTriangle, CheckCircle, Clock, Gauge } from 'lucide-react';

interface DashboardProps {
  violations: Violation[];
  stats: StatsData;
  onSelectViolation: (violation: Violation) => void;
  onDeleteViolation: (id: number) => void;
  selectedViolationId?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  violations, 
  stats, 
  onSelectViolation,
  onDeleteViolation,
  selectedViolationId
}) => {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Violations" 
          value={stats.totalViolations} 
          icon={<AlertTriangle className="w-8 h-8 text-blue-500" />} 
          bgClass="bg-gradient-to-br from-blue-900/40 to-blue-800/40"
          borderClass="border-blue-700"
        />
        <StatsCard 
          title="Checked" 
          value={stats.checked} 
          icon={<CheckCircle className="w-8 h-8 text-green-500" />} 
          bgClass="bg-gradient-to-br from-green-900/40 to-green-800/40"
          borderClass="border-green-700"
        />
        <StatsCard 
          title="Pending Review" 
          value={stats.pendingReview} 
          icon={<Clock className="w-8 h-8 text-yellow-500" />} 
          bgClass="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40"
          borderClass="border-yellow-700"
        />
        <StatsCard 
          title="Avg. Speed" 
          value={`${stats.avgSpeed} km/h`} 
          icon={<Gauge className="w-8 h-8 text-red-500" />} 
          bgClass="bg-gradient-to-br from-red-900/40 to-red-800/40"
          borderClass="border-red-700"
        />
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <ViolationsTable 
          violations={violations} 
          onSelectViolation={onSelectViolation}
          onDeleteViolation={onDeleteViolation}
          selectedViolationId={selectedViolationId}
        />
      </div>
    </div>
  );
};

export default Dashboard;