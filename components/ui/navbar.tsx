'use client'
import { useState } from 'react'
import AuthModal from './auth-modal'
import { useAuth } from '@/app/utils/AuthContext'
import { useRouter } from 'next/navigation'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, Spinner, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Divider } from "@heroui/react";

const navigation = [
  { name: 'Clases', href: '/courses', current: false },
  { name: 'Eventos', href: '/events', current: false },
  { name: 'Tienda', href: '/store', current: false },
  { name: 'Ayuda', href: '/help', current: false },
]

const userNavigation = [
  { name: 'Tu perfil', href: '/profile' },
  { name: 'Configuración', href: '/settings' },
  // { name: 'Mensajes', href: '/messages' },
]

export default function NavbarA() {
  const { isSignedIn, profile } = useAuth();
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleZontMembers = () => {
    if (isSignedIn) {
      router.push('/members')
    } else {
      setOpen(true);
    }
  }

  return (
    <>
      <Navbar shouldHideOnScroll isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className='bg-gray-800'>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle className='text-white' aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link href="/">
              <img
                alt="ZONT"
                src="/ZONT_white.svg"
                className="h-6 w-auto"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Link href="/">
              <img
                alt="ZONT"
                src="/ZONT_white.svg"
                className="h-6 w-auto"
              />
            </Link>
          </NavbarBrand>
          {navigation.map((item) => (
            <NavbarItem key={item.name}>
              <Link className='text-gray-400 hover:text-white' href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
          <NavbarItem key="divider" className='text-gray-400 cursor-default'>|</NavbarItem>
          <NavbarItem>
            <Link
              key="members"
              className="text-gray-400 cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 hover:bg-gradient-to-r hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 hover:inline-block hover:text-transparent hover:bg-clip-text hover:font-semibold" onPress={handleZontMembers}>MIEMBROS ZONT</Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} className='text-white hover:text-black' href="/schedule" variant="ghost">
              Reserva
            </Button>
          </NavbarItem>

          {isSignedIn &&
            <NavbarItem className='hidden sm:flex'>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  {profile?.imgUrl ?
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name={profile?.djName ? profile?.djName : profile?.firstName + ' ' + profile?.lastName}
                      size="sm"
                      src={profile?.imgUrl}
                    />
                    :
                    <Spinner color="secondary" />
                  }
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Iniciado sesión como:</p>
                    <p className="font-semibold">🎧 {profile?.djName ? profile?.djName : profile?.firstName + ' ' + profile?.lastName}</p>
                  </DropdownItem>
                  <>
                    {userNavigation.map((item) => (
                      <DropdownItem key={item.name} href={item.href}>{item.name}</DropdownItem>
                    ))}
                  </>
                  <DropdownItem onPress={signOut} key="logout" color="danger">
                    Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          }
        </NavbarContent>

        <NavbarMenu className='bg-gray-800 gap-6 pt-8'>
          {navigation.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full text-gray-400"
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem key="members">
            <Link
              className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 inline-block text-transparent bg-clip-text font-semibold"
              onPress={handleZontMembers}
              size="lg">
              MIEMBROS ZONT
            </Link>
          </NavbarMenuItem>

          {isSignedIn &&
            <>
              <Divider className="my-2 bg-white" />

              <NavbarMenuItem>
                <div className="flex gap-4">
                  {profile?.imgUrl ?
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name={profile?.djName ? profile?.djName : profile?.firstName + ' ' + profile?.lastName}
                      size="lg"
                      src={profile?.imgUrl}
                    />
                    :
                    <Spinner color="secondary" />
                  }
                  <div className="">
                    <p className="font-semibold text-white">🎧 {profile?.djName ? profile?.djName : profile?.firstName + ' ' + profile?.lastName}</p>
                    <p className="text-gray-400 text-sm">{profile?.email}</p>
                  </div>
                </div>
              </NavbarMenuItem>
              {userNavigation.map((item) => (
                <NavbarMenuItem key={item.name}>
                  <Link href={item.href} className="text-gray-400" size='lg'>
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              ))}
              <NavbarMenuItem key="logout">
                <Link onPress={signOut} color='danger' size='lg'>
                  Cerrar sesión
                </Link>
              </NavbarMenuItem>
            </>
          }
        </NavbarMenu>
      </Navbar>
      <AuthModal open={open} setOpen={(e) => setOpen(e)} />
    </>
  );
}
