"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  userEmail?: string;
};

// Define the type for the context value
type FavoriteContextType = {
  favoriteProducts: Product[];
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (productId: number) => void;
  userEmail: string | null;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {


  const [userEmail, setUserEmail] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      // Retrieve user's email from localStorage
      return localStorage.getItem("userEmail");
    }
    return null;
  });

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined" && userEmail) {
      const storedFavoriteProducts = localStorage.getItem(
        `favoriteProducts_${userEmail}`
      );
      return storedFavoriteProducts ? JSON.parse(storedFavoriteProducts) : [];
    }
    return [];
  });

  
  const addToFavorite = (product: Product) => {
    setFavoriteProducts((prevFavoriteProducts) => {
      if (!prevFavoriteProducts.some((p) => p.id === product.id)) {
        const updatedFavorites = [...prevFavoriteProducts, product];
        if (userEmail) {
          localStorage.setItem(
            `favoriteProducts_${userEmail}`,
            JSON.stringify(updatedFavorites)
          );
        }
        return updatedFavorites;
      }
      return prevFavoriteProducts;
    });
  };

  const removeFromFavorite = (productId: number) => {
    setFavoriteProducts((prevFavoriteProducts) => {
      const updatedFavorites = prevFavoriteProducts.filter(
        (product) => product.id !== productId
      );
      if (userEmail) {
        localStorage.setItem(
          `favoriteProducts_${userEmail}`,
          JSON.stringify(updatedFavorites)
        );
      }
      return updatedFavorites;
    });
  };

  useEffect(() => {
    // Update userEmail in the context when it changes
    if (typeof window !== "undefined") {
      const storedUserEmail = localStorage.getItem("userEmail");
      setUserEmail(storedUserEmail);
    }
  }, []);

  

  const value: FavoriteContextType = {
    favoriteProducts,
    addToFavorite,
    removeFromFavorite,
    userEmail,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
