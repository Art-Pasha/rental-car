import { useQuery } from "@tanstack/react-query";
import { fetchFiltersMeta } from "@/lib/carsApi";

export function useFiltersMeta() {
  return useQuery({
    queryKey: ["filters-meta"],
    queryFn: fetchFiltersMeta,
    staleTime: Infinity,
  });
}