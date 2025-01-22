'use client'
import { addEvent, deleteEventById, fileUpload, getUpcomingEvents } from "@/app/network/firebase"
import { DocumentData, Timestamp } from "firebase/firestore"
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { Button, Card, CardBody, CardHeader, DatePicker, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, TimeInput, useDisclosure } from "@heroui/react"
import { getLocalTimeZone, today } from "@internationalized/date"

const cities = [
  { key: "CDMX", label: "Ciudad de México" },
  { key: "lc", label: "Los Cabos" },
]

export default function Events() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [events, setEvents] = useState<DocumentData[]>([])
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    getUpcomingEvents().then((events) => {
      setEvents(events.filter((event): event is DocumentData => event !== undefined))
    })
  }, [])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFile = files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!file) return alert('Please select a file to upload');

    await fileUpload(file, 'events').then((url) => {
      if (url) {
        data['img-url'] = url;
      }

      // combine dateStart and timeStart into a Timestamp
      const dateStart = new Date(`${data['date-start']} ${data['time-start']}`);
      const firebaseTimestamp = Timestamp.fromDate(dateStart);
      data['date-start'] = firebaseTimestamp.toDate().toISOString();

      // combine dateEnd and timeEnd into a Timestamp
      const dateEnd = new Date(`${data['date-end']} ${data['time-end']}`);
      const firebaseTimestampEnd = Timestamp.fromDate(dateEnd);
      data['date-end'] = firebaseTimestampEnd.toDate().toISOString();

      console.log('data', data);
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      addEvent(formData).then(() => {
        console.log('Event added successfully');
        onClose();
      })
    });

  }

  const handleDeleteEvent = (eventId: string) => {
    deleteEventById(eventId).then(() => {
      const newEvents = events.filter((event) => event.eventId !== eventId);
      setEvents(newEvents);
    })
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

      <Modal isOpen={isOpen} scrollBehavior="outside" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Evento</ModalHeader>
              <Form validationBehavior="native" onSubmit={onSubmit}>
                <ModalBody className="w-full">
                  <div className="col-span-full flex items-center gap-x-8">
                    {preview ? (
                      <img
                        alt="Preview"
                        src={preview}
                        className="size-24 flex-none rounded-lg bg-gray-800 object-cover"
                      />
                    ) : (
                      <div className="size-24 flex-none rounded-lg bg-gray-400" />
                    )}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="rounded-md text-white bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400"
                      />
                      <p className="mt-2 text-xs/5 text-gray-500">JPG, GIF o PNG.</p>
                    </div>
                  </div>

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
                      name="collective"
                      type="text"
                      size="sm"
                    />

                    <Select isRequired errorMessage="Este campo es requerido" size="sm" name="city" label="Selecciona Ciudad">
                      {cities.map((city) => (
                        <SelectItem key={city.key}>{city.label}</SelectItem>
                      ))}
                    </Select>
                  </div>

                  <Input
                    isRequired
                    errorMessage="Este campo es requerido"
                    label="Ubicacion"
                    name="address"
                    type="text"
                    size="sm"
                  />

                  <div className="flex items-center gap-2">
                    <DatePicker isRequired
                      errorMessage="Este campo es requerido"
                      minValue={today(getLocalTimeZone())}
                      size="sm" name="date-start" label="Fecha de Empezar" />

                    <TimeInput errorMessage="Este campo es requerido"
                      size="sm" name="time-start" isRequired label="Tiempo de Empezar" />
                  </div>

                  <div className="flex items-center gap-2">
                    <DatePicker isRequired
                      errorMessage="Este campo es requerido"
                      minValue={today(getLocalTimeZone())}
                      size="sm" name="date-end" label="Fecha de Terminar" />

                    <TimeInput errorMessage="Este campo es requerido"
                      size="sm" name="time-end" isRequired label="Tiempo de Terminar" />
                  </div>

                  <Textarea
                    isRequired
                    errorMessage="Este campo es requerido"
                    name="description"
                    label="Descripcion"
                    placeholder="Descripcion del Evento"
                    size="sm"
                  />

                  <Textarea
                    name="details"
                    errorMessage="Este campo es requerido"
                    label="Detalles"
                    placeholder="Detalles del Evento"
                    size="sm"
                  />

                  <Input
                    isRequired
                    errorMessage="Este campo es requerido"
                    label="URL de Taquila"
                    name="ticket-url"
                    type="url"
                    size="sm"
                  />

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="secondary">
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