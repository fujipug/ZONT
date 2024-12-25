import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { use, useEffect, useState } from "react";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TimeSlots({ setScheduleTime }: { setScheduleTime: (time: number, length: number) => void }) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null)
  const [selectedTimeLength, setSelectedTimeLength] = useState<number | null>(null)

  useEffect(() => {
    if (selectedTimeSlot && selectedTimeLength) {
      setScheduleTime(selectedTimeSlot, selectedTimeLength)
    }
  }, [selectedTimeSlot, selectedTimeLength])

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <button
          type="button"
          className="w-full h-16 sm:h-full rounded-xl bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        >
          Tiempo y Duracion
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
          <div className="col-span-1">
            <h3 className="mb-2 text-md font-semibold">Tiempo de Empezar</h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((timeSlot) => (
                <button
                  key={timeSlot.startTime}
                  onClick={() => setSelectedTimeSlot(timeSlot.startTime)}
                  type="button"
                  className={classNames(
                    timeSlot.startTime === selectedTimeSlot ? 'w-full h-full rounded-xl bg-indigo-300 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm' : 'w-full h-full rounded-xl bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
                  )}
                >
                  {timeSlot.startTime}:00
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="mb-2 text-md font-semibold">Duration</h3>
            <div className="grid grid-cols-4 gap-2">
              {timeLengths.map((timeLength) => (
                <button
                  key={timeLength.timeLength}
                  onClick={() => setSelectedTimeLength(timeLength.timeLength)}
                  type="button"
                  className={classNames(
                    timeLength.timeLength === selectedTimeLength ? 'w-full h-full rounded-xl bg-indigo-300 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm' : 'w-full h-full rounded-xl bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
                  )}
                >
                  {timeLength.timeLength} {timeLength.timeLength === 1 ? 'hr' : 'hrs'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
