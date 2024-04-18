"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Skeleton from "./Skeleton";
import { useCart } from "../context/cartContext";
import { useFavorite } from "../context/favoriteContext";
import SearchField from "./SearchField";
import ProductDetail from "./ProductDetail";

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

  favorite: boolean;
};

const Home = () => {
  const { addToCart } = useCart();
  const { addToFavorite, removeFromFavorite, favoriteProducts } = useFavorite();

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [activeBubble, setActiveBubble] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("products");
        if (cachedData) {
          setProducts(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await axios.get("/api/products");
          // console.log(response.data);
          const fetchedProducts: Product[] = response.data;
          setProducts(fetchedProducts);
          localStorage.setItem("products", JSON.stringify(fetchedProducts));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));

    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        favorite: favoriteProducts.some((p) => p.id === product.id),
      }))
    );
  }, [favoriteProducts]);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (categoryFilter !== null && categoryFilter !== "") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products, categoryFilter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        selectedProduct
      ) {
        closeDetailProduct();
      }
    };

    if (selectedProduct) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProduct]);

  const handleAddToFavorite = (productId: number) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, favorite: !product.favorite }
        : product
    );

    setProducts(updatedProducts);

    const favoriteItem = updatedProducts.find(
      (product) => product.id === productId
    );

    if (favoriteItem) {
      if (favoriteItem.favorite) {
        addToFavorite(favoriteItem);
      } else {
        removeFromFavorite(productId);
      }
    }
  };

  const isProductFavorite = (productId: number) => {
    return favoriteProducts.some((product) => product.id === productId);
  };

  // const handleAddtoCart = async (product: Product) => {
  //   addToCart(product);
  // };

  const handleAddtoCart = async (product: Product) => {
    try {
      await axios.post("/api/cart", {
        id: product.id,
        userEmail: localStorage.getItem("userEmail"),
      });
      console.log(product.id);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Handle error (e.g., show an error message)
    }
    addToCart(product);
  };

  const openDetailProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeDetailProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="container mx-auto pt-8 mx-24 mb-14">
        <h2 className="text-3xl font-semibold mb-6">Products</h2>

        <div className="flex mb-2">
          <div className="flex-grow">
            <SearchField setSearchQuery={setSearchQuery} />
          </div>
          <div className="ml-4">
            {/* Filter by category */}
            <div>
              <label className="block text-gray-700 text-md font-bold mb-1 ml-1">
                Filter by category:
              </label>
              <select
                className="block w-full p-1 bg-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All categories</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">{"Men's"} Clothing</option>
                <option value="women's clothing">{"Women's"} Clothing</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:scale-100 hover:shadow-2xl relative"
                  onClick={() => openDetailProduct(product)}
                >
                  <div
                    style={{
                      paddingBottom: "75%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute top-0 left-0 object-cover object-center p-8"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 line-clamp-2 truncate">
                      {product.title}
                    </h2>
                    <p className="text-gray-700 mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddtoCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div
                    className={`absolute bottom-0 right-0 p-2 cursor-pointer p-4 ${
                      isProductFavorite(product.id) ? "text-red-500 " : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorite(product.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isProductFavorite(product.id) ? "red" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className={`w-8 h-8 ${
                        activeBubble === product.id ? "animate-bounce" : ""
                      }transition-colors duration-1000 ease-in-out`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={closeDetailProduct}
          onAddToCart={handleAddtoCart}
        />
      )}
    </>
  );
};

export default Home;
