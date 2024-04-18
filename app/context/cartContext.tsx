"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Product = {
  quantity?: number;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  favorite: boolean;
  userEmail?: string;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  cartItemsCount: number;

  userEmail: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const cachedUserEmail = localStorage.getItem("userEmail");
    setUserEmail(cachedUserEmail);
    const cachedCart = localStorage.getItem(`cart_${cachedUserEmail}`);
    if (cachedCart) {
      setCart(JSON.parse(cachedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity =
        (updatedCart[existingProductIndex].quantity || 1) + 1;
      setCart(updatedCart);
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, cartItemsCount: cart.length, userEmail }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
