import Navbar from "@/app/components/Navbar";
import ShoppingList from "@/app/components/ShoppingList";
import { CartProvider } from "@/app/context/cartContext";
import { FavoriteProvider } from "@/app/context/favoriteContext";
import React from "react";

// path: /User/Home

export default function page() {
  return (
    <div className="relative">
      <CartProvider>
        <FavoriteProvider>
          <Navbar />
          <ShoppingList />
        </FavoriteProvider>
      </CartProvider>
    </div>
  );
}
