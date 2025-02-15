'use client'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  MapPinIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { getPastEvents, getUpcomingEvents } from '../network/firebase'
import { DocumentData } from 'firebase/firestore'
import { daysUntil } from '../utils/dateCheck'

const sortOptions = [
  { name: 'Mas Reciente', href: '#' },
  { name: 'Precio: Bajo a Alto', href: '#' },
  { name: 'Precio: Alto a Bajo', href: '#' },
]
const filters = [
  {
    id: 'city',
    name: 'Ciudad',
    options: [
      { value: 'cdmx', label: 'Ciudad de Mexico' },
      { value: 'los-cabos', label: 'Los Cabos' },
    ],
  },
  {
    id: 'collective',
    name: 'Colectivo',
    options: [
      { value: 'ZONT', label: 'ZONT' },
      { value: 'Mecha', label: 'Mecha' },
      { value: 'Daze', label: 'Daze' },
      { value: 'Discourse', label: 'Discourse' }
    ],
  },
  {
    id: 'category',
    name: 'Categoria',
    options: [
      { value: 'Music', label: 'Music' },
      { value: 'Dance', label: 'Dance' },
    ],
  }
]

export default function Events() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<DocumentData[]>([])
  const [pastEvents, setPastEvents] = useState<DocumentData[]>([])

  useEffect(() => {
    getUpcomingEvents().then((events) => {
      setUpcomingEvents(events.filter((event): event is DocumentData => event !== undefined));
    });

    getPastEvents().then((events) => {
      setPastEvents(events.filter((event): event is DocumentData => event !== undefined));
    });
  }, [])

  return (
    <div className="bg-gray-50">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 sm:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {filters.map((section) => (
                  <Disclosure key={section.name} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 rotate-0 transform group-data-[open]:-rotate-180"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="py-24 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">¡Eventos que no te puedes perder!</h1>
              <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
                Aquí encontrarás los eventos de ZONT y de nuestros colaboradores de otros colectivos,
                ofreciendo una variedad de experiencias musicales únicas y exclusivas para que disfrutes
                lo mejor de la escena.
              </p>
            </div>

            {/* Filters */}
            <section aria-labelledby="filter-heading" className="border-t border-gray-200 pt-6">
              <h2 id="filter-heading" className="sr-only">
                Product filters
              </h2>

              <div className="flex items-center justify-between">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Filtrar
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute left-0 z-20 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className="block px-4 py-2 text-sm font-medium text-gray-900 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                >
                  Filters
                </button>

                <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
                  {filters.map((section) => (
                    <Popover key={section.name} id="menu" className="relative inline-block text-left">
                      <div>
                        <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          <span>{section.name}</span>
                          {/* {sectionIdx === 0 ? (
                            <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                              1
                            </span>
                          ) : null} */}
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                          />
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute right-0 z-40 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <form className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:checked]:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </form>
                      </PopoverPanel>
                    </Popover>
                  ))}
                </PopoverGroup>
              </div>
            </section>

            {/* Product grid */}
            <section aria-labelledby="upcoming-events" className="mt-8">
              <h2 id="upcoming-events" className="sr-only">
                Próximos eventos
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {upcomingEvents.map((event) => (
                  <a key={event.eventId} href={`events/${event.eventId}`} className="group relative">
                    <div className="relative">
                      <div className="absolute z-10 -left-2 -top-2">
                        <span className="rounded-md bg-black/90 px-3 py-2 text-lg font-medium text-white ring-1 ring-inset ring-black">
                          {event.collective}
                        </span>
                      </div>
                      <div className="absolute z-10 -left-2 top-8">
                        <span className="rounded-md bg-black/90 px-3 py-2 font-medium text-white ring-1 ring-inset ring-black flex items-center gap-1">
                          <MapPinIcon className="size-5" />
                          {event.city}
                        </span>
                      </div>

                      {daysUntil(event?.dateStart, event?.dateEnd).daysUntilStart >= -1 &&
                        <div className="absolute z-10 -left-2 bottom-8">
                          <span className={`rounded-md px-3 py-2 font-medium text-white ring-1 ring-inset ring-indigo-500 flex items-center gap-1 ${daysUntil(event?.dateStart, event?.dateEnd).daysUntilStart === -1 && daysUntil(event?.dateStart, event?.dateEnd).isHappening ? 'animate-party-vibe' : 'bg-indigo-500/90'}`}>
                            {daysUntil(event?.dateStart, event?.dateEnd).daysUntilStart === 0 && 'Hoy'}
                            {daysUntil(event?.dateStart, event?.dateEnd).daysUntilStart === 1 && 'Mañana'}
                            {(daysUntil(event?.dateStart, event?.dateEnd).daysUntilStart === -1 && daysUntil(event?.dateStart, event?.dateEnd).isHappening) && '🎉 En Curso'}
                            {daysUntil(event?.dateStart, event?.dateEnd).daysUntilStart > 1 && `En ${daysUntil(event?.dateStart, event?.dateEnd).daysUntilStart} días`}
                          </span>
                        </div>
                      }
                      <img
                        alt={event.imageAlt}
                        src={event.imgUrl}
                        className="aspect-square w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-[2/3]"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                      <h3>{event.title}</h3>
                      {new Date(event?.dateStart?.seconds * 1000).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <p className="mt-1 text-sm italic text-gray-500">{event.description}</p>
                  </a>
                ))}
              </div>
            </section>

            <section aria-labelledby="featured-heading" className="relative mt-16 overflow-hidden rounded-lg lg:h-96">
              <div className="absolute inset-0">
                <img
                  alt=""
                  src="/promote_event.jpg"
                  className="size-full object-cover"
                />
              </div>
              <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
              <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
              <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black/75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
                <div>
                  <h2 id="featured-heading" className="text-xl font-bold text-white">
                    Quieres que salgo to evento aqui?
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    Mándanos un mensaje y te ayudamos a promocionar tu evento.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="mt-6 flex shrink-0 items-center justify-center rounded-md border border-white/25 px-4 py-3 text-base font-medium text-white hover:bg-white/10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
                >
                  Mandar mensaje
                </a>
              </div>
            </section>

            <section aria-labelledby="more-products-heading" className="mt-16 pb-24">
              <h2 id="more-products-heading" className="sr-only">
                More products
              </h2>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-8">Eventos pasados</h1>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {pastEvents.map((event) => (
                  <a key={event.eventId} href={`events/${event.eventId}`} className="group relative">
                    <div className="relative">
                      <div className="absolute z-10 -left-2 -top-2">
                        <span className="rounded-md bg-black/90 px-3 py-2 text-lg font-medium text-white ring-1 ring-inset ring-black">
                          {event.collective}
                        </span>
                      </div>
                      <div className="absolute z-10 -left-2 top-8">
                        <span className="rounded-md bg-black/90 px-3 py-2 font-medium text-white ring-1 ring-inset ring-black flex items-center gap-1">
                          <MapPinIcon className="size-5" />
                          {event.city}
                        </span>
                      </div>

                      <img
                        alt={event.imageAlt}
                        src={event.imgUrl}
                        className="aspect-square w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-[2/3]"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                      <h3>{event.title}</h3>
                      {new Date(event?.dateStart?.seconds * 1000).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <p className="mt-1 text-sm italic text-gray-500">{event.description}</p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>

      </div>
    </div>
  )
}
