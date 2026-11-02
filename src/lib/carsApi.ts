import { api } from "./api";
import type {
  BookingPayload,
  BookingResponse,
  Car,
  CarsFilters,
  CarsResponse,
  FiltersMeta,
} from "@/types/car";

export const CARS_PER_PAGE = 12;

export async function fetchCars(
  filters: CarsFilters,
  page: number,
): Promise<CarsResponse> {
  // Порожні значення не відправляємо на бекенд
  const params = Object.fromEntries(
    Object.entries({ ...filters, page, perPage: CARS_PER_PAGE }).filter(
      ([, value]) => value !== undefined && value !== "",
    ),
  );
  const { data } = await api.get<CarsResponse>("/cars", { params });
  return data;
}

export async function fetchFiltersMeta(): Promise<FiltersMeta> {
  const { data } = await api.get<FiltersMeta>("/cars/filters");
  return data;
}

export async function fetchCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}

export async function createBookingRequest(
  carId: string,
  payload: BookingPayload,
): Promise<BookingResponse> {
  const { data } = await api.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    payload,
  );
  return data;
}