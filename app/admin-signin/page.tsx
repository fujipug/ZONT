'use client'
import { FormEvent, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { useRouter } from "next/navigation";
import { Form, Input } from "@heroui/react";

export default function AdminSignIn() {
  const { signIn } = useAuth();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/admin-dashboard');
    }
  }, [isSignedIn]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    signIn(formData).then(() => {
      router.push('/admin-dashboard');
    })
  };


  return (
    <>
      <div className="flex h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="ZONT"
                src="/ZONT_black.svg"
                className="h-10 w-auto"
              />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Hola Banda!</h2>
              <h2 className="text-xl/9 font-bold tracking-tight text-gray-700">Este es login para socios, profesores y administradores</h2>

            </div>

            <div className="mt-10">
              <Form onSubmit={handleSubmit} className="space-y-6">
                <div className="mt-2 w-full">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    required
                  />
                </div>

                <div className="mt-2 w-full">
                  <Input
                    label="Contraseña"
                    name="password"
                    type="password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="remember-me"
                          name="remember-me"
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
                    <label htmlFor="remember-me" className="block text-sm/6 text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm/6">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Entrar Al Portal
                </button>
              </Form>

            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://i.pinimg.com/originals/a0/91/42/a0914286df5679d1f8cab38d739e64ee.gif"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  )
}
