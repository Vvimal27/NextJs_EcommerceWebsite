/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";

type Product = {
  quantity?: number;
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

type Props = {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
};

const ProductDetail: React.FC<Props> = ({ product, onClose, onAddToCart }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 max-w-4xl max-h-4xl rounded-lg overflow-hidden flex relative">
        <button className="absolute top-0 right-0 m-4" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-700 text-sm mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <p className="text-gray-900 font-bold text-xl mr-2">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            {" "}
            <span className="font-bold mr-1 text-gray-800 text-sm">
              Category :
            </span>{" "}
            {product.category}
          </p>
          <div className="flex items-center mb-4">
            <p className="text-gray-600 text-sm">
              <span className="font-bold mr-1 text-gray-800 text-sm">
                Rating :
              </span>{" "}
              {product.rating.rate} ({product.rating.count} reviews)
            </p>
            {product.favorite && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
              </svg>
            )}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
