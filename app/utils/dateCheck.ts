import { Timestamp } from "firebase/firestore";

export const pastDateCheck = (date: Timestamp) => {
  const now = Timestamp.now();
  return date.seconds < now.seconds;
}

export const daysUntil = (dateStart: Timestamp, dateEnd: Timestamp) => {
  const now = Timestamp.now();
  const diffInSeconds = dateStart.seconds - now.seconds;
  const daysUntilStart = Math.floor(diffInSeconds / 86400);
  const isHappening = now.seconds >= dateStart.seconds && now.seconds <= dateEnd.seconds;

  return {
    daysUntilStart,
    isHappening,
  };
};