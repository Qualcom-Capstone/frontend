import { Violation } from '../types';

// Calculate fine amount based on speed and speed limit
export const calculateFine = (
  speed: number, 
  speedLimit: number = 80, 
  baseFine: number = 30000
): number => {
  const overSpeed = speed - speedLimit;
  
  if (overSpeed <= 0) return 0;
  
  let multiplier = 1;
  
  if (overSpeed > 40) {
    multiplier = 3;
  } else if (overSpeed > 30) {
    multiplier = 2.5;
  } else if (overSpeed > 20) {
    multiplier = 2;
  } else if (overSpeed > 10) {
    multiplier = 1.5;
  }
  
  return Math.round(baseFine * multiplier);
};

// Get danger level based on speed
export const getDangerLevel = (speed: number, speedLimit: number = 80): 'Low' | 'Medium' | 'High' => {
  const overSpeed = speed - speedLimit;
  
  if (overSpeed > 30) return 'High';
  if (overSpeed > 15) return 'Medium';
  return 'Low';
};

// Format date to readable string
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Extract stats for lane violations
export const extractLaneStats = (violations: Violation[]) => {
  const laneMap = new Map<number, { count: number; totalSpeed: number }>();
  
  violations.forEach(violation => {
    if (violation.lane) {
      if (!laneMap.has(violation.lane)) {
        laneMap.set(violation.lane, { count: 0, totalSpeed: 0 });
      }
      
      const data = laneMap.get(violation.lane)!;
      data.count += 1;
      data.totalSpeed += violation.car_speed;
    }
  });
  
  return Array.from(laneMap.entries()).map(([lane, data]) => ({
    lane,
    count: data.count,
    avgSpeed: Math.round(data.totalSpeed / data.count)
  }));
};

// Extract speed distribution data
export const extractSpeedDistribution = (violations: Violation[]) => {
  const ranges = [
    { min: 0, max: 90, label: '< 90 km/h', color: 'bg-green-500' },
    { min: 90, max: 100, label: '90-100 km/h', color: 'bg-yellow-500' },
    { min: 100, max: 110, label: '100-110 km/h', color: 'bg-orange-500' },
    { min: 110, max: 120, label: '110-120 km/h', color: 'bg-red-400' },
    { min: 120, max: Infinity, label: '> 120 km/h', color: 'bg-red-600' }
  ];
  
  const distribution = ranges.map(range => ({
    range: range.label,
    count: violations.filter(v => v.car_speed >= range.min && v.car_speed < range.max).length,
    color: range.color
  }));
  
  return distribution;
};