import React, { useState } from 'react';
import { Violation } from '../types';
import { CalendarDays, MapPin, Car, AlertCircle, X } from 'lucide-react';

interface ViolationDetailsProps {
  violation: Violation;
  onStatusChange: (id: number, checked: boolean) => void;
  onClose: () => void;
}

const ViolationDetails: React.FC<ViolationDetailsProps> = ({ violation, onStatusChange, onClose }) => {
  const [isChecked, setIsChecked] = useState(violation.status === 'Checked');
  
  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onStatusChange(violation.id, checked);
  };
  
  // Get speed level classification for styling
  const getSpeedLevelClass = (speed: number) => {
    if (speed >= 120) return 'text-red-500';
    if (speed >= 100) return 'text-orange-500';
    return 'text-yellow-500';
  };

  // Format date string for readability
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Violation Details</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="mb-4 rounded-lg overflow-hidden h-48">
        <img 
          src={violation.image} 
          alt={`Vehicle ${violation.plateNumber}`} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-white">License Plate</h3>
          <div className="bg-gray-900 p-4 rounded-md text-center">
            <span className="text-xl font-bold">{violation.plateNumber}</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-white">Detected Speed</h3>
          <div className="bg-gray-900 p-4 rounded-md text-center">
            <span className={`text-3xl font-bold ${getSpeedLevelClass(violation.speed)}`}>
              {violation.speed} km/h
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <label htmlFor="checkStatus" className="text-white font-medium">Mark as checked</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input 
              type="checkbox" 
              id="checkStatus" 
              checked={isChecked}
              onChange={handleCheckChange}
              className="opacity-0 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label 
              htmlFor="checkStatus" 
              className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                isChecked ? 'bg-green-500' : 'bg-gray-600'
              } transition-colors duration-200`}
            >
              <span 
                className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                  isChecked ? 'translate-x-4' : 'translate-x-0'
                }`} 
              />
            </label>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-white">Fine Amount (KRW)</h3>
          <div className="bg-gray-900 p-4 rounded-md text-center">
            <span className="text-3xl font-bold text-white">{violation.fineAmount?.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
            <div>
              <h3 className="text-xs font-medium text-gray-400">Location</h3>
              <p className="text-white">{violation.location || '알 수 없음'}</p>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 flex items-start space-x-3">
            <CalendarDays className="w-4 h-4 text-purple-400 mt-0.5" />
            <div>
              <h3 className="text-xs font-medium text-gray-400">Date & Time</h3>
              <p className="text-white">{violation.createdAt ? formatDate(violation.createdAt) : violation.date}</p>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 flex items-start space-x-3">
            <Car className="w-4 h-4 text-green-400 mt-0.5" />
            <div>
              <h3 className="text-xs font-medium text-gray-400">vehicle type</h3>
              <p className="text-white">{violation.vehicleType || '알 수 없음'}</p>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 flex items-start space-x-3">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
            <div>
              <h3 className="text-xs font-medium text-gray-400">Risk Level</h3>
              <p className={`font-medium ${
                violation.dangerLevel === 'High' ? 'text-red-400' : 
                violation.dangerLevel === 'Medium' ? 'text-orange-400' : 'text-yellow-400'
              }`}>
                {violation.dangerLevel === 'High' ? 'High' :
                 violation.dangerLevel === 'Medium' ? 'Middle' :
                 violation.dangerLevel === 'Low' ? 'Lowness' : 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationDetails;