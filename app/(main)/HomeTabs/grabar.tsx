import { classNames } from "@/app/utils/classesNames"

const features = [
  {
    name: 'ZONT Studio',
    description:
      `Zont Studio es el espacio ideal para DJs en CDMX, diseñado para practicar, 
      producir música y grabar sets de alta calidad en un ambiente profesional y creativo. 
      Equipado con tecnología de punta, iluminación vibrante y un diseño inspirado en la energía 
      de la música, es el lugar perfecto para perfeccionar tu técnica y crear sets inolvidables.`,
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-feature-07-detail-01.jpg',
    imageAlt: 'Zont Studio',
  },
  {
    name: 'Balcon Ritmico',
    description:
      `La terraza de Zont Studio ofrece un espacio abierto y único, perfecto para grabar tus DJ 
      sets en un ambiente relajado y auténtico. Con un toque urbano y la atmósfera vibrante de 
      la ciudad como telón de fondo, es el lugar ideal para crear sets memorables en un entorno 
      lleno de inspiración.`,
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-feature-07-detail-02.jpg',
    imageAlt: 'Balcon Ritmico',
  },
  {
    name: 'Huertito Roma',
    description:
      `Huertito Roma es un rincón lleno de vida y naturaleza, ubicado en el corazón de la histórica La Romita.
       Rodeado de plantas y un ambiente verde, este espacio único combina la serenidad de la 
       naturaleza con el encanto del barrio. Es el lugar perfecto para grabar tus DJ sets en un 
       entorno íntimo, fresco y lleno de inspiración, ideal para conectar con tu creatividad en un 
       escenario especial.`,
    imageSrc: '/huertito.jpeg',
    imageAlt: 'Huertito Roma',
  }
]

export default function Grabar() {

  return (
    <div className="bg-gray-50 mb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Graba tu Set</h2>
          <p className="mt-4 text-gray-500">
            Grabación de sets en cabina equipada con tecnología de audio y video de última generación,
            diseñada para que puedas capturar tus sets con calidad profesional y llevar tu música al
            siguiente nivel.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {features.map((feature, featureIdx) => (
            <div
              key={feature.name}
              className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
            >
              <div
                className={classNames(
                  featureIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9',
                  'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4',
                )}
              >
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
              </div>
              <div
                className={classNames(
                  featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1',
                  'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8',
                )}
              >
                <img
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
                  className="aspect-[5/2] w-full rounded-lg bg-gray-100 object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <section aria-labelledby="how-does-it-work" className="relative">
          <div className="">
            <h2 id="how-does-it-work" className="font-medium text-gray-500">
              Como reservar?
            </h2>
            <p className="mt-4 text-xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Reserva En Linea o Mandanos un Mensaje
            </p>
            <p className="mt-4 text-gray-500">
              Puedes reservar en linea, mandarnos un mensaje por red social o por Whatsapp.
              Recomendamos hacerlo en linea para ver rapidamente plazos de dia y tiempo disponisbles.
            </p>
          </div>

          <div className="mt-4">
            <span className="isolate inline-flex rounded-md shadow-sm w-full">
              <a
                href="/schedule"
                type="button"
                className="w-full relative inline-flex items-center justify-center rounded-l-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white focus:z-10"
              >
                En Linea
              </a>
              <a
                href="https://www.instagram.com/zont_music_mx/" target="_blank"
                type="button"
                className="bg-gradient-to-r from-[#FEDA77] from-10% via-[#DD2A7B] via-30% to-[#515BD4] to-90% w-full relative -ml-px inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white focus:z-10"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/19288636489?text=Estoy%20intersado%20de%20practica%20en%20cabina" target="_blank"
                type="button"
                className="w-full relative -ml-px inline-flex items-center justify-center rounded-r-md bg-[#27d366] px-3 py-2 text-sm font-semibold text-white focus:z-10"
              >
                Whatsapp
              </a>
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
