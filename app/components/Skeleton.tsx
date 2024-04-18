import React from "react";

const Skeleton = () => {
  return (
    <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:scale-100 hover:shadow-2xl m-2">
      <div
        style={{
          paddingBottom: "75%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="animate-pulse bg-gray-300 absolute top-0 left-0 w-full h-full"></div>
      </div>
      <div className="p-4">
        <div className="animate-pulse bg-gray-300 rounded h-6 mb-2"></div>
        <div className="animate-pulse bg-gray-300 rounded h-6 mb-2"></div>
        <div className="animate-pulse bg-gray-300 rounded h-6 w-3/4"></div>
      </div>
    </div>
  );
};

export default Skeleton;
