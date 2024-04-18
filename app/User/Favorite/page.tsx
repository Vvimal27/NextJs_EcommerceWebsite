import Favorite from "@/app/components/Favorite";
import Navbar from "@/app/components/Navbar";
import { CartProvider } from "@/app/context/cartContext";
import { FavoriteProvider } from "@/app/context/favoriteContext";
import React from "react";

// path : /User/favorite

const page = () => {
  return (
    <>
      <CartProvider>
        <FavoriteProvider>
          <Navbar />
          <Favorite />
        </FavoriteProvider>
      </CartProvider>
    </>
  );
};

export default page;
