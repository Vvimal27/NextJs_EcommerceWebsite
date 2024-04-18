import React from "react";
import { FiX } from "react-icons/fi"; // Import close icon from react-icons

interface CustomToastProps {
  message: string;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, onClose }) => {
  return (
    <div className="absolute top-5 right-5 z-10">
      <div
        className="max-w-xs bg-blue-500 text-sm text-white rounded-xl shadow-lg"
        role="alert"
      >
        <div className="flex p-4">
          <span className="flex-grow">{message}</span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
          >
            <span className="sr-only">Close</span>
            <FiX className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
