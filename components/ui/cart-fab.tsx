'use client'
import { useCart } from "@/app/utils/CartContext"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"

export default function CartFab() {
  const { cart } = useCart()
  const pathname = usePathname()

  return (
    <>
      {(cart.length > 0 && pathname !== '/checkout') && (
        <a
          href="/checkout"
          type="button"
          className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-full shadow-lg">
          <ShoppingCartIcon className="size-8" />
          <span className="absolute -top-1 -right-1 bg-gray-500 text-white rounded-full px-2.5 py-1 text-sm">
            {cart.length}
          </span>
        </a>
      )}
    </>
  )
}