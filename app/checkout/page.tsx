'use client'
import { useEffect, useState } from 'react'
import {
  Radio,
  RadioGroup
} from '@headlessui/react'
import { CheckCircleIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useCart } from '../utils/CartContext'
import { getCheckoutItemsByIds } from '../network/firebase'
import { DocumentData } from 'firebase/firestore'
import GoogleMap from '../utils/GoogleMap'

const deliveryMethods = [
  { id: 1, title: 'Recojer', turnaround: 'Escandon, CDMX', price: 0, priceText: 'Gratis' },
  { id: 2, title: 'Standard', turnaround: '2–5 dias laborales', price: 5, priceText: '$5.00' },
]
const paymentMethods = [
  { id: 'credit-card', title: 'Tarjeta de Credito' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'Transferencia' },
]

export default function Checkout() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
  const { cart, removeFromCart, removeItemFromCart, addToCart, clearCart } = useCart()
  const [products, setProducts] = useState<DocumentData[]>([])

  useEffect(() => {
    // check for duplicates in cart, create an object with the duplicate id and quantity
    const uniqueCart = cart.reduce((acc: { [key: string]: number }, item: string) => {
      if (!acc[item]) {
        acc[item] = 1
      } else {
        acc[item]++
      }
      return acc
    }, {})

    const uniqueCartArray = Object.keys(uniqueCart).map((key) => key)

    getCheckoutItemsByIds(uniqueCartArray).then((items) => {
      const productsWithQuantity = items.map((item) => {
        return {
          ...item,
          quantity: uniqueCart[item.itemId]
        }
      })
      setProducts(productsWithQuantity)
    })
  }, [cart])

  const subtotal = products.reduce((acc, product) => {
    return acc + (product.price * product.quantity)
  }, 0)

  const handleQuantityChange = (quantity: string, itemId: string) => {
    const newQuantity = Number(quantity)
    products.map((product) => {
      if (product.itemId === itemId) {

        if (product.quantity > newQuantity) {
          for (let i = 0; i < product.quantity - newQuantity; i++) {
            removeItemFromCart(itemId)
          }
        }

        if (product.quantity < newQuantity) {
          for (let i = 0; i < newQuantity - product.quantity; i++) {
            addToCart(itemId)
          }
        }
      }
    })
  }

  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Información de Contacto</h2>

                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Método de Entrega</h2>

                <fieldset aria-label="Delivery method" className="mt-4">
                  <RadioGroup
                    value={selectedDeliveryMethod}
                    onChange={setSelectedDeliveryMethod}
                    className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                  >
                    {deliveryMethods.map((deliveryMethod) => (
                      <Radio
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        aria-label={deliveryMethod.title}
                        aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.priceText}`}
                        className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
                      >
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <span className="block text-sm font-medium text-gray-900">{deliveryMethod.title}</span>
                            <span className="mt-1 flex items-center text-sm text-gray-500">
                              {deliveryMethod.turnaround}
                            </span>
                            <span className="mt-6 text-sm font-medium text-gray-900">{deliveryMethod.priceText}</span>
                          </span>
                        </span>
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="size-5 text-indigo-600 group-[&:not([data-checked])]:hidden"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                {selectedDeliveryMethod.title === 'Recojer' ?
                  (
                    <>
                      <h2 className="text-lg font-medium text-gray-900">Informacion de Recojer</h2>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 items-center">
                        <div className='col-span-1'>
                          <p className='text-gray-600'>ZONT Studio</p>
                          <p className='text-gray-600'>Gral. Salvador Alvarado 72</p>
                          <p className='text-gray-600'>Escandón I Secc, Miguel Hidalgo, 11800</p>
                          <p className='text-gray-600'>Ciudad de México, CDMX</p>
                        </div>

                        <div className='col-span-1'>
                          <GoogleMap />
                        </div>
                      </div>
                    </>
                  )
                  :
                  (
                    <>
                      <h2 className="text-lg font-medium text-gray-900">Informacion de Entrega</h2>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                          <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-700">
                            Nombre
                          </label>
                          <div className="mt-2">
                            <input
                              id="first-name"
                              name="first-name"
                              type="text"
                              autoComplete="given-name"
                              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-700">
                            Apellido
                          </label>
                          <div className="mt-2">
                            <input
                              id="last-name"
                              name="last-name"
                              type="text"
                              autoComplete="family-name"
                              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="address" className="block text-sm/6 font-medium text-gray-700">
                            Address
                          </label>
                          <div className="mt-2">
                            <input
                              id="address"
                              name="address"
                              type="text"
                              autoComplete="street-address"
                              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="apartment" className="block text-sm/6 font-medium text-gray-700">
                            Apartment, suite, etc.
                          </label>
                          <div className="mt-2">
                            <input
                              id="apartment"
                              name="apartment"
                              type="text"
                              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm/6 font-medium text-gray-700">
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              id="city"
                              name="city"
                              type="text"
                              autoComplete="address-level2"
                              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-sm/6 font-medium text-gray-700">
                            Country
                          </label>
                          <div className="mt-2 grid grid-cols-1">
                            <select
                              id="country"
                              name="country"
                              autoComplete="country-name"
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                            </select>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 sm:size-4"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="region" className="block text-sm/6 font-medium text-gray-700">
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              id="region"
                              name="region"
                              type="text"
                              autoComplete="address-level1"
                              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-700">
                            Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              id="postal-code"
                              name="postal-code"
                              type="text"
                              autoComplete="postal-code"
                              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-700">
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              name="phone"
                              type="text"
                              autoComplete="tel"
                              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>

              {/* <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Delivery method</h2>

                <fieldset aria-label="Delivery method" className="mt-4">
                  <RadioGroup
                    value={selectedDeliveryMethod}
                    onChange={setSelectedDeliveryMethod}
                    className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                  >
                    {deliveryMethods.map((deliveryMethod) => (
                      <Radio
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        aria-label={deliveryMethod.title}
                        aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.priceText}`}
                        className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
                      >
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <span className="block text-sm font-medium text-gray-900">{deliveryMethod.title}</span>
                            <span className="mt-1 flex items-center text-sm text-gray-500">
                              {deliveryMethod.turnaround}
                            </span>
                            <span className="mt-6 text-sm font-medium text-gray-900">{deliveryMethod.priceText}</span>
                          </span>
                        </span>
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="size-5 text-indigo-600 group-[&:not([data-checked])]:hidden"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div> */}

              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        <input
                          defaultChecked={paymentMethodIdx === 0}
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                        <label htmlFor={paymentMethod.id} className="ml-3 block text-sm/6 font-medium text-gray-700">
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                  <div className="col-span-4">
                    <label htmlFor="card-number" className="block text-sm/6 font-medium text-gray-700">
                      Card number
                    </label>
                    <div className="mt-2">
                      <input
                        id="card-number"
                        name="card-number"
                        type="text"
                        autoComplete="cc-number"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-4">
                    <label htmlFor="name-on-card" className="block text-sm/6 font-medium text-gray-700">
                      Name on card
                    </label>
                    <div className="mt-2">
                      <input
                        id="name-on-card"
                        name="name-on-card"
                        type="text"
                        autoComplete="cc-name"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="expiration-date" className="block text-sm/6 font-medium text-gray-700">
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-2">
                      <input
                        id="expiration-date"
                        name="expiration-date"
                        type="text"
                        autoComplete="cc-exp"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm/6 font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-2">
                      <input
                        id="cvc"
                        name="cvc"
                        type="text"
                        autoComplete="csc"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.itemId} className="flex px-4 py-6 sm:px-6">
                      <div className="shrink-0">
                        <img alt="Product" src={product.imgUrl} className="w-20 rounded-md" />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                                {product.title}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                            <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                          </div>

                          <div className="ml-4 flow-root shrink-0">
                            <button
                              type="button"
                              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon onClick={() => removeFromCart(product.itemId)} aria-hidden="true" className="size-5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">${product.price * product.quantity}</p>

                          <div className="ml-4 grid grid-cols-1">
                            <select
                              id="quantity"
                              name="quantity"
                              aria-label="Quantity"
                              onChange={(e) => handleQuantityChange(e.target.value, product.itemId)}
                              defaultValue={product.quantity}
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 sm:size-4"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${subtotal}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">{selectedDeliveryMethod.priceText}</dd>
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                  </div> */}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">${subtotal + selectedDeliveryMethod.price}</dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>

                  <button onClick={clearCart} className="mt-4 w-full rounded-md border border-transparent bg-gray-200 px-4 py-3 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    Clear cart
                  </button>
                </div>
              </div>
            </div>
          </form >
        </div >
      </main >
    </div >
  )
}
