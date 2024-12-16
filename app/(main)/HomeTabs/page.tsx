// import { ChevronDownIcon } from '@heroicons/react/solid';

import { useState } from "react";
import Practica from "./practica";
import Grabar from "./grabar";

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

const HomeTabs = () => {
  const [activeTab, setActiveTab] = useState('Practica en Cabina');

  const tabs = [
    { name: 'Practica en Cabina', href: '#', current: true },
    { name: 'Grabacion de Set', href: '#', current: false },
    { name: 'Estudio de Producion', href: '#', current: false },
    { name: 'Fotos/Fotographia', href: '#', current: false },
    // { name: 'Diseño de Logo', href: '#', current: false },
    // { name: 'Diseño de Pagina Web', href: '#', current: false },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      <h1 className="text-2xl">Yo Quiero</h1>

      <div>
        <div className="grid grid-cols-1 sm:hidden">
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            defaultValue={tabs.find((tab) => tab.current)?.name || ''}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
          {/* <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
          /> */}
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav aria-label="Tabs" className="-mb-px flex">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  // href={tab.href}
                  onClick={() => setActiveTab(tab.name)}
                  aria-current={tab.current ? 'page' : undefined}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium',
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
        {activeTab === 'Practica en Cabina' && <Practica />}
        {activeTab === 'Grabacion de Set' && <Grabar />}
      </div>

      {/* Tabs content */}
      {/* <Practica /> */}
    </div>
  )
}
export default HomeTabs;
