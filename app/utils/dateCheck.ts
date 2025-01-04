import { Timestamp } from "firebase/firestore";

export const pastDateCheck = (date: Timestamp) => {
  const now = Timestamp.now();
  return date.seconds < now.seconds;
}

export const daysUntil = (date: Timestamp) => {
  const now = Timestamp.now();
  const diffInSeconds = date.seconds - now.seconds;
  const days = Math.floor(diffInSeconds / 86400);

  if (days === 0) {
    return "Hoy";
  }

  return days;
}