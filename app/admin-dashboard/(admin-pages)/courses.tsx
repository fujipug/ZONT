'use client'
import { getCourses } from "@/app/network/firebase"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"

export default function Courses() {
  const [courses, setCourses] = useState<DocumentData[]>([])

  useEffect(() => {
    getCourses().then((courses) => {
      console.log(courses)
      setCourses(courses)
    })
  }, [])

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-bold text-2xl">Classes de ZONT</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
          <PlusIcon className="size-5 mr-2" />
          Agregar Curso
        </button>

      </div>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {courses.map((course) => (
          <li
            key={course.courseId}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-4">
              <img alt="" src={course.imgUrl} className="mx-auto size-32" />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{course.title}</h3>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    Editar
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-red-700"
                  >
                    Borar
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}