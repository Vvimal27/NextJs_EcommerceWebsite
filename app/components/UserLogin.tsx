"use client";

import Link from "next/link";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomToast from "./CustomToast";

const UserLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setShowToast(true);
        setToastMessage(response.data.msg);
        setTimeout(() => setShowToast(false), 4000);
        setEmail("");
        setPassword("");
        localStorage.setItem("userEmail", email);
        router.push("/User/Home");
      }
    } catch (error: any) {
      const response = error.response;
      if (response && response.status === 409) {
        setShowToast(true);
        setToastMessage(response.data.msg);
        setTimeout(() => setShowToast(false), 4000);
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="text-gray-600 body-font relative bg-[#edf5ff] h-[100vh] bg-gray-200 ">
      {showToast && (
        <CustomToast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col w-[30%] mb-12 mx-auto bg-white shadow-md rounded-lg px-8 py-16">
          <h1 className="pb-4 text-center text-black text-3xl font-bold">
            Login
          </h1>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your email
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
                Your password
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
                {"Don't"} have an Account?{" "}
                <span className="text-blue-900 hover:text-blue-700 cursor-pointer text-bold">
                  <Link href="User/SignUp">Sign Up</Link>
                </span>{" "}
              </h3>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}{" "}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
