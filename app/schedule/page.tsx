'use client'
import { useEffect, useState } from "react";
import SchedulePractica from "./(schedule-components)/schedule-practica";
import { classNames } from "@/app/utils/classesNames";
import ScheduleSet from "./(schedule-components)/schedule-set";
import ScheduleProduction from "./(schedule-components)/schedule-production";

const tabs = [
  {
    label: "Practicar",
    value: "practice"
  },
  {
    label: "Grabar Set",
    value: "record",
  },
  {
    label: "Producir",
    value: "produce",
  }
]

export default function Schedule() {
  const [activeTab, setActiveTab] = useState("practice");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = window.location.search.substring(1); // Removes the "?" at the start
      if (query) {
        setActiveTab(query);
      }
    }
  }, []);

  return (
    <>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex">
            {tabs.map((tab) => (
              <a
                key={tab.value}
                // href={tab.href}
                onClick={() => setActiveTab(tab.value)}
                // aria-current={tab.current ? 'page' : undefined}
                className={classNames(
                  activeTab === tab.value
                    ? 'border-black text-black font-semibold text-xl'
                    : 'font-semibold text-xl border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 border-b-2 py-4 text-center text-sm font-medium hover:cursor-pointer',
                )}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {activeTab === "practice" && <SchedulePractica />}
      {activeTab === "record" && <ScheduleSet />}
      {activeTab === "produce" && <ScheduleProduction />}
    </>
  );
}