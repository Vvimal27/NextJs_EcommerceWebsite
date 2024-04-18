"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { cartItemsCount } = useCart();

  return (
    <nav className="bg-blue-600 text-white mb-2 py-6 px-24 flex justify-between items-center sticky top-0 z-50 shadow shadow-black">
      {/* Left side - Logo */}
      <div>
        <Link href="#" className="text-3xl font-bold">
          Shopper Stop
        </Link>
      </div>

      {/* Right side - Links */}
      <div>
        <span className="relative left-1 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 p-2"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          ></svg>
          {cartItemsCount > 0 && (
            <span className="bg-red-500 text-white rounded-full w-6 h-6 text-center text-xs font-bold p-3 flex items-center justify-center absolute top-2 right-0">
              {cartItemsCount}
            </span>
          )}
        </span>
        <ul className="flex items-center space-x-10">
          <li>
            <Link href={"/User/Home"} className="hover:text-gray-300 text-lg">
              Products
            </Link>
          </li>
          {/* <li>
            <Link href={"/about"} className="hover:text-gray-300 text-lg">
              About Us
            </Link>
          </li> */}
          {/* <li>
            <Link href={"/blog"} className="hover:text-gray-300 text-lg">
              Blog
            </Link>
          </li> */}
          <li>
            {/* <Link href="/favorite"> */}
            <Link
              href={"/User/Favorite"}
              className="hover:text-gray-300 text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link href="/User/Cart" className="hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
