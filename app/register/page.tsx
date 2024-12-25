'use client'
import RegisterModal from "@/components/ui/register-modal"
import { FilmIcon, GiftIcon, SparklesIcon, TicketIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

const incentives = [
  {
    name: 'Recompensas de Lealtad',
    imageSrc: SparklesIcon,
    description: "Gana puntos por tu participación y compromiso, canjeables por recompensas y experiencias exclusivas.",
  },
  {
    name: 'Ventajas en Sorteos',
    imageSrc: GiftIcon,
    description: "Obtén más participaciones en sorteos, aumentando tus posibilidades de ganar increíbles premios.",
  },
  {
    name: 'Descuentos en Eventos',
    imageSrc: TicketIcon,
    description:
      "Disfruta de precios especiales en eventos organizados por ZONT, desde sets de DJs electrizantes hasta fiestas inolvidables.",
  },
  {
    name: 'Contenido Exclusivo',
    imageSrc: FilmIcon,
    description:
      "Accede a contenido solo para miembros, anuncios anticipados de eventos y actualizaciones exclusivas.",
  },
  {
    name: 'Conexión con la Comunidad',
    imageSrc: UserGroupIcon,
    description:
      "Únete a una comunidad apasionada de amantes de la música y DJs, compartiendo la energía y creatividad de ZONT.",
  },
]

export default function Register() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-8 sm:px-2 sm:py-16 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Descubre los Beneficios de Ser Miembro de ZONT
              </h2>
              <p className="mt-4 text-gray-500">
                Convertirte en miembro de ZONT te brinda una variedad de beneficios
                diseñados para mejorar tu experiencia y recompensar tu lealtad.
              </p>

              <button onClick={() => setOpen(true)} className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Regístrate Ahora
              </button>
            </div>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/ecommerce-images/incentives-07-hero.jpg"
              className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:shrink-0">
                  {typeof incentive.imageSrc === 'string' ? (
                    <img alt="" src={incentive.imageSrc} className="size-14" />
                  ) : (
                    <incentive.imageSrc className="size-14" />
                  )}
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RegisterModal open={open} setOpen={(e) => setOpen(e)} />
    </div>
  )
}
