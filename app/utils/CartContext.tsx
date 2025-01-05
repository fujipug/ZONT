'use client'
import { createContext, useContext, useEffect, useState } from 'react';

interface CartContextType {
  cart: string[];
  addToCart: (item: string) => void;
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
  const [cart, setCart] = useState<string[]>([]);

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

  const addToCart = (item: string) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove one item from cart but start from the end
  const removeItemFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.slice(0, prevCart.lastIndexOf(itemId)));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item: string) => item !== itemId));
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
