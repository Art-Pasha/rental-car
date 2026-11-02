"use client";

import CarCard from "@/components/CarCard/CarCard";
import Loader from "@/components/Loader/Loader";
import { useCars } from "@/hooks/useCars";
import css from "./CatalogClient.module.css";

export default function CatalogClient() {
  // Фільтри підключимо на наступному кроці
  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useCars({});

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <section className={css.section}>
      <div className="container">
        {isLoading && <Loader />}
        {isError && <p className={css.message}>Something went wrong. Please try again.</p>}

        {cars.length > 0 && <ul className={css.list}>{cars.map((car) => <CarCard key={car.id} car={car} />)}</ul>}

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
      </div>
    </section>
  );
}