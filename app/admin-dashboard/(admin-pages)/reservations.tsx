import { useEffect, useState } from "react"
import { deleteReservationById, getReservations } from "@/app/network/firebase"
import { DocumentData, Timestamp } from "firebase/firestore"
import { DatePicker } from "@heroui/date-picker"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"
import { getDifferenceInHours } from "@/app/utils/timeDifference"
import { Button } from "@heroui/react"
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline"

export default function Reservations() {
  const [reservations, setReservations] = useState<DocumentData[]>([])
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(today(getLocalTimeZone()))

  useEffect(() => {
    const dateFormat = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    const firebaseTimestamp = Timestamp.fromDate(dateFormat);
    getReservations(firebaseTimestamp).then((reservations) => {
      setReservations(reservations as DocumentData[])
    })
  }, [selectedDate])

  const handleDeleteReservation = (reservationId: string) => {
    deleteReservationById(reservationId).then(() => {
      const newReservations = reservations.filter((reservation) => reservation.reservationId !== reservationId);
      setReservations(newReservations);
    })
  }

  return (
    <div className="bg-gray-50 h-screen">
      <div className="flex items-center mb-6 space-x-10">
        <h2 className="text-bold text-2xl mb-4">Reservaciones</h2>
        <DatePicker
          className="w-48"
          size='sm'
          color="secondary"
          label="Dia"
          disableAnimation
          value={selectedDate}
          minValue={today(getLocalTimeZone())}
          onChange={(date) => {
            if (date) {
              setSelectedDate(date)
            }
          }}
        />
      </div>

      {reservations.length === 0 ? (

        <div className="flex items-center justify-center h-96">
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No hay reservaciones para este día</p>
        </div>
      )
        :
        (
          <ol className="relative border-s border-indigo-200 dark:border-gray-700">
            {reservations.map((reservation, index) => (
              <li key={index} className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-indigo-600 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-500">
                  <span className="font-semibold text-indigo-600">
                    {new Date(reservation?.dateStart?.seconds * 1000).toLocaleString("es-MX", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {" "}
                  |
                  {" "}
                  <span className="font-semibold">
                    {new Date(reservation?.dateStart?.seconds * 1000).toLocaleString("es-MX", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  {" "}
                  -
                  {" "}
                  <span className="font-semibold">
                    {new Date(reservation?.dateEnd?.seconds * 1000).toLocaleString("es-MX", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  {" "}
                  |
                  {" "}
                  <span className="font-semibold text-black">
                    {getDifferenceInHours(reservation.dateStart, reservation.dateEnd) === 1 ?
                      `${getDifferenceInHours(reservation.dateStart, reservation.dateEnd)} hora` :
                      `${getDifferenceInHours(reservation.dateStart, reservation.dateEnd)} horas`
                    }
                  </span>
                </time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{reservation.title}</h3>
                <div className="flex items-center jus space-x-2">
                  <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">{reservation.client}</p>
                </div>
                <div className="flex items-center space-x-2 mb-4 mt-2">
                  <EnvelopeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">{reservation.email}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <Button color="secondary" variant="flat">
                    Editar
                  </Button>
                  <Button onPress={() => handleDeleteReservation(reservation.reservationId)} color="danger" variant="ghost">
                    Eliminar
                  </Button>
                </div>
              </li>
            ))}
          </ol>
        )}
    </div>
  )
}
