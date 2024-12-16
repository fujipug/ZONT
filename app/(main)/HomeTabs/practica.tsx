const features = [
  {
    name: 'Equipo Profesional',
    description: 'El estudio esta equipados con equipo de nivel profesional para DJing. Conéctate, sin necesidad de configuración.',
  },
  {
    name: 'Precios Accesiblese',
    description: 'Nuestra misión es hacer que los estudios de calidad sean accesibles para todos. Aprovecha nuestras tarifas bajas y gana tiempo de estudio gratis al unirte a nuestro programa de recompensas.',
  },
  {
    name: 'Thoughtfully designed',
    description:
      'The comfortable disc binding allows you to quickly rearrange pages or combine lined, graph, and blank refills.',
  },
  { name: 'Locally made', description: 'Responsibly and sustainably made real close to wherever you are, somehow.' },
]

export default function Practica() {
  return (
    <div className="bg-white">
      <section aria-labelledby="features-heading" className="relative">
        <img
          alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
          src="https://tailwindui.com/plus/img/ecommerce-images/confirmation-page-01-hero.jpg"
          className="aspect-[3/2] w-full object-cover sm:aspect-[5/2] lg:absolute lg:aspect-auto lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16"
        />

        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32">
          <div className="lg:col-start-2">
            <h2 id="features-heading" className="font-medium text-gray-500">
              Desarolla tu talento
            </h2>
            <p className="mt-4 text-4xl font-bold tracking-tight text-gray-900">Practica En Cabina</p>
            <p className="mt-4 text-gray-500">
              Practica en cabina con los mejores equipos de audio y video, para que puedas grabar tus sets y
              producir tu musica.
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
    </div>
  )
}
