'use client'

import { useAuth } from '@/app/utils/AuthContext';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Form from 'next/form'
import { useRouter } from 'next/navigation';

export default function RegisterModal({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async (formData: FormData) => {
    register(formData).then(() => {
      setOpen(false);
      router.push('/members')
    });
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <DialogTitle className="hidden">Sign in</DialogTitle>
            <div className="flex justify-center">
              <img
                src="Zont_black.svg"
                alt="ZONT"
                className="h-10 w-auto"
              />
            </div>
            <Form action={handleRegister}>
              <div className='mb-4'>
                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                  Nombre
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="first-name"
                  required
                  autoComplete="first-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div className='mb-4'>
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Apellido
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="last-name"
                  required
                  autoComplete="last-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div className='mb-4'>
                <label htmlFor="dj-name" className="block text-sm/6 font-medium text-gray-900">
                  Nombre de DJ
                </label>
                <input
                  id="dj-name"
                  name="dj-name"
                  type="dj-name"
                  required
                  autoComplete="dj-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div className='mb-4'>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div className='mb-4'>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Registrate
                </button>
              </div>
            </Form>
          </DialogPanel>
        </div>
      </div >
    </Dialog >
  )
}
