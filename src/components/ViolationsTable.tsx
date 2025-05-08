import React from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { Violation } from '../types';

interface ViolationsTableProps {
  violations: Violation[];
  onSelectViolation: (violation: Violation) => void;
  onDeleteViolation: (id: number) => void;
  selectedViolationId?: number;
}

const ViolationsTable: React.FC<ViolationsTableProps> = ({ 
  violations, 
  onSelectViolation,
  onDeleteViolation,
  selectedViolationId
}) => {
  const getSpeedColor = (speed: number) => {
    if (speed >= 120) return 'text-red-500';
    if (speed >= 100) return 'text-orange-500';
    return 'text-yellow-500';
  };

  return (
    <div className="flex-1 overflow-auto pb-4">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-900/50 sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Plate Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Speed (km/h)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {violations.map((violation) => (
            <tr 
              key={violation.id} 
              className={`${
                selectedViolationId === violation.id 
                  ? 'bg-blue-900/30' 
                  : 'hover:bg-gray-800/50'
              } transition-colors cursor-pointer`}
              onClick={() => onSelectViolation(violation)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {violation.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <div className="h-12 w-16 rounded overflow-hidden">
                  <img 
                    src={violation.image_url}
                    alt={`Vehicle ${violation.car_number}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {violation.car_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`font-medium ${getSpeedColor(violation.car_speed)}`}>
                  {violation.car_speed}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  violation.is_checked === true
                    ? 'bg-green-900/70 text-green-300'
                    : 'bg-red-900/70 text-red-300'
                }`}>
                  {violation.is_checked ? 'Checked' : 'Unchecked'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {violation.created_at}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex space-x-2">
                <button 
                  className="p-2 text-blue-400 hover:text-blue-300 rounded-full hover:bg-blue-900/30 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectViolation(violation);
                  }}
                >
                  <Eye size={16} />
                </button>
                <button 
                  className="p-2 text-red-400 hover:text-red-300 rounded-full hover:bg-red-900/30 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteViolation(violation.id);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {violations.length === 0 && (
        <div className="flex justify-center items-center py-12 text-gray-500">
          No violations found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ViolationsTable;