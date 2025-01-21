import { Timestamp } from 'firebase/firestore';

export function getDifferenceInHours(timestamp1: Timestamp, timestamp2: Timestamp): number {
    // Convert timestamps to milliseconds
    const time1 = timestamp1.seconds * 1000;
    const time2 = timestamp2.seconds * 1000;

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Math.abs(time1 - time2);

    // Convert milliseconds to hours
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    return differenceInHours;
}