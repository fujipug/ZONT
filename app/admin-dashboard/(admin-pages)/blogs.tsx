'use client'
import { getBlogs } from "@/app/network/firebase"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { Button, Card, CardBody, CardHeader } from "@heroui/react"

export default function Blogs() {
  const [blogs, setBlogs] = useState<DocumentData[]>([])

  useEffect(() => {
    getBlogs().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  const handleDeleteBlog = (blogId: string) => {
    console.log(blogId)
  }

  return (
    <div className="bg-gray-50 h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-bold text-2xl">Blogs de ZONT</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
          <PlusIcon className="size-5 mr-2" />
          Agregar Blog
        </button>

      </div>
      <div role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog.blogId} className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase text-indigo-600 font-bold">Nivel: {blog.level}</p>
              <small className="text-default-500">Horas: {blog.blogLengthHours}</small>
              <h4 className="font-bold text-large">{blog.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <img alt="Blog Images" src={blog.imgUrl} className="object-cover rounded-xl" />
            </CardBody>

            <div className="flex items-center justify-between space-x-4 mx-3 mt-2">
              <Button color="secondary" variant="flat">
                Editar
              </Button>
              <Button onPress={() => handleDeleteBlog(blog.blogId)} color="danger" variant="ghost">
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}