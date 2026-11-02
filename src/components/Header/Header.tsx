"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} aria-label="RentalCar home">
        Rental<span>Car</span>
      </Link>
      <nav>
        <ul className={css.menu}>
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link href={href} className={active ? css.active : css.link}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}