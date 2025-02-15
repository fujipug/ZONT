const features = [
  {
    name: 'Equipo profesional',
    description: (
      <div>
        El estudio está equipado con equipo de nivel profesional para DJing:
        <ul className="list-disc pl-5 mt-2">
          <li>XDJ-AZ y DDJ-1000</li>
          <li>KRK Classic 5 Monitores</li>
          <li>Mesa Ajustable</li>
        </ul>
      </div>
    )
  },
  {
    name: 'Precios accesibles',
    description: (
      <div>
        Nuestra misión es hacer que los estudios de calidad estén al alcance de todos. Aprovecha nuestras tarifas asequibles.
        <ul className="list-disc pl-5 mt-2">
          <li>$250 por hora</li>
        </ul>
      </div>
    )
  },
  {
    name: 'Nos adaptamos a tu horario',
    description:
      'Horarios flexibles para que puedas practicar cuando más lo necesites, adaptándonos a tu agenda.',
  },
  {
    name: 'Recompensas para miembros',
    description: 'Ustedes nos apoyan, y nosotros queremos apoyarlos a ustedes. Gana sesiones de práctica gratis a través de nuestro programa de recompensas.'
  },
]

export default function Practica() {
  return (
    <div className="bg-gray-50 mb-16">
      <section aria-labelledby="features-heading" className="relative">
        <img
          alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
          src="https://tailwindui.com/plus/img/ecommerce-images/confirmation-page-01-hero.jpg"
          className="aspect-[3/2] w-full object-cover sm:aspect-[5/2] lg:absolute lg:aspect-auto lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16"
        />

        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32">
          <div className="lg:col-start-2">
            <div className="flex justify-between items-center">
              <h2 id="features-heading" className="font-medium text-gray-500">
                Desarolla tu talento
              </h2>

              <button className="relative rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 group">
                <span className="relative z-10">Explorar el Estudio</span>
              </button>

            </div>
            <p className="mt-4 text-xl sm:text-4xl font-bold tracking-tight text-gray-900">Practica en cabina</p>
            <p className="mt-4 text-gray-500">
              Desarrolla tus habilidades con práctica utilizando equipo de DJ de última generación y audio de calidad para tu próximo evento.
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 text-sm sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-zont" className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 my-16 gap-x-8">
          <div className="col-span-1">
            <h2 id="why-zont" className="font-medium text-gray-500">
              ¿Por qué Zont?
            </h2>
            <p className="mt-4 text-xl sm:text-4xl font-bold tracking-tight text-gray-900">Estudio de artistas para artistas</p>
            <p className="mt-4 text-gray-500">
              En ZONT, entendemos las necesidades de los DJs, productores y músicos, por lo que ofrecemos un entorno diseñado específicamente para que puedas practicar, grabar y producir tu música con el equipo más avanzado.
            </p>
          </div>

          <div className="col-span-1">
            <img
              alt="By artists, for artists"
              src="/byartists.jpg"
              className="aspect-[3/2] w-full object-cover sm:aspect-[5/2] lg:absolute lg:aspect-auto lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="how-does-it-work" className="relative">
        <div className="">
          <h2 id="how-does-it-work" className="font-medium text-gray-500">
            ¿Cómo reservar?
          </h2>
          <p className="mt-4 text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Reserva en línea o mándanos un mensaje
          </p>
          <p className="mt-4 text-gray-500">
            Puedes reservar en línea, mandarnos un mensaje por red social o por Whatsapp.
            Recomendamos hacerlo en línea para ver rapidamente plazos de dia y tiempo disponisbles.
          </p>
        </div>

        <div className="mt-4">
          <span className="isolate inline-flex rounded-md shadow-sm w-full">
            <a
              href="/schedule"
              type="button"
              className="w-full relative inline-flex items-center justify-center rounded-l-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white focus:z-10"
            >
              En línea
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
    </div >
  )
}
