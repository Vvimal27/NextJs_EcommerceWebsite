import Navbar from "@/app/components/Navbar";
import ShoppingCart from "@/app/components/ShoppingCart";
import { CartProvider } from "@/app/context/cartContext";
import React from "react";

// path: /User/cart

const page = () => {
  return (
    <>
      <CartProvider>
        <Navbar />
        <ShoppingCart />
      </CartProvider>
    </>
  );
};

export default page;
