'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import AuthModal from './auth-modal'
import Link from 'next/link'
import { useAuth } from '@/app/utils/AuthContext'
import { useRouter } from 'next/navigation'
import { classNames } from "@/app/utils/classesNames"

const navigation = [
  { name: 'Classes', href: '/courses', current: false },
  { name: 'Eventos', href: '/events', current: false },
  { name: 'Tienda', href: '/store', current: false },
  { name: 'Ayuda', href: '/help', current: false },
]

const userNavigation = [
  { name: 'Tu Perfil', href: '/profile' },
  { name: 'Configuración', href: '/settings' },
]

export default function Navbar() {
  const { isSignedIn, profile } = useAuth();
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { signOut } = useAuth();

  const handleZontMembers = () => {
    if (isSignedIn) {
      router.push('/members')
    } else {
      setOpen(true);
    }
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <img
                    alt="ZONT"
                    src="/ZONT_white.svg"
                    className="h-6 w-auto"
                  />
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="shrink-0">
                <span onClick={handleZontMembers} className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-3 text-sm font-semibold cursor-pointer mr-2'>
                  Miembros ZONT
                </span>
                <Link
                  href="/schedule"
                  type="button"
                  className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Reserva
                </Link>
              </div>

              {isSignedIn &&
                <div className="hidden md:ml-4 md:flex md:shrink-0 md:items-center">
                  {/* <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {profile?.imgUrl ?
                          <img alt="Avatar" src={profile?.imgUrl} className="size-8 rounded-full" />
                          :
                          <UserIcon className="size-8 rounded-full" />
                        }
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                      <MenuItem>
                        <a
                          onClick={signOut}
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        >
                          Cerrar sesión
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              }
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5 sm:px-6">
              <div className="shrink-0">
                {profile?.imgUrl ?
                  <img alt="Avatar" src={profile?.imgUrl} className="size-10 rounded-full" />
                  :
                  <UserIcon className="size-10 rounded-full" />
                }
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{profile?.djName}</div>
                <div className="text-sm font-medium text-gray-400">{profile?.email}</div>
              </div>
              {/* <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button> */}
            </div>
            <div className="mt-3 space-y-1 px-2 sm:px-3">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <DisclosureButton
                onClick={signOut}
                className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Cerrar sesión
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure >

      <AuthModal open={open} setOpen={(e) => setOpen(e)} />
    </>
  )
}
