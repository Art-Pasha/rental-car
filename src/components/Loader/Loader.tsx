import css from "./Loader.module.css";

export default function Loader() {
  return (
    <svg className={css.loader} width="72" height="72" viewBox="0 0 72 72" role="status" aria-label="Loading">
      <circle className={css.track} cx="36" cy="36" r="32" />
      <circle className={css.arc} cx="36" cy="36" r="32" transform="rotate(-90 36 36)" />
    </svg>
  );
}