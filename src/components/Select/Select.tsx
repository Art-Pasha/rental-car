"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import css from "./Select.module.css";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  /** Desktop width in px. On mobile ignored (full width). */
  width?: number;
  listHeight?: number;
  formatSelected?: (label: string) => string;
}

export default function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
  width,
  listHeight = 272,
  formatSelected,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const selected = options.find((option) => option.value === value);
  const selectedText = selected
    ? formatSelected
      ? formatSelected(selected.label)
      : selected.label
    : placeholder;

  // Fixed width only from tablet up; mobile stays 100%
  const style: React.CSSProperties = width
    ? ({
        ["--select-width" as string]: `${width}px`,
      } as React.CSSProperties)
    : {};

  return (
    <div
      ref={rootRef}
      className={css.root}
      style={style}
      data-has-width={width ? "true" : undefined}
    >
      <span id={labelId} className={css.label}>
        {label}
      </span>

      <button
        type="button"
        className={css.trigger}
        aria-labelledby={labelId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedText}</span>
        {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>

      {isOpen && (
        <ul className={css.list} style={{ maxHeight: listHeight }}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={option.value === value ? css.itemActive : css.item}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
