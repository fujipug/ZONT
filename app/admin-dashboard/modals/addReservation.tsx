'use client';
import { addReservation, getReservations, getServices } from "@/app/network/firebase";
import { calculateDateTimeRange } from "@/app/utils/calculateDateTimeRange";
import { getOverlappingHours } from "@/app/utils/overlappingHours";
import Alerts from "@/components/ui/alerts";
import TimeSlots from "@/components/ui/time-slots";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Form,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { DocumentData, Timestamp } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { I18nProvider } from "@react-aria/i18n";

interface Reservation {
  reservationId: string;
  dateStart: Timestamp;
  dateEnd: Timestamp;
}

export default function AddReservation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(today(getLocalTimeZone()))
  const [overlappingHours, setOverlappingHours] = useState<Record<string, number[]>>({})
  const [selectedTimeDuration, setSelectedTimeDuration] = useState<{
    time: number;
    length: number;
  } | null>(null)
  const [services, setServices] = useState<DocumentData[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    getServices().then((response) => {
      setServices(response);
    });
  }, []);

  useEffect(() => {
    const dateFormat = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    const firebaseTimestamp = Timestamp.fromDate(dateFormat);
    getReservations(firebaseTimestamp).then((reservations) => {
      const hourOverlap = getOverlappingHoursForDay(reservations as Reservation[], firebaseTimestamp);
      setOverlappingHours(hourOverlap);
    });
  }, [selectedDate])

  const getOverlappingHoursForDay = (reservations: Reservation[], timestamp: Timestamp) => {
    const result: Record<string, number[]> = {};

    reservations?.forEach((reservation) => {
      result[reservation.reservationId] = getOverlappingHours(reservation, timestamp);
    });

    return result;
  };

  const handleTimeSelected = (time: number, length: number) => {
    if (time === 0 && length === 0) {
      setSelectedTimeDuration(null)
    } else {
      setSelectedTimeDuration({ time, length })
    }
  }

  const handleServiceSelected = (service: string | undefined) => {
    console.log(service)
    if (service !== undefined) {
      setSelectedTimeDuration(null);
      setOverlappingHours({});
      setSelectedService(service ?? null);
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTimeDuration && selectedDate) {
      const { time, length } = selectedTimeDuration;
      const dates = calculateDateTimeRange({ dateSelected: selectedDate, time, length });

      const formData = new FormData(e.currentTarget);
      addReservation(formData, dates.dateStart, dates.dateEnd).then(() => {
        setIsAlertVisible(true);
        onOpenChange();
      });
    }
  };

  return (
    <>
      <Alerts color="success" variant="faded" title="Agregar reservacion"
        description="La reservacion ha sido creada exitosamente"
        isVisible={isAlertVisible} visibility={setIsAlertVisible} />

      <Button color="secondary" variant="flat" size="lg" onPress={onOpen}>
        <PlusIcon className="w-4 h-4" />
        Aggregar reservacion
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <Form className="w-full space-y-10" validationBehavior="native" onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Aggregar reservacion</ModalHeader>
                <ModalBody className="space-y-8">
                  <Input
                    isRequired
                    errorMessage="Este campo es requerido"
                    label="Cliente"
                    labelPlacement="outside"
                    name="client"
                    placeholder="Agregar nombre del cliente"
                    type="text"
                  />

                  <Select onSelectionChange={(e) => handleServiceSelected(e.currentKey)} label="Selecionar servicio" labelPlacement="outside" name="title" placeholder="ex: Practica en estudio" isRequired>
                    {services.map((service) => (
                      <SelectItem key={service.title}>{service.title}</SelectItem>
                    ))}
                  </Select>

                  <div className="w-full">
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-2'>
                      <div className="col-span-1 w-full">
                        <I18nProvider locale="es-ES">
                          <DatePicker
                            size='lg'
                            label="Dia"
                            disableAnimation
                            value={selectedDate}
                            minValue={today(getLocalTimeZone())}
                            onChange={(date) => {
                              if (date) {
                                setSelectedDate(date)
                              }
                            }}
                          />
                        </I18nProvider>
                      </div>

                      <div className='col-span-1 w-full'>
                        <TimeSlots hideDuration={selectedService === 'Grabar tu set' ? true : false} selectedDate={selectedDate} overlappingHours={overlappingHours} setScheduleTime={handleTimeSelected} />
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button type="submit" color="primary">
                    Crear reservacion
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal >
    </>
  );
}
