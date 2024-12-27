import Link from "next/link"

const classes = [
  {
    level: 'Principiante',
    title: 'El Arte del DJing: De los Fundamentos a la Magia',
    image: '/arte_lesson.png',
    href: '/classes/arte',
    description: 'Descubre el apasionante mundo del DJing con este curso práctico de 4 días. Aprende a dominar tu controlador, sincronizar beats, usar efectos y crear transiciones impecables. Diseñado para principiantes, este programa te llevará de los fundamentos técnicos a crear sets llenos de magia musical. ¡Conviértete en el DJ que siempre soñaste ser!'
  },
  {
    level: 'Avanzado',
    title: 'Master Mix: Encuadre y Armonía para DJs Pro',
    image: '/master_lesson.png',
    href: '/classes/master',
    description: 'Perfecciona tus mezclas con este curso intensivo de 4 días enfocado en mezcla armónica y encuadre. Aprende a sincronizar fraseos, hacer transiciones suaves y crear sets que fluyan con una precisión musical impactante. Ideal para DJs que buscan llevar su arte al siguiente nivel y destacarse en cualquier pista de baile.'
  },
  {
    level: 'Intermedio',
    title: 'FX Mastery: Domina los Efectos en tu Controlador',
    image: '/fx_lesson.png',
    href: '/classes/fx',
    description: 'Descubre el poder creativo de los efectos en este curso intensivo de 4 días. Aprende a usar filtros, ecos, delays y más para transformar tus sets en experiencias únicas. Desde los fundamentos hasta técnicas avanzadas, te enseñaremos cómo integrar efectos de manera estratégica y creativa para destacar en cualquier cabina. ¡Lleva tu DJing al siguiente nivel!'
  },
]

export default function Classes() {
  return (
    <div className="bg-gray-50 py-8 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-600">Classes de ZONT</h2>
        <p className="mt-2 max-w-2xl text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          ¡Todo lo que necesitas para empezar tu carrera como DJ!
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {classes.map((course) => (
            <div key={course.title} className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                <img
                  alt={course.title}
                  src={course.image}
                  className="h-80 object-cover object-left"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">Nivel: {course.level}</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">{course.title}</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    {course.description}
                  </p>
                  <Link href={course.href}>
                    <button type="button" className="mt-6 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                      Aprende mas sobre este curso
                    </button>
                  </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
