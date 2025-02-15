'use client'
import { DatePicker } from "@heroui/date-picker";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { useEffect, useState } from 'react';
import { classNames } from "@/app/utils/classesNames"
import { DocumentData, Timestamp } from "firebase/firestore";
import TimeSlots from "@/components/ui/time-slots";
import { getReservations } from "@/app/network/firebase";
import { getOverlappingHours } from "@/app/utils/overlappingHours";
import { useCart } from "@/app/utils/CartContext";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import Alerts from "@/components/ui/alerts";
import { I18nProvider } from "@react-aria/i18n";

interface Reservation {
  reservationId: string;
  dateStart: Timestamp;
  dateEnd: Timestamp;
}

const policies = [
  { name: 'Audifonos', description: 'Audifonos con cable', svg: <svg className='mx-auto mb-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#A9A9A9"><path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" /></svg> },
  { name: 'USB', description: "USB para guardar tus ficheros", svg: <svg className='mx-auto mb-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#A9A9A9"><path d="M480-80q-33 0-56.5-23.5T400-160q0-21 11-39t29-29v-92H320q-33 0-56.5-23.5T240-400v-92q-18-9-29-27t-11-41q0-33 23.5-56.5T280-640q33 0 56.5 23.5T360-560q0 23-11 40t-29 28v92h120v-320h-80l120-160 120 160h-80v320h120v-80h-40v-160h160v160h-40v80q0 33-23.5 56.5T640-320H520v92q19 10 29.5 28t10.5 40q0 33-23.5 56.5T480-80Z" /></svg> },
  { name: 'Instrumentos', description: "Puedes traer cualquier equipo que quieres utilizar", svg: <MusicalNoteIcon className='mx-auto mb-2' stroke="#A9A9A9" width="24px" /> },
]

export default function ScheduleProduction({ serviceData }: { serviceData: DocumentData }) {
  const { addToCart } = useCart()
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(today(getLocalTimeZone()))
  const [overlappingHours, setOverlappingHours] = useState<Record<string, number[]>>({})
  const [selectedTimeDuration, setSelectedTimeDuration] = useState<{
    time: number;
    length: number;
  } | null>(null)

  useEffect(() => {
    const dateFormat = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    const firebaseTimestamp = Timestamp.fromDate(dateFormat);
    getReservations(firebaseTimestamp).then((reservations) => {
      const hourOverlap = getOverlappingHoursForDay(reservations as Reservation[], firebaseTimestamp);
      setOverlappingHours(hourOverlap);
    });
  }, [selectedDate])

  const getOverlappingHoursForDay = (reservations: Reservation[], timestamp: Timestamp) => {
    const result: Record<string, number[]> = {};

    reservations?.forEach((reservation) => {
      result[reservation.reservationId] = getOverlappingHours(reservation, timestamp);
    });

    return result;
  };

  const handleTimeSelected = (time: number, length: number) => {
    if (time === 0 && length === 0) {
      setSelectedTimeDuration(null)
    } else {
      setSelectedTimeDuration({ time, length })
    }
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (selectedDate && selectedTimeDuration) {
      addToCart({
        itemId: 'produce',
        type: 'services',
        date: selectedDate,
        time: selectedTimeDuration.time,
        length: selectedTimeDuration.length,
      })

      setIsAlertVisible(true)
    }
  }

  return (
    <div className="bg-gray-50">
      <Alerts color="success" variant="faded" title="Listo"
        description="Tu tiempo de producion fue agregado al carrito"
        isVisible={isAlertVisible} visibility={setIsAlertVisible} />
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{serviceData.title}</h1>
                <p className="text-xl font-medium text-gray-900">${serviceData.price} /hr</p>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {serviceData.imgUrls?.map((imgUrl: string, index: number) => (
                  <img
                    key={index}
                    alt='Production Studio'
                    src={imgUrl}
                    className={classNames(
                      index === 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                      'rounded-lg',
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 lg:col-span-5">
              <form>
                <div>
                  <div className="w-full mt-2">
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                      <div className="col-span-1 w-full">
                        <I18nProvider locale="es-ES">
                          <DatePicker
                            size='lg'
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
                        </I18nProvider>
                      </div>

                      <div className='col-span-1 w-full'>
                        <TimeSlots selectedDate={selectedDate} overlappingHours={overlappingHours} setScheduleTime={handleTimeSelected} />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  disabled={!selectedDate || !selectedTimeDuration}
                  onClick={handleAddToCart}
                  type="submit"
                  className={classNames(
                    !selectedDate || !selectedTimeDuration
                      ? 'mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-300 px-8 py-3 text-base font-medium text-gray-400 cursor-not-allowed'
                      : 'mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  )}
                >
                  Agregar al carrito
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Descripcion</h2>

                <div className="mt-4 space-y-4 text-sm/6 text-gray-500">
                  {serviceData.description}
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Equipo del estudio</h2>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-500 marker:text-gray-300">
                    {serviceData.details?.map((item: string, index: number) => (
                      <li key={index} className="pl-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>
                <h2 className="text-sm font-medium text-gray-900">Lo que tienes que traer</h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mt-4">
                  {policies.map((policy) => (
                    <div key={policy.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                      <dt>
                        {policy.svg}
                        <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
