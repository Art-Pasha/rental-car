import type { Metadata } from "next";
import CatalogClient from "@/components/CatalogClient/CatalogClient";

export const metadata: Metadata = {
  title: "Catalog | RentalCar",
  description: "Browse available rental cars and filter them by brand, price and mileage.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}