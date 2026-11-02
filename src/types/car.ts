export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: { country: string; city: string; address: string };
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface CarsFilters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export interface FiltersMeta {
  brands: string[];
  price: { min: number; max: number };
}

export interface BookingPayload {
  name: string;
  email: string;
  comment?: string;
}

export interface BookingResponse {
  message: string;
}