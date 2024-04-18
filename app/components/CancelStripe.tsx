import React from "react";
import Link from "next/link";

const CancelStripe = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-10 shadow md:mx-auto">
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Sorry for the inconvenience!
          </h3>
          <p className="text-gray-600 my-2">
            Your payment was not successful, but keep shopping!
          </p>
          <p>Have a great day! 😊 </p>
          <div className="py-10 text-center">
            <Link
              href={"/User/Home"}
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelStripe;
