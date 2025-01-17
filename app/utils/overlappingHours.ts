import { Timestamp } from "firebase/firestore";

interface Reservation {
  reservationId: string;
  dateStart: Timestamp;
  dateEnd: Timestamp;
}

export const getOverlappingHours = (reservation: Reservation, timestamp: Timestamp) => {
  const reservationStart = reservation.dateStart.toDate();
  const reservationEnd = reservation.dateEnd.toDate();
  const startOfDay = new Date(timestamp.toDate().setHours(0, 0, 0, 0));
  const endOfDay = new Date(timestamp.toDate().setHours(23, 59, 59, 999));

  const overlapStart = new Date(Math.max(startOfDay.getTime(), reservationStart.getTime()));
  const overlapEnd = new Date(Math.min(endOfDay.getTime(), reservationEnd.getTime()));

  if (overlapStart >= overlapEnd) {
    return []; // No overlap
  }

  const overlappingHours: number[] = [];
  const currentHour = new Date(overlapStart.setMinutes(0, 0, 0));

  while (currentHour <= overlapEnd) {
    overlappingHours.push(currentHour.getHours());
    currentHour.setHours(currentHour.getHours() + 1);
  }

  return overlappingHours;
};