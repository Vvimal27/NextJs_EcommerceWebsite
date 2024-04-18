"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import CustomToast from "./CustomToast";

const UserSignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/api/signup", { email, password, name })
      .then((response) => {
        // console.log(res);
        setShowToast(true);
        setToastMessage(response.data.msg);
        setTimeout(() => setShowToast(false), 4000);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        // console.log(err);
        if (err.response && err.response.status === 409) {
          setShowToast(true);
          setToastMessage(
            "This email is already in use. Please use a different email."
          );
          setTimeout(() => setShowToast(false), 4000);
        } else {
          console.error("Error:", err);
        }
      });
    setIsLoading(false);
  };
  return (
    <section className="text-gray-600 body-font relative bg-[#edf5ff] h-[100vh] bg-gray-200">
      {showToast && (
        <CustomToast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col w-[30%] mb-12 mx-auto bg-white shadow-md rounded-lg px-8 py-16">
          <h1 className="pb-4 text-center text-black text-3xl font-bold">
            Signup Form
          </h1>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Your Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="mb-6">
              <h3>
                Already have an Account?{" "}
                <span className="text-blue-900 hover:text-blue-700 cursor-pointer text-bold">
                  <Link href="/">Login</Link>
                </span>
              </h3>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "Loading..." : "Sign Up"}{" "}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserSignUp;
