'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCourses } from "../network/firebase"
import { DocumentData } from "firebase/firestore"

export default function Courses() {
  const [courses, setCourses] = useState<DocumentData[]>([])

  useEffect(() => {
    getCourses().then((res) => {
      setCourses(res)
    })
  }, [])

  return (
    <div className="bg-gray-50 py-8 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-600">Classes de ZONT</h2>
        <p className="mt-2 max-w-2xl text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          ¡Todo lo que necesitas para empezar tu carrera como DJ!
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {courses.map((course) => (
            <div key={course.courseId} className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                <img
                  alt={course.title}
                  src={course.imgUrl}
                  className="h-80 object-cover object-left"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">Nivel: {course.level}</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">{course.title}</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    {course.description}
                  </p>
                  <Link href={`courses/${course.courseId}`}>
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
