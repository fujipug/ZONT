'use client'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  TicketIcon,
  BuildingStorefrontIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { classNames } from '@/app/utils/classesNames'
import Dashboard from './(admin-pages)/dashboard'
import Courses from './(admin-pages)/courses'
import Reservations from './(admin-pages)/reservations'
import Events from './(admin-pages)/events'
import Store from './(admin-pages)/store'
import Blogs from './(admin-pages)/blogs'
import Users from './(admin-pages)/users'
import Messages from './(admin-pages)/messages'
import { getUnreadMessagesCount } from '../network/firebase'
import WithAdminAuth from '../utils/WithAdminAuth'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon },
  { name: 'Reservaciones', href: '#', icon: CalendarDaysIcon },
  { name: 'Classes', href: '#', icon: AcademicCapIcon },
  { name: 'Eventos', href: '#', icon: TicketIcon },
  { name: 'Tienda', href: '#', icon: BuildingStorefrontIcon },
  { name: 'Blogs', href: '#', icon: NewspaperIcon },
]
const management = [
  { name: 'Manejar Usuarios', href: '#', initial: 'U' },
  { name: 'Mensajes', href: '#', initial: 'M' },
  // { name: 'Quejas', href: '#', initial: 'Q' },
]

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')
  const [unreadMessages, setUnreadMessages] = useState(0)

  useEffect(() => {
    getUnreadMessagesCount().then((count) => {
      setUnreadMessages(count)
    })
  }, [])

  return (
    <>
      <div className='bg-gray-50'>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="ZONT"
                    src="/ZONT_white.svg"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              onClick={() => setActivePage(item.name)}
                              className={classNames(
                                item.name === activePage
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon aria-hidden="true" className="size-6 shrink-0" />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">Manejar</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {management.map((manage) => (
                          <li key={manage.name}>
                            <a
                              onClick={() => setActivePage(manage.name)}
                              className={classNames(
                                manage.name
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                {manage.initial}
                              </span>

                              {manage.name === "Mensajes" ? (
                                <span className="truncate">{manage.name} <span className='bg-red-400 p-2 rounded-lg'>{unreadMessages}</span></span>
                              ) : (
                                <span className="truncate">{manage.name}</span>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="ZONT"
                src="/ZONT_white.svg"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          onClick={() => setActivePage(item.name)}
                          className={classNames(
                            item.name === activePage
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon aria-hidden="true" className="size-6 shrink-0" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs/6 font-semibold text-gray-400">Manejar</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {management.map((manage) => (
                      <li key={manage.name}>
                        <a
                          onClick={() => setActivePage(manage.name)}
                          className={classNames(
                            manage.name
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {manage.initial}
                          </span>
                          {manage.name === "Mensajes" ? (
                            <span className="truncate">{manage.name} <span className='bg-red-400 p-2 rounded-lg'>{unreadMessages}</span></span>
                          ) : (
                            <span className="truncate">{manage.name}</span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                <input
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {activePage === 'Dashboard' && <Dashboard />}
              {activePage === 'Classes' && <Courses />}
              {activePage === 'Reservaciones' && <Reservations />}
              {activePage === 'Eventos' && <Events />}
              {activePage === 'Tienda' && <Store />}
              {activePage === 'Blogs' && <Blogs />}
              {activePage === 'Manejar Usuarios' && <Users />}
              {activePage === 'Mensajes' && <Messages />}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default WithAdminAuth(AdminDashboard);