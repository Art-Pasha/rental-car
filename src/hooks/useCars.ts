import { useInfiniteQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/carsApi";
import { fetchCarById } from "@/lib/carsApi";
import type { CarsFilters } from "@/types/car";

export function useCars(filters: CarsFilters) {
  return useInfiniteQuery({
    // filters у ключі: зміна фільтрів = новий запит з першої сторінки
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) => fetchCars(filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      Number(lastPage.page) < lastPage.totalPages
        ? Number(lastPage.page) + 1
        : undefined,
  });
}

export function useCar(carId: string) {
  return useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
    retry: false, // 404 не потрібно повторювати
  });
}