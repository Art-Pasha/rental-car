"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Select from "@/components/Select/Select";
import { useFiltersMeta } from "@/hooks/useFiltersMeta";
import { formatDigits } from "@/lib/format";
import type { CarsFilters } from "@/types/car";
import css from "./Filters.module.css";

interface FiltersProps {
  onSearch: (filters: CarsFilters) => void;
  onReset: () => void;
}

const PRICE_STEP = 10;

function buildPriceOptions(min: number, max: number) {
  const prices: number[] = [];
  for (let price = min; price <= max; price += PRICE_STEP) prices.push(price);
  if (prices[prices.length - 1] !== max) prices.push(max);
  return prices.map((price) => ({ value: String(price), label: String(price) }));
}

const toNumber = (value: string) => (value ? Number(value) : undefined);
const onlyDigits = (value: string) => value.replace(/\D/g, "").slice(0, 7);

export default function Filters({ onSearch, onReset }: FiltersProps) {
  const { data: meta } = useFiltersMeta();
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const brandOptions = (meta?.brands ?? []).map((item) => ({ value: item, label: item }));
  const priceOptions = meta ? buildPriceOptions(meta.price.min, meta.price.max) : [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (minMileage && maxMileage && Number(minMileage) > Number(maxMileage)) {
      toast.error("“From” mileage can’t be greater than “To”");
      return;
    }

    onSearch({
      brand: brand || undefined,
      price: toNumber(price),
      minMileage: toNumber(minMileage),
      maxMileage: toNumber(maxMileage),
    });
  };

  const handleReset = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
    onReset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.row}>
        <div className={css.fields}>
          <Select
            label="Car brand"
            placeholder="Choose a brand"
            options={brandOptions}
            value={brand}
            onChange={setBrand}
            width={204}
          />
          <Select
            label="Price/ 1 hour"
            placeholder="Choose a price"
            options={priceOptions}
            value={price}
            onChange={setPrice}
            width={196}
            listHeight={260}
            formatSelected={(label) => `To $${label}`}
          />
          <div className={css.mileage} role="group" aria-labelledby="mileage-label">
            <span id="mileage-label" className={css.label}>
              Car mileage / km
            </span>
            <div className={css.range}>
              <label className={css.from}>
                <span>From</span>
                <input
                  inputMode="numeric"
                  value={formatDigits(minMileage)}
                  onChange={(e) => setMinMileage(onlyDigits(e.target.value))}
                />
              </label>
              <label className={css.to}>
                <span>To</span>
                <input
                  inputMode="numeric"
                  value={formatDigits(maxMileage)}
                  onChange={(e) => setMaxMileage(onlyDigits(e.target.value))}
                />
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className={css.search}>
          Search
        </button>
      </div>

      <button type="button" className={css.clear} onClick={handleReset}>
        Clear filters
      </button>
    </form>
  );
}