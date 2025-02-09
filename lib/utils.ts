import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date:Date, locale:string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long", // Full day name
    day: "numeric",
    month: "long", // Full month name
    year: "numeric"
  }).format(date);
}