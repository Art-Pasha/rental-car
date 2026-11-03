import Loader from "@/components/Loader/Loader";
import css from "./LoadingCard.module.css";

export default function LoadingCard() {
  return (
    <div className={css.card}>
      <Loader />
      <div className={css.text}>
        <p className={css.title}>Loading cars...</p>
        <p className={css.description}>
          Please wait while we fetch the best
          <br />
          cars for you
        </p>
      </div>
    </div>
  );
}