"use client";

import Image from "next/image";
import Link from "next/link";
import CarInfo from "@/components/CarInfo/CarInfo";
import Loader from "@/components/Loader/Loader";
import { useCar } from "@/hooks/useCars";
import css from "./CarDetailsClient.module.css";
import BookingForm from "@/components/BookingForm/BookingForm";

export default function CarDetailsClient({ carId }: { carId: string }) {
  const { data: car, isLoading, isError } = useCar(carId);

  return (
    <div className={css.page}>
      <div className="container">
        {isLoading && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}

        {isError && (
          <div className={css.error}>
            <h1 className={css.errorTitle}>Car not found</h1>
            <p>We couldn’t load this car. Please go back to the catalog and try again.</p>
            <Link href="/catalog" className={css.backLink}>
              Back to catalog
            </Link>
          </div>
        )}

        {car && (
          <div className={css.layout}>
            <div className={css.left}>
              <div className={css.imageWrap}>
                <Image
                  src={car.img}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  sizes="640px"
                  className={css.image}
                  priority
                />
              </div>
              <div className={css.left}>
                <div className={css.imageWrap}>{/* ... */}</div>
                <BookingForm carId={car.id} />
              </div>
            </div>
            <CarInfo car={car} />
          </div>
        )}
      </div>
    </div>
  );
}