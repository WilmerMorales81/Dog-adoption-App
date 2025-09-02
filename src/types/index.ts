export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  size: 'Small' | 'Medium' | 'Large';
  gender: 'Male' | 'Female';
  description: string;
  personality: string;
  imageUrl: string;
  status: 'Available' | 'On Trial' | 'Adopted' | 'Returned';
  trialStartDate?: string;
  trialEndDate?: string;
  adoptedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Adoption {
  id: string;
  dogId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Cancelled';
  decision?: 'Adopt' | 'Return';
  decisionDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface DogFilters {
  breed?: string;
  size?: string;
  age?: number;
  status?: string;
  gender?: string;
}

export interface SortOption {
  field: keyof Dog;
  direction: 'asc' | 'desc';
}
