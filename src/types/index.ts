export interface Violation {
  id: number;
  image: string;
  plateNumber: string;
  speed: number;
  status: 'Checked' | 'Unchecked';
  date: string;
  location?: string;
  fineAmount?: number;
  createdAt?: string;
  updatedAt?: string;
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