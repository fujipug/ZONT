import { ShoppingCartIcon } from "@heroicons/react/24/outline"

export default function CartFab() {
  return (
    <a
      href="/checkout"
      type="button"
      className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-full shadow-lg">
      <ShoppingCartIcon className="size-8" />
    </a>
  )
}