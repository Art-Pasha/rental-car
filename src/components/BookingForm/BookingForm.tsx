"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { createBookingRequest } from "@/lib/carsApi";
import type { BookingPayload } from "@/types/car";
import css from "./BookingForm.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormValues {
  name: string;
  email: string;
  comment: string;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  showBadge?: boolean;
  multiline?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, showBadge, multiline, children }: FieldProps) {
  return (
    <div className={css.field}>
      <div className={css.control}>
        {children}
        {error && (
          <>
            {showBadge && <span className={css.badge}>{label}</span>}
            <FiAlertCircle
              size={24}
              aria-hidden="true"
              className={multiline ? css.iconMultiline : css.icon}
            />
          </>
        )}
      </div>
      <p id={`${id}-error`} className={css.message} role={error ? "alert" : undefined}>
        {error}
      </p>
    </div>
  );
}

export default function BookingForm({ carId }: { carId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { name: "", email: "", comment: "" } });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: BookingPayload) => createBookingRequest(carId, payload),
    onSuccess: (data) => {
      toast.success(data.message || "Your car has been successfully booked!");
      reset();
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate({
      name: values.name.trim(),
      email: values.email.trim(),
      comment: values.comment.trim(),
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.title}>
        <h2 className={css.heading}>Book your car now</h2>
        <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      </div>

      <div className={css.inputs}>
        <div className={css.fields}>
          <Field id="booking-name" label="Name*" error={errors.name?.message} showBadge>
            <input
              id="booking-name"
              type="text"
              placeholder="Name*"
              autoComplete="name"
              className={css.input}
              aria-invalid={!!errors.name}
              aria-describedby="booking-name-error"
              {...register("name", {
                validate: (value) =>
                  (value.trim().length > 0 && !/\d/.test(value)) || "Please enter your name.",
              })}
            />
          </Field>

          <Field id="booking-email" label="Email*" error={errors.email?.message} showBadge>
            <input
              id="booking-email"
              type="email"
              placeholder="Email*"
              autoComplete="email"
              className={css.input}
              aria-invalid={!!errors.email}
              aria-describedby="booking-email-error"
              {...register("email", {
                validate: (value) =>
                  EMAIL_PATTERN.test(value.trim()) || "Please enter your email.",
              })}
            />
          </Field>

          <Field id="booking-comment" label="Comment" error={errors.comment?.message} multiline>
            <textarea
              id="booking-comment"
              placeholder="Comment"
              className={`${css.input} ${css.textarea}`}
              aria-invalid={!!errors.comment}
              aria-describedby="booking-comment-error"
              {...register("comment", {
                validate: (value) => value.trim().length > 0 || "Comment is required",
              })}
            />
          </Field>
        </div>

        <button type="submit" className={css.button} disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}