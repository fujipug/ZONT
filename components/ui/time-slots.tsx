import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { useEffect, useState } from "react";
import { classNames } from "@/app/utils/classesNames"
import { CalendarDate } from "@internationalized/date";

const timeSlots = [
  { startTime: 11 },
  { startTime: 12 },
  { startTime: 13 },
  { startTime: 14 },
  { startTime: 15 },
  { startTime: 16 },
  { startTime: 17 },
  { startTime: 18 },
  { startTime: 19 },
  { startTime: 20 },
  { startTime: 21 },
]

const timeLengths = [
  { timeLength: 1 },
  { timeLength: 2 },
  { timeLength: 3 },
  { timeLength: 4 },
  { timeLength: 5 },
  { timeLength: 6 },
  { timeLength: 7 },
  { timeLength: 8 },
  { timeLength: 9 },
  { timeLength: 10 },
]

export default function TimeSlots({ hideDuration = false, selectedDate, overlappingHours, setScheduleTime }: { hideDuration?: boolean, selectedDate: CalendarDate, overlappingHours: Record<string, number[]>, setScheduleTime: (time: number, length: number) => void }) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null)
  const [selectedTimeLength, setSelectedTimeLength] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [confirmedTime, setConfirmedTime] = useState(false)

  const currentDate = new Date(); // Get the current date
  const currentDay = currentDate.getDate(); // Get the current day (1-31)
  const currentMonth = currentDate.getMonth(); // Get the current month (0-11)
  const currentYear = currentDate.getFullYear(); // Get the current year (e.g., 2025)

  const isSameDay =
    selectedDate.day === currentDay &&
    selectedDate.month === currentMonth + 1 && // Adjust if the month is 1-based
    selectedDate.year === currentYear;

  useEffect(() => {
    setSelectedTimeSlot(null)
    setSelectedTimeLength(null)
    setScheduleTime(0, 0)
    setConfirmedTime(false)
  }, [overlappingHours])

  const handleTimeSlotSelect = () => {
    if (selectedTimeSlot && selectedTimeLength) {
      setScheduleTime(selectedTimeSlot, selectedTimeLength)
      setConfirmedTime(true)
      setIsOpen(false)
    }
  }

  return (
    <Popover placement="bottom" isOpen={isOpen}>
      <PopoverTrigger>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="w-full h-16 sm:h-full rounded-xl bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        >
          {(selectedTimeSlot && selectedTimeLength && confirmedTime) ? (
            <span className="ml-2 font-semibold text-indigo-600">
              {selectedTimeSlot}:00 - {selectedTimeSlot + selectedTimeLength}:00
            </span>
          )
            :
            <span>{hideDuration && 'Selecionar'} Hora {!hideDuration && 'y Duracion'}</span>
          }
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className={`grid grid-cols-1 gap-8 p-4 ${hideDuration ? 'sm:grid-cols-1' : 'sm:grid-cols-2'}`}>
          {/* Time Slots */}
          <div className="col-span-1">
            <h3 className="mb-2 text-md font-semibold">Tiempo de Empezar</h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((timeSlot) => {

                const isDisabled =
                  Object.values(overlappingHours).flat().includes(timeSlot.startTime) || // Check for overlap
                  (isSameDay && timeSlot.startTime < currentDate.getHours());

                return (
                  <button
                    key={timeSlot.startTime}
                    onClick={() => { setSelectedTimeSlot(timeSlot.startTime); setSelectedTimeLength(hideDuration ? 1 : null); setConfirmedTime(false) }}
                    type="button"
                    disabled={isDisabled}
                    className={classNames(
                      isDisabled
                        ? 'w-full h-full rounded-xl bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed'
                        : timeSlot.startTime === selectedTimeSlot
                          ? 'w-full h-full rounded-xl bg-indigo-300 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm'
                          : 'w-full h-full rounded-xl bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
                    )}
                  >
                    {timeSlot.startTime}:00
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration */}
          {!hideDuration && (
            <div className="col-span-1">
              <h3 className="mb-2 text-md font-semibold">Duration</h3>
              <div className="grid grid-cols-4 gap-2">
                {timeLengths.map((length: { timeLength: number }, index: number) => {
                  const flattenedOverlaps = Object.values(overlappingHours).flat();

                  const range =
                    selectedTimeSlot !== null
                      ? Array.from({ length: length.timeLength }, (_, i) => selectedTimeSlot + i)
                      : [];

                  const isLengthDisabled =
                    range.some((hour) => flattenedOverlaps.includes(hour)) ||
                    (range.length > 0 && range[range.length - 1] > (timeSlots[timeSlots.length - 1]).startTime);

                  return (
                    <button
                      key={index}
                      onClick={() => { setSelectedTimeLength(length.timeLength); setConfirmedTime(false) }}
                      type="button"
                      disabled={isLengthDisabled}
                      className={classNames(
                        isLengthDisabled
                          ? 'w-full h-full rounded-xl bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed'
                          : length.timeLength === selectedTimeLength
                            ? 'w-full h-full rounded-xl bg-indigo-300 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm'
                            : 'w-full h-full rounded-xl bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
                      )}
                    >
                      {length.timeLength} hour{length.timeLength > 1 ? 's' : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <hr className="border-t border-gray-200 h-.5" />

        <button onClick={handleTimeSlotSelect}
          className={classNames(
            selectedTimeSlot && selectedTimeLength
              ? 'w-full h-24 sm:h-full rounded-xl bg-indigo-500 px-3.5 py-4 text-sm mb-2 font-semibold text-white shadow-sm hover:bg-indigo-400'
              : 'w-full h-24 sm:h-full rounded-xl bg-gray-200 px-3.5 py-4 text-sm mb-2 font-semibold text-gray-400 cursor-not-allowed'
          )}
          disabled={!selectedTimeSlot || !selectedTimeLength}
        >
          Confirmar Horario
        </button>
      </PopoverContent>
    </Popover>
  );
}
