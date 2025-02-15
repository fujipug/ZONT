'use client'
import { useEffect, useState } from "react";
import SchedulePractica from "./(schedule-components)/schedule-practica";
import { classNames } from "@/app/utils/classesNames";
import ScheduleSet from "./(schedule-components)/schedule-set";
import ScheduleProduction from "./(schedule-components)/schedule-production";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { getServices } from "../network/firebase";
import { DocumentData } from "firebase/firestore";

export default function Schedule() {
  const [activeTab, setActiveTab] = useState("practice");
  const [services, setServices] = useState<DocumentData[]>([]);

  useEffect(() => {
    getServices().then((response) => {
      setServices(response);
    });
  }, []);

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
      <div className="grid grid-cols-1 sm:hidden">
        <select
          onChange={(e) => setActiveTab(e.target.value)}
          defaultValue={activeTab}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {services.map((tab) => (
            <option key={tab.serviceId} value={tab.serviceId}>{tab.value}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex">
            {services.map((tab) => (
              <a
                key={tab.serviceId}
                onClick={() => setActiveTab(tab.serviceId)}
                className={classNames(
                  activeTab === tab.serviceId
                    ? 'border-black text-black font-semibold text-xl'
                    : 'font-semibold text-xl border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 border-b-2 py-4 text-center text-sm font-medium hover:cursor-pointer',
                )}
              >
                {tab.value}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {activeTab === "practice" && <SchedulePractica serviceData={services.find(service => service.serviceId === 'practice') || {}} />}
      {activeTab === "record" && <ScheduleSet serviceData={services.find(service => service.serviceId === 'record') || {}} />}
      {activeTab === "produce" && <ScheduleProduction serviceData={services.find(service => service.serviceId === 'produce') || {}} />}
    </>
  );
}