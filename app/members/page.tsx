'use client'
import { CakeIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../utils/AuthContext";

const items = [
  {
    header: "Aprende",
    title: "Tus Classes",
    description: "Ve tus classes.",
    imgUrl: "/your_classes.png",
  },
  {
    header: "Comunidad",
    title: "Comunicate Con Otros Miembros",
    description: "Maecenas at augue sed elit dictum vulputate, in nisi aliquam maximus arcu.",
    imgUrl: "/community.png",
  },
  {
    header: "Tienda",
    title: "Network",
    description: "Aenean vulputate justo commodo auctor vehicula in malesuada semper.",
    imgUrl: "https://marketplace.canva.com/EAGKtEbPACQ/1/0/1600w/canva-retro-world-emoji-day-instagram-post-IV6LeghOkmw.jpg",
  },
];

export default function Members() {
  const { profile } = useAuth();

  return (
    <div className="bg-gray-50 py-8 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-600 flex justify-start items-center">
          <CakeIcon className="size-5 mr-2" />
          {new Date(profile?.createdAt?.seconds * 1000).toLocaleDateString("es-MX",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          )}
        </h2>
        <div className="sm:flex sm:justify-between sm:items-center">
          <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            Hola {profile?.djName ? profile?.djName : profile?.firstName}
          </p>
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gold" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>

            <p className="max-w-lg text-pretty text-xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
              {profile?.points} Puntos
            </p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <img
                alt="Contenido Nuevo"
                src="/new_content.png"
                className="h-80 object-cover object-left"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Nuevo!</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Nuevo Contenido de ZONT</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla efficitur, maximus
                  egestas sem pellentesque.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <img
                alt="/Canjea Tus Puntos"
                src="/points.png"
                className="h-80 object-cover object-left lg:object-right"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Para Ti</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Canjea Tus Puntos</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Canjea tus puntos por descuentos en reservaciones, mercancía y más.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
          </div>

          {items.map((item) => (
            <div key={item.title} className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                <img
                  alt="Imagen de item"
                  src={item.imgUrl}
                  className="h-80 object-cover"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">{item.header}</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">{item.title}</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            </div>
          ))}

        </div>

        <div className="mt-10 text-center text-gray-600 text-sm/6">
          Quieres obtener más puntos? Comparte tu codigo de referencia con tus amigos.
        </div>
      </div>
    </div>
  )
}
