import { CalendarDate } from "@internationalized/date";
import { Timestamp } from "firebase/firestore";

interface DateTimeRangeParams {
  dateSelected: CalendarDate; // The selected calendar date
  time: number; // Military time (e.g., 1430 for 2:30 PM)
  length: number; // Duration in hours
}

interface DateTimeRangeResult {
  dateStart: Timestamp;
  dateEnd: Timestamp;
}

export const calculateDateTimeRange = ({
  dateSelected,
  time,
  length,
}: DateTimeRangeParams): DateTimeRangeResult => {
  const dateStart = new Date(dateSelected.year, dateSelected.month - 1, dateSelected.day);
  dateStart.setHours(time);

  const dateEnd = new Date(dateStart);
  dateEnd.setHours(dateEnd.getHours() + length);

  const toTimestamp = (date: Date): Timestamp => {
    return Timestamp.fromDate(date);
  };

  return {
    dateStart: toTimestamp(dateStart),
    dateEnd: toTimestamp(dateEnd),
  };
};