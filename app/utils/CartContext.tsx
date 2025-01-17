'use client'
import { CalendarDate } from '@internationalized/date';
import { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  type: string;
  itemId: string;
  priceType?: string;
  date?: CalendarDate;
  time?: number;
  length?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => { },
  removeItemFromCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { }
});

export const useCart = () => useContext(CartContext);

import { ReactNode } from 'react';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage?.getItem('cart') || '[]');
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove one item from cart but start from the end
  const removeItemFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const index = prevCart.map(item => item.itemId).lastIndexOf(itemId);
      if (index > -1) {
        return [...prevCart.slice(0, index), ...prevCart.slice(index + 1)];
      }
      return prevCart;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item: CartItem) => item.itemId !== itemId));
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItemFromCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
