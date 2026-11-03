import { BsFuelPump } from "react-icons/bs";
import { FiCalendar, FiCheckCircle, FiMapPin, FiSettings } from "react-icons/fi";
import { IoCarSportOutline } from "react-icons/io5";
import { PiRoadHorizon } from "react-icons/pi";
import { formatType, getArticle } from "@/lib/format";
import type { Car } from "@/types/car";
import css from "./CarInfo.module.css";

interface InfoListProps {
  items: { icon: React.ReactNode; text: string }[];
}

function InfoList({ items }: InfoListProps) {
  return (
    <ul className={css.list}>
      {items.map(({ icon, text }) => (
        <li key={text} className={css.item}>
          <span className={css.icon} aria-hidden="true">
            {icon}
          </span>
          {text}
        </li>
      ))}
    </ul>
  );
}

export default function CarInfo({ car }: { car: Car }) {
  const article = getArticle(car.img);

  const check = <FiCheckCircle size={16} />;
  const conditions = car.rentalConditions.map((text) => ({ icon: check, text }));
  const features = car.features.map((text) => ({ icon: check, text }));

  const specifications = [
    { icon: <FiCalendar size={16} />, text: `Year: ${car.year}` },
    { icon: <IoCarSportOutline size={16} />, text: `Type: ${formatType(car.type)}` },
    { icon: <BsFuelPump size={16} />, text: `Fuel Consumption: ${car.fuelConsumption}` },
    { icon: <FiSettings size={16} />, text: `Engine: ${car.engine}` },
    { icon: <PiRoadHorizon size={16} />, text: `Mileage: ${car.mileage} km` },
  ];

  return (
    <section className={css.panel}>
      <div className={css.head}>
        <div className={css.titleBlock}>
          <div className={css.titleRow}>
            <h1 className={css.title}>
              {car.brand} {car.model}, {car.year}
            </h1>
            {article && <p className={css.article}>Article: {article}</p>}
          </div>
          <div className={css.meta}>
            <p className={css.location}>
              <FiMapPin size={16} aria-hidden="true" />
              {car.location.city}, {car.location.country}
            </p>
            <p className={css.price}>${car.rentalPrice}</p>
          </div>
        </div>
        <p className={css.description}>{car.description}</p>
      </div>

      <div className={css.info}>
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Rental Conditions:</h2>
          <InfoList items={conditions} />
        </section>

        <hr className={css.divider} />

        <section className={css.section}>
          <h2 className={css.sectionTitle}>Car Specifications:</h2>
          <InfoList items={specifications} />
        </section>

        <hr className={css.divider} />

        <section className={css.section}>
          <h2 className={css.sectionTitle}>Features</h2>
          <InfoList items={features} />
        </section>
      </div>
    </section>
  );
}