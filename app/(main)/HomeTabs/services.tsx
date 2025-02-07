import { classNames } from "@/app/utils/classesNames"

const features = [
  {
    name: 'Fotographía profesional',
    description:
      `Fotografía profesional en ZONT te ofrece la oportunidad de capturar imágenes impactantes 
      y de alta calidad que reflejen tu esencia como artista. Ya sea para promocionar tu música, 
      compartir en redes sociales o complementar tus proyectos creativos, nuestro servicio combina 
      experiencia técnica, equipo de primer nivel y un enfoque personalizado para resaltar tu estilo 
      único. En un ambiente profesional y dinámico, creamos fotografías que cuentan tu historia y 
      potencian tu presencia artística.`,
    imageSrc: '/photography.jpg',
    imageAlt: 'fotographía profesional',
  },
  {
    name: 'Ayuda con press kit',
    description:
      `Ayuda con press kit en ZONT te brinda las herramientas necesarias para destacar como 
      artista y comunicar tu esencia de manera profesional. Desde la creación de tu biografía 
      hasta la selección de fotos, diseño y contenido clave, te apoyamos en la elaboración de 
      un press kit que capture tu identidad musical y atraiga la atención de promotores, 
      sellos y medios. Con nuestro enfoque estratégico, aseguramos que tu presentación sea 
      tan impresionante como tu música.`,
    imageSrc: '/presskit.png',
    imageAlt: 'Ayuda con Press Kit',
  },
  {
    name: 'Desiño de pagina web',
    description:
      `Diseño de página web en ZONT te ofrece una plataforma personalizada y profesional para 
      mostrar tu música y conectar con tu audiencia. Creamos sitios web visualmente atractivos 
      y funcionales, adaptados a tu estilo y necesidades, que te permiten destacar en el mundo digital. 
      Desde la integración de tus sets hasta la promoción de tus próximos eventos, te ayudamos a tener 
      una presencia en línea que refleje tu identidad como artista y te acerque a tu público.`,
    imageSrc: '/webdesign.jpg',
    imageAlt: 'Desiño de Pagina Web',
  }
]

export default function Services() {

  return (
    <div className="bg-gray-50 mb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Otros servicios que ofrecemos</h2>
          <p className="mt-4 text-gray-500">
            Estamos para ofrecerte todo el apoyo necesario en tu carrera musical.
            Ya sea que necesites potenciar tu presencia digital, mejorar tu imagen o preparar
            material promocional, en ZONT contamos con las herramientas y la experiencia para
            ayudarte a destacar.
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
      </div>
    </div>
  )
}
