'use client'
import { DatePicker } from "@nextui-org/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
// import TimeSlots from '@/components/ui/time-slots';
import { useState } from 'react';
// import { getReservations } from '@/app/network/firebase';
// import { Timestamp } from 'firebase/firestore';
import { classNames } from "@/app/utils/classesNames"

const product = {
  name: 'Estudio De Produccion',
  price: '$300',
  images: [
    {
      id: 1,
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-product-shot-01.jpg',
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-product-shot-02.jpg',
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  description: `
    <p>¿Listo para llevar tus habilidades de DJ al siguiente nivel? En ZONT, ofrecemos un estudio totalmente equipado que puedes reservar para practicar y perfeccionar tus sets. Con equipos de última generación, un ambiente profesional y el espacio perfecto para que puedas concentrarte en tu música, este estudio es ideal para DJs de todos los niveles.</p>
  `,
  details: [
    'XDJ-AZ o DDJ-1000',
    'KRK Classic 5 Monitores',
    'Mesa Ajustable',
  ],
}
const policies = [
  { name: 'Audifonos', description: 'Audifonos con cable o ' },
  { name: 'USB', description: "USB formateado con Rekordbox o Serato" },
]

export default function ScheduleProduction() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(today(getLocalTimeZone()))
  const [selectedTimeDuration, setSelectedTimeDuration] = useState<{
    time: number;
    length: number;
  } | null>(null)

  // const checkAvailabilityWhenTime = (time: number, length: number) => {
  //   setSelectedTimeDuration({ time, length })

  //   if (selectedDate) {
  //     const dateFormat = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day, time, 0, 0, 0);
  //     const firebaseTimestamp = Timestamp.fromDate(dateFormat);
  //     const available = getReservations(firebaseTimestamp, length)
  //     available.then((res) => {
  //       console.log(res
  //       )
  //     })
  //   }
  // }

  const checkAvailabilityWhenDate = (date: CalendarDate) => {
    setSelectedDate(date)

    if (selectedTimeDuration) {
      // const dateFormat = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day, selectedTimeDuration.time, 0, 0, 0);
      // const firebaseTimestamp = Timestamp.fromDate(dateFormat);
      // const available = getReservations(firebaseTimestamp, selectedTimeDuration.length)
      // available.then((res) => {
      //   console.log(res)
      // })
    }
  }

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
                <p className="text-xl font-medium text-gray-900">{product.price} /hr</p>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {product.images.map((image) => (
                  <img
                    key={image.id}
                    alt={image.imageAlt}
                    src={image.imageSrc}
                    className={classNames(
                      image.primary ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                      'rounded-lg',
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 lg:col-span-5">
              <form>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Dia y Hora</h2>
                  <div className="w-full mt-2">
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                      <div className="col-span-1 w-full">
                        <DatePicker
                          size='lg'
                          label="Dia"
                          disableAnimation
                          value={selectedDate}
                          minValue={today(getLocalTimeZone())}
                          onChange={(date) => {
                            if (date) {
                              checkAvailabilityWhenDate(date);
                            }
                          }}
                        />
                      </div>

                      <div className='col-span-1 w-full'>
                        {/* <TimeSlots setScheduleTime={checkAvailabilityWhenTime} /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Agregar al Carrito
                </button>

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Finalizar Compra
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Descripcion</h2>

                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="mt-4 space-y-4 text-sm/6 text-gray-500"
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Equipo del Estudio</h2>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-500 marker:text-gray-300">
                    {product.details.map((item) => (
                      <li key={item} className="pl-2">
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
                <h2 className="text-sm font-medium text-gray-900">Lo Que Tienes Que Traer</h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mt-4">
                  {policies.map((policy) => (
                    <div key={policy.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                      <dt>
                        {
                          policy.name === 'Audifonos' ?
                            <svg className='mx-auto mb-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#A9A9A9"><path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" /></svg>
                            :
                            <svg className='mx-auto mb-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#A9A9A9"><path d="M480-80q-33 0-56.5-23.5T400-160q0-21 11-39t29-29v-92H320q-33 0-56.5-23.5T240-400v-92q-18-9-29-27t-11-41q0-33 23.5-56.5T280-640q33 0 56.5 23.5T360-560q0 23-11 40t-29 28v92h120v-320h-80l120-160 120 160h-80v320h120v-80h-40v-160h160v160h-40v80q0 33-23.5 56.5T640-320H520v92q19 10 29.5 28t10.5 40q0 33-23.5 56.5T480-80Z" /></svg>}
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
