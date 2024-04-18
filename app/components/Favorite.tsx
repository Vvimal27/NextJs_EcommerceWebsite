"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useFavorite } from "../context/favoriteContext";
import Image from "next/image";

type Product = {
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
};

const Favorite = () => {
  const { favoriteProducts } = useFavorite();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserEmail = localStorage.getItem("userEmail");
      setUserEmail(storedUserEmail);
    }
  }, []);

  if (favoriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center m-20">
        <Image
          src="/favorite.svg"
          alt="No Favorites"
          width={300}
          height={300}
          className="mx-auto h-80 w-80"
        />
        <p className="text-gray-500 font-semibold text-3xl mt-5">
          You {"don't"} have any favorites!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-4">Favorites</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteProducts.map((favoriteItem: Product) => (
            <div
              key={favoriteItem.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:scale-100 hover:shadow-2xl relative"
            >
              <div
                style={{
                  paddingBottom: "75%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={favoriteItem.image}
                  alt={favoriteItem.title}
                  className="absolute top-0 left-0 object-cover object-center p-8"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 truncate">
                  {favoriteItem.title}
                </h2>
                <p className="text-gray-700 mb-2">${favoriteItem.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorite;
