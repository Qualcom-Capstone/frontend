export interface Violation {
  id: number;
  image_url: string;
  car_number: string;
  car_speed: number;
  is_checked: boolean;
  date: string;
  location?: string;
  fineAmount?: number;
  created_at?: string;
  updated_at?: string;
  lane?: number;
  vehicleType?: string;
  dangerLevel?: 'Low' | 'Medium' | 'High';
}

export interface StatsData {
  totalViolations: number;
  checked: number;
  pendingReview: number;
  avgSpeed: number;
}