"use client";

import { useState } from "react";
import Image from "next/image";
import CarCard from "@/components/CarCard/CarCard";
import Filters from "@/components/Filters/Filters";
import LoadingCard from "@/components/LoadingCard/LoadingCard";
import { useCars } from "@/hooks/useCars";
import type { CarsFilters } from "@/types/car";
import css from "./CatalogClient.module.css";

export default function CatalogClient() {
  const [filters, setFilters] = useState<CarsFilters>({});
  const { data, isFetching, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useCars(filters);

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];
  const isRefreshing = isFetching && !isFetchingNextPage; // перший запит або нові фільтри
  const isEmpty = !isRefreshing && !isError && cars.length === 0;

  return (
    <div className={css.page}>
      <div className={css.filters}>
        <Filters onSearch={setFilters} onReset={() => setFilters({})} />
      </div>

      <section className={`container ${css.results}`}>
        <h1 className="visually-hidden">Car catalog</h1>

        {isRefreshing && (
          <div className={css.overlay}>
            <LoadingCard />
          </div>
        )}
      
        {isError && <p className={css.message}>Something went wrong. Please try again.</p>}

        {isEmpty && (
          <div className={css.empty}>
            <Image src="/no-cars.png" alt="" width={414} height={388} />
            <h2 className={css.emptyTitle}>No cars found</h2>
            <p className={css.emptyText}>
              We couldn’t find any cars that match your current filters. Try changing
              your search criteria or reset the filters.
            </p>
          </div>
        )}

        {cars.length > 0 && (
          <ul className={css.list}>
            {cars.map((car, index) => (
              <CarCard key={car.id} car={car} priority={index < 4} />
            ))}
          </ul>
        )}

        {hasNextPage && (
          <button
            type="button"
            className={css.loadMore}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </section>
    </div>
  );
}

