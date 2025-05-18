import React from 'react';
import { Violation } from '../types';
import { formatDate } from '../utils/helpers';
import { Car, Calendar, MapPin, AlertTriangle } from 'lucide-react';

interface VehicleHistoryProps {
    violations: Violation[];
    plateNumber: string;
    onClose: () => void;
}

const VehicleHistory: React.FC<VehicleHistoryProps> = ({ violations, plateNumber, onClose }) => {
    const totalFines = violations.reduce((sum, v) => sum + (v.fineAmount || 0), 0);
    const avgSpeed = Math.round(violations.reduce((sum, v) => sum + v.car_speed, 0) / violations.length);

    return (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                    <Car className="w-6 h-6 text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Vehicle Violation History</h2>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">License Plate</div>
                    <div className="text-xl font-bold text-white">{plateNumber}</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Total number of violations</div>
                    <div className="text-xl font-bold text-white">{violations.length}Case</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Total Fine</div>
                    <div className="text-xl font-bold text-white">{totalFines.toLocaleString()}Won</div>
                </div>
            </div>

            <div className="space-y-4">
                {violations.map((violation) => (
                    <div
                        key={violation.id}
                        className="bg-gray-900/50 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden">
                                <img
                                    src={violation.image_url}
                                    alt={`Vehicle ${violation.car_number}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-300">{formatDate(new Date(violation.created_at))}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-300">{violation.location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div>
                                <div className="text-sm text-gray-400">Speeding</div>
                                <div className={`text-lg font-bold ${
                                    violation.car_speed >= 120 ? 'text-red-400' :
                                        violation.car_speed >= 100 ? 'text-orange-400' :
                                            'text-yellow-400'
                                }`}>
                                    {violation.car_speed} km/h
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Fine</div>
                                <div className="text-lg font-bold text-white">
                                    {violation.fineAmount?.toLocaleString()}Won
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">State</div>
                                <div className={`inline-block px-2 py-1 rounded-full text-sm ${
                                    violation.is_checked
                                        ? 'bg-green-900/50 text-green-400'
                                        : 'bg-red-900/50 text-red-400'
                                }`}>
                                    {violation.is_checked ? 'checked' : 'unchecked'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleHistory;