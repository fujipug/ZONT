import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "¿Cuáles son los horarios de operación del estudio?",
    answer:
      `Estamos de Martes a Sabado de 10:00 a 20:00. Si necesitas una cita fuera de estos horarios, por favor contáctanos.`,
  },
  {
    question: "¿Dónde está ubicado el estudio?",
    answer:
      `Estamos en la Ciudad de Mexico. Nos encontramos el la colonia Escandon cerca de la parada de metro Patriotismo; Gral. Salvador Alvarado 72.
      Si quieres visitarnos, por favor haz una cita previa.`,
  },
  {
    question: "¿Qué servicios ofrece el estudio?",
    answer:
      `Ofrecemos servicios de practica en cabina, grabación de sets, equipo para producción de música, fotografia professional, ayuda con press kit, diseño de pagina web y clases de DJ.`,
  },
  {
    question: "¿Necesito reservar con anticipación o puedo llegar sin cita?",
    answer:
      `Todos nuestros servicios requiere una cita. Recomendamos reservar con anticipación para asegurar disponibilidad.`,
  },
  {
    question: "¿Qué tipo de equipo para DJs está disponible?",
    answer:
      `Tenemos equipo de Alpha Theta XDJ-AZ, Pioneer DDJ-1000, monitores KRK Rokit 5 y baffle JBL EON 715.`,
  },
  {
    question: "¿Qué tipo de equipo para producción de música está disponible?",
    answer:
      `Tenemos software de Abelton 12 Live Suite, Focusrite Scarlett 2i2, microfono Shure SM7B, Akai Mini mk2 y monitores KRK Rokit 5. Puedes traer tu propio equipo y instumentos si prefieres.`,
  },
  {
    question: "¿Cómo puedo reservar una sesión?",
    answer:
      `Puedes reservar en linea en nuestra pagina web o mandarnos un mensaje por Instagram o Whatsapp`,
  },
  {
    question: "¿Cuál es la política de cancelación?",
    answer:
      `Puedes cancelar tu cita hasta 24 horas antes de la hora de la cita. Si cancelas con menos de 24 horas de anticipación, se te cobrará el 50% del costo de la cita.`,
  },
]

export default function Help() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-16 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Preguntas frecuentes (FAQs)
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base/7 font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                      <MinusIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-600">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
