/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import axios from "axios";
import Image from "next/image";

type Product = {
  quantity: number;
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
  userEmail?: string | null;
};

const ShoppingCart = () => {
  const { cart, userEmail } = useCart();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const TAX_RATE = 0.13;
  const HANDLING_FEE = 2.99;

  useEffect(() => {
    if (userEmail) {
      const userCartItemsJSON = localStorage.getItem(`cart_${userEmail}`);
      if (userCartItemsJSON) {
        setCartItems(JSON.parse(userCartItemsJSON));
      }
    }
  }, [userEmail]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (productId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCartItems));
  };

  const subtotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const SHIPPING_COST = cartItems.length > 0 ? 4.99 : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST + HANDLING_FEE;

  const createCheckoutSession = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/checkout", { cartItems });
      console.log("Checkout session response:", response);
      if (response.data && response.data.sessionURL) {
        window.location = response.data.sessionURL;
      } else {
        console.error("Invalid session URL:", response.data);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-100 pt-16">
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <Image
                src="/empty_cart.svg"
                className="mx-auto h-80 w-80"
                width={300}
                height={300}
                alt="Empty cart"
              />
              <div className="text-gray-500 font-semibold text-3xl mt-10">
                You {"don't"} have any items in your cart..!!
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-lg md:w-2/3">
                {cartItems.map((product) => (
                  <div
                    key={product.id}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-24 h-auto rounded-lg sm:w-32"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {product.title}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {product.description}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                product.quantity - 1
                              )
                            }
                            disabled={product.quantity === 1}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </button>
                          <input
                            className="h-8 w-8 border bg-white text-center text-gray-700 font-medium font-bold outline-none p-2 "
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                product.id,
                                parseInt(e.target.value)
                              )
                            }
                            min="1"
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                product.quantity + 1
                              )
                            }
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">${product.price.toFixed(2)}</p>
                          <button
                            onClick={() => handleRemoveItem(product.id)}
                            className="text-sm text-gray-600 hover:text-red-500 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-600 font-bold ">
                    {subtotal.toFixed(2)} $
                  </p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">
                    Tax ({(TAX_RATE * 100).toFixed(2)}%)
                  </p>
                  <p className="text-gray-600 font-bold">{tax.toFixed(2)} $</p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-600 font-bold">
                    {SHIPPING_COST.toFixed(2)} $
                  </p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Handling Fee</p>
                  <p className="text-gray-600 font-bold">
                    {HANDLING_FEE.toFixed(2)} $
                  </p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">
                      {total.toFixed(2)} $
                    </p>
                    <p className="text-sm text-gray-700">including VAT</p>
                  </div>
                </div>
                <button
                  className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                  onClick={createCheckoutSession}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Proceed to Checkout"}{" "}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
