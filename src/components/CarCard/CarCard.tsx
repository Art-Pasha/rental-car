import Image from "next/image";
import Link from "next/link";
import { formatMileage, formatType } from "@/lib/format";
import type { Car } from "@/types/car";
import css from "./CarCard.module.css";

export default function CarCard({ car, priority = false }: { car: Car; priority?: boolean }) {
  const { id, img, brand, model, year, rentalPrice, rentalCompany, location, type, mileage } = car;

  return (
    <li className={css.card}>
      <div className={css.imageWrap}>
        <Image src={img} alt={`${brand} ${model}`} fill sizes="244px" className={css.image} priority={priority} />
      </div>

      <div className={css.titleRow}>
        <h3 className={css.title}>
          {brand} <span className={css.model}>{model}</span>, {year}
        </h3>
        <p>${rentalPrice}</p>
      </div>

      <div className={css.info}>
        <ul className={css.infoRow}>
          <li>{location.city}</li>
          <li>{location.country}</li>
          <li>{rentalCompany}</li>
        </ul>
        <ul className={css.infoRow}>
          <li>{formatType(type)}</li>
          <li>{formatMileage(mileage)} km</li>
        </ul>
      </div>

      <Link
        href={`/catalog/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={css.button}
      >
        Read more
      </Link>
    </li>
  );
}