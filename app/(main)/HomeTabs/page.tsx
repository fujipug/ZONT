'use client'
import { useState } from "react";
import Practica from "./practica";
import Grabar from "./grabar";
import Studio from "./studio";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { classNames } from "@/app/utils/classesNames"
import Services from "./services";

const HomeTabs = () => {
  const [activeTab, setActiveTab] = useState('Practicar');

  const tabs = [
    { name: 'Practicar' },
    { name: 'Grabar Set' },
    { name: 'Producir' },
    { name: 'Ver Otros Servicios' },
    // { name: 'Diseño de Logo' },
    // { name: 'Diseño de Pagina Web' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 bg-gray-50">
      <h1 className="text-xl sm:text-2xl text-black font-bold">Que Quieres Hacer?</h1>

      <div>

        <div className="grid grid-cols-1 sm:hidden">
          <select
            onChange={(e) => setActiveTab(e.target.value)}
            defaultValue={tabs.find((tab) => tab.name === activeTab)?.name || ''}
            aria-label="Select a tab"
            className="mt-2 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-black focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
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
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  // href={tab.href}
                  onClick={() => setActiveTab(tab.name)}
                  // aria-current={tab.current ? 'page' : undefined}
                  className={classNames(
                    activeTab === tab.name
                      ? 'border-black text-black font-semibold text-xl'
                      : 'font-semibold text-xl border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'w-1/4 border-b-2 py-4 text-center text-sm font-medium hover:cursor-pointer',
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8">
          {activeTab === 'Practicar' && <Practica />}
          {activeTab === 'Grabar Set' && <Grabar />}
          {activeTab === 'Producir' && <Studio />}
          {activeTab === 'Ver Otros Servicios' && <Services />}
        </div>
      </div>

      {/* Tabs content */}
      {/* <Practica /> */}
    </div>
  )
}
export default HomeTabs;
