'use client'
import { getUpcomingEvents } from "@/app/network/firebase"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { Button, Card, CardBody, CardHeader } from "@heroui/react"

export default function Events() {
  const [events, setEvents] = useState<DocumentData[]>([])

  useEffect(() => {
    getUpcomingEvents().then((events) => {
      setEvents(events.filter((event): event is DocumentData => event !== undefined))
    })
  }, [])

  const handleDeleteEvent = (eventId: string) => {
    console.log(eventId)
  }

  return (
    <div className="bg-gray-50 h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-bold text-2xl">Eventos</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
          <PlusIcon className="size-5 mr-2" />
          Agregar Evento
        </button>

      </div>
      <div role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.eventId} className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <div className="flex items-center w-full">
                <p className="text-tiny uppercase text-indigo-600 font-bold">
                  {new Date(event?.dateStart?.seconds * 1000).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                &nbsp;
                |
                &nbsp;
                <p className="text-tiny uppercase text-gray-600 font-bold">
                  {new Date(event?.dateStart?.seconds * 1000).toLocaleString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
              <small className="text-default-500">Colectivo: {event.collective}</small>
              <h4 className="font-bold text-large">{event.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <img alt="event Images" src={event.imgUrl} className="object-cover rounded-xl" />
            </CardBody>

            <div className="flex items-center justify-between space-x-4 mx-3 mt-2">
              <Button color="secondary" variant="flat">
                Editar
              </Button>
              <Button onPress={() => handleDeleteEvent(event.eventId)} color="danger" variant="ghost">
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div >
  )
}