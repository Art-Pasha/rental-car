import type { Metadata } from "next";
import CarDetailsClient from "@/components/CarDetailsClient/CarDetailsClient";
import type { Car } from "@/types/car";

type Props = { params: Promise<{ carId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carId } = await params;

  try {
    const res = await fetch(
      `https://car-rental-api.goit.study/cars/${encodeURIComponent(carId)}`,
    );
    if (!res.ok) throw new Error("Car not found");
    const car: Car = await res.json();

    return {
      title: `${car.brand} ${car.model}, ${car.year} | RentalCar`,
      description: car.description,
    };
  } catch {
    return {
      title: "Car details | RentalCar",
      description: "Details of the selected rental car.",
    };
  }
}

export default async function CarPage({ params }: Props) {
  const { carId } = await params;
  return <CarDetailsClient carId={carId} />;
}