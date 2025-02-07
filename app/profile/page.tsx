'use client'
import { UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../utils/AuthContext';

export default function Profile() {
  const { profile } = useAuth();

  return (
    <div className='flex h-full bg-gray-50'>
      <div className="xl:pl-72">
        <main>
          <h1 className="sr-only">Account Settings</h1>

          {/* Profile forms */}
          <div className="divide-y divide-white/5">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base/7 font-semibold">Tu informacion</h2>
                <p className="mt-1 text-sm/6 text-gray-500">Esta es tu informacion de perfil.</p>
              </div>

              <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full flex items-center gap-x-8">
                    {profile?.imgUrl ? (
                      <img
                        alt="Avatar"
                        src={profile?.imgUrl}
                        className="size-24 flex-none rounded-lg bg-gray-800 object-cover"
                      />
                    ) : (
                      <UserIcon className="size-24 flex-none rounded-lg bg-gray-400" />
                    )}
                    <div>
                      <button
                        type="button"
                        className="rounded-md text-white bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400"
                      >
                        Cambiar foto
                      </button>
                      <p className="mt-2 text-xs/5 text-gray-500">JPG, GIF o PNG.</p>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium">
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        defaultValue={profile?.firstName}
                        autoComplete="given-name"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm/6 font-medium">
                      Apellido
                    </label>
                    <div className="mt-2">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        defaultValue={profile?.lastName}
                        autoComplete="family-name"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="email" className="block text-sm/6 font-medium">
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={profile?.email}
                        autoComplete="email"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="dj-name" className="block text-sm/6 font-medium">
                      Nombre de DJ
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center rounded-md bg-white/5 pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                        {/* <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">example.com/</div> */}
                        <input
                          id="dj-name"
                          name="dj-name"
                          type="text"
                          defaultValue={profile?.djName}
                          placeholder="janesmith"
                          className="block min-w-0 grow bg-transparent py-1.5 pl-1 pr-3 text-base placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md text-white bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Guardar informacion
                  </button>
                </div>
              </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base/7 font-semibold">Cambiar contraseña</h2>
                <p className="mt-1 text-sm/6 text-gray-500">Cambia la contraseña de tu perfil.</p>
              </div>

              <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full">
                    <label htmlFor="current-password" className="block text-sm/6 font-medium">
                      Contraseña actual
                    </label>
                    <div className="mt-2">
                      <input
                        id="current-password"
                        name="current_password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="new-password" className="block text-sm/6 font-medium">
                      Nueva contraseña
                    </label>
                    <div className="mt-2">
                      <input
                        id="new-password"
                        name="new_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="confirm-password" className="block text-sm/6 font-medium">
                      Confirmar nueva contraseña
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm-password"
                        name="confirm_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md text-white bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Guardar nueva contraseña
                  </button>
                </div>
              </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base/7 font-semibold">Eliminar cuenta</h2>
                <p className="mt-1 text-sm/6 text-gray-500">
                  Puedes eliminar tu cuenta aquí. Esta acción es irreversible.
                  Toda la información relacionada con esta cuenta, incluyendo tus puntos, será eliminada de forma permanente.
                </p>
              </div>

              <form className="flex items-start md:col-span-2">
                <button
                  type="submit"
                  className="rounded-md text-white bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-400"
                >
                  Si, quiero eliminar mi cuenta
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
