'use client'
import Form from "next/form";
import { addMessage } from "../network/firebase";
import { useState } from "react";
import Alerts from "@/components/ui/alerts";

export default function Contact() {
  const [isAlertVisible, setIsAlertVisible] = useState(false)


  const handleMessageSubmit = (formData: FormData) => {
    addMessage(formData).then(() => {
      setIsAlertVisible(true)
    });
  };

  return (
    <>
      <Alerts color="success" variant="faded" title="Mensaje Enviado"
        description="Revisaremos tu mensaje y te responderemos lo más pronto posible."
        isVisible={isAlertVisible} visibility={setIsAlertVisible} />
      <div className="relative isolate bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-64}
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
        </svg>
        <div className="mx-auto max-w-xl lg:max-w-4xl">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Mandanos un mensaje
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Tienes preguntas o comentarios? Quieres hacer una colaboracion? Nos encantaría saber de ti. Llena el formulario y te responderemos lo más pronto posible.
          </p>
          <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
            <Form action={handleMessageSubmit} className="lg:flex-auto">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                    Nombre
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                    Apellido
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                    Numero
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="phone-number"
                      name="phone-number"
                      type="text"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                  </div>
                </div>
                {/* <div>
                <label htmlFor="collective" className="block text-sm/6 font-semibold text-gray-900">
                  Colectivo
                </label>
                <div className="mt-2.5">
                  <input
                    id="collective"
                    name="collective"
                    type="url"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div> */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                    Mensaje
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Let’s talk
                </button>
              </div>
              <p className="mt-4 text-sm/6 text-gray-500">
                By submitting this form, I agree to the{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  privacy&nbsp;policy
                </a>
                .
              </p>
            </Form>
            <div className="lg:mt-6 lg:w-80 lg:flex-none">
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/workcation-logo-indigo-600.svg"
                className="h-12 w-auto"
              />
              <figure className="mt-10">
                <blockquote className="text-lg/8 font-semibold text-gray-900">
                  <p>
                    “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
                    molestiae. Numquam corrupti in laborum sed rerum et corporis.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex gap-x-6">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
                    className="size-12 flex-none rounded-full bg-gray-50"
                  />
                  <div>
                    <div className="text-base font-semibold text-gray-900">Brenna Goyette</div>
                    <div className="text-sm/6 text-gray-600">CEO of Workcation</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
