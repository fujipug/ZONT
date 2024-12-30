import { classNames } from "@/app/utils/classesNames"

const features = [
  {
    name: 'ZONT Studio',
    description:
      'Our laptop sleeve is compact and precisely fits 13" devices. The zipper allows you to access the interior with ease, and the front pouch provides a convenient place for your charger cable.',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-feature-07-detail-01.jpg',
    imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
  },
  {
    name: 'Balcon Ritmico',
    description:
      'We design every detail with the best materials and finishes. This laptop sleeve features durable canvas with double-stitched construction, a felt interior, and a high quality zipper that hold up to daily use.',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-feature-07-detail-02.jpg',
    imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
  },
  {
    name: 'Huertito Roma',
    description:
      'The front pouch is perfect for your charger cable, earbuds, or anything else you want to keep handy. The durable canvas exterior is secured with double-stitched construction.',
    imageSrc: '/huertito.jpeg',
    imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
  }
]

export default function Grabar() {

  return (
    <div className="bg-gray-50 mb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Graba tu Set</h2>
          <p className="mt-4 text-gray-500">
            Grabacion de set en cabina con los mejores equipos de audio y video, para que puedas grabar tus sets y
            producir tu musica.
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
