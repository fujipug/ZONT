'use client'
import {
  HomeIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { DocumentData } from 'firebase/firestore'
import { getEventById } from '@/app/network/firebase';
import GoogleMap from '@/app/utils/GoogleMap';

const pages = [
  { name: 'Eventos', href: '/events', current: false },
  { name: 'Evento actual', href: '#', current: true },
]

export default function Event() {
  const params = useParams()
  const [event, setEvent] = useState<DocumentData | null>(null)

  useEffect(() => {
    if (typeof params.slug === 'string') {
      getEventById(params.slug).then((res) => {
        if (res) {
          setEvent(res)
        }
      });
    }
  }, [])

  return (
    <div className="bg-gray-50">
      <nav aria-label="Breadcrumb" className="flex border-b border-gray-200 bg-white">
        <ol role="list" className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
          <li className="flex">
            <div className="flex items-center">
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="h-full w-6 shrink-0 text-gray-200"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <a
                  href={page.href}
                  aria-current={page.current ? 'page' : undefined}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div>
              <h3 className="text-sm/4 font-semibold text-indigo-600">Fecha: {''}
                {new Date(event?.dateStart?.seconds * 1000).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
              <h1 className="text-xl font-medium text-gray-900">{event?.title}</h1>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              <img
                // alt={image.imageAlt}
                src={event?.imgUrl}
                className='lg:col-span-2 lg:row-span-2'
              />
              {/* {product.images.map((image) => (
                <img
                  key={image.id}
                  alt={image.imageAlt}
                  src={image.imageSrc}
                  className='hidden lg:block rounded-lg'
                />
              ))} */}
            </div>
          </div>

          <div className="mt- lg:col-span-5">
            <form>
              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
              >
                Ir a Taquilla
              </button>
              {/* <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                ${event?.inPersonPrice}
              </button> */}
            </form>

            {/* Event details */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Descripcion</h2>

              <div
                dangerouslySetInnerHTML={{ __html: event?.description }}
                className="mt-4 space-y-4 text-sm/6 text-gray-500"
              />
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Detalles del Evento</h2>
              <div
                dangerouslySetInnerHTML={{ __html: event?.details }}
                className="mt-4 space-y-4 text-sm/6 text-gray-500"
              />
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Ubicacion</h2>
              <p className="my-4 text-gray-500">{event?.address}</p>
              {(event?.title && event?.mapsLocation) &&
                <GoogleMap title={event.title} lat={Number(event.mapsLocation?._lat)} long={Number(event.mapsLocation?._long)} />
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
