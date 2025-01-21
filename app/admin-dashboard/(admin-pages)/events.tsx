'use client'
import { getUpcomingEvents } from "@/app/network/firebase"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { Button, Card, CardBody, CardHeader, DatePicker, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, TimeInput, useDisclosure } from "@heroui/react"
import { getLocalTimeZone, now, today } from "@internationalized/date"

const cities = [
  { key: "cdmx", label: "Ciudad de México" },
  { key: "lc", label: "Los Cabos" },
]

export default function Events() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [events, setEvents] = useState<DocumentData[]>([])

  useEffect(() => {
    getUpcomingEvents().then((events) => {
      setEvents(events.filter((event): event is DocumentData => event !== undefined))
    })
  }, [])

  const onSubmit = () => {
    console.log('Add Event')
  }

  const handleDeleteEvent = (eventId: string) => {
    console.log(eventId)
  }

  return (
    <>
      <div className="bg-gray-50 h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-bold text-2xl">Eventos</h2>
          <button onClick={onOpen} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Evento</ModalHeader>
              <Form validationBehavior="native" onSubmit={onSubmit}>
                <ModalBody className="w-full">
                  <Input
                    isRequired
                    errorMessage="Este campo es requerido"
                    label="Titulo del Evento"
                    name="title"
                    type="text"
                    size="sm"
                  />

                  <div className="flex items-center gap-2">
                    <Input
                      isRequired
                      errorMessage="Este campo es requerido"
                      label="Colectivo"
                      name="title"
                      type="text"
                      size="sm"
                    />

                    <Select isRequired size="sm" name="city" label="Selecciona Ciudad">
                      {cities.map((city) => (
                        <SelectItem key={city.key}>{city.label}</SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <DatePicker isRequired
                      minValue={today(getLocalTimeZone())}
                      size="sm" name="date-start" label="Fecha de Empezar" />

                    <TimeInput size="sm" name="time-start" isRequired label="Tiempo de Empezar" />
                  </div>

                  <div className="flex items-center gap-2">
                    <DatePicker isRequired
                      minValue={today(getLocalTimeZone())}
                      size="sm" name="date-end" label="Fecha de Terminar" />

                    <TimeInput size="sm" name="time-end" isRequired label="Tiempo de Terminar" />
                  </div>

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="secondary" onPress={onClose}>
                    Agregar
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}